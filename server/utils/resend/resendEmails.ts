import { sender, clientResend } from '@/server/utils/resend/resend.config'
import { VERIFICATION_EMAIL_TEMPLATE } from '@/server/utils/emailTemplates'

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
	try {
		const response = await clientResend.emails.send({
			from: sender,
			// to: email,
			to: 'ortoswt@gmail.com',
			subject: 'Verify your email',
			html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
		})

		console.log('Email sent successfully', response)
	} catch (error) {
		console.error(`Error sending verification`, error)

		throw new Error(`Error sending verification email: ${error}`)
	}
}
