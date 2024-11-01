import { User } from '~/server/models/user.model'
import bcryptjs from 'bcryptjs'

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event)

	try {
		const user = await User.findOne({ email })
		if (!user) return errorHandler(400, 'Invalid credentials')

		const isPasswordValid = await bcryptjs.compare(password, user.password)
		if (!isPasswordValid) return errorHandler(400, 'Invalid credentials')

		// jwt
		generateTokenAndSetCookie(event, user._id)

		user.lastLogin = new Date()
		await user.save()

		return {
			success: true,
			message: 'Logged in successfully',
			//@ts-ignore
			user: { ...user._doc, password: undefined },
		}
	} catch (error) {
		//@ts-ignore
		errorHandler(400, error.message)
	}
})
