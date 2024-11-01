import { User } from '~/server/models/user.model'
import { sendResetSuccessEmail } from '@/server/utils/mailtrap/mails'
import bcryptjs from 'bcryptjs'

export default defineEventHandler(async (event) => {
	try {
		const { password } = await readBody(event)
		const token = getRouterParam(event, 'token')

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		})

		if (!user) return errorHandler(400, 'Invalid or expired reset token')

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10)

		user.password = hashedPassword
		user.resetPasswordToken = undefined
		user.resetPasswordExpiresAt = undefined
		await user.save()

		await sendResetSuccessEmail(user.email)
	} catch (error) {
		//@ts-ignore
		errorHandler(400, error.message)
	}
})
