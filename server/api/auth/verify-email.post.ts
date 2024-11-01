import { User } from '@/server/models/user.model'
import { sendWelcomeEmail } from '@/server/utils/mailtrap/mails'

export default defineEventHandler(async (event) => {
	const { code } = await readBody(event)

	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		})

		if (!user) return errorHandler(400, 'Invalid or expired verification code')

		user.isVerified = true
		user.verificationToken = undefined
		user.verificationTokenExpiresAt = undefined
		await user.save()

		await sendWelcomeEmail(user.email, user.name)

		return {
			success: true,
			message: 'Email verified successfully',
			user: {
				// @ts-ignore
				...user._doc,
				password: undefined,
			},
		}
	} catch (error) {
		//@ts-ignore
		errorHandler(500, error.message)
	}
})
