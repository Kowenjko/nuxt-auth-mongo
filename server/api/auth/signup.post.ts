import { User } from '@/server/models/user.model'
import bcryptjs from 'bcryptjs'
import { sendVerificationEmail } from '@/server/utils/mailtrap/mails'
// import { sendVerificationEmail } from '@/server/utils/resend/resendEmails'

export default defineEventHandler(async (event) => {
	const { email, password, name } = await readBody(event)

	try {
		if (!email || !password || !name) errorHandler(400, 'All fields are required')

		const userAlreadyExists = await User.findOne({ email })
		console.log('userAlreadyExists', userAlreadyExists)

		if (userAlreadyExists) errorHandler(400, 'User already exists')

		const hashedPassword = await bcryptjs.hash(password, 10)
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

		const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		})

		await user.save()

		// jwt
		generateTokenAndSetCookie(event, user._id)

		await sendVerificationEmail(email, verificationToken)

		return {
			success: true,
			message: 'User created successfully',
			//@ts-ignore
			user: { ...user._doc, password: undefined },
		}
	} catch (error) {
		//@ts-ignore
		errorHandler(400, error.message)
	}
})
