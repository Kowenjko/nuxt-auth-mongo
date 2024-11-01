import { User } from '~/server/models/user.model'
import { sendPasswordResetEmail } from '@/server/utils/mailtrap/mails'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
	const { email } = await readBody(event)
	const { clientUrl } = useRuntimeConfig()

	try {
		const user = await User.findOne({ email })
		if (!user) return errorHandler(400, 'User not found')

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString('hex')
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

		user.resetPasswordToken = resetToken
		user.resetPasswordExpiresAt = resetTokenExpiresAt

		await user.save()

		// send email
		await sendPasswordResetEmail(user.email, `${clientUrl}/reset-password/${resetToken}`)
		return { success: true, message: 'Password reset link sent to your email' }
	} catch (error) {
		//@ts-ignore
		errorHandler(400, error.message)
	}
})
