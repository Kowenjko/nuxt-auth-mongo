import { Document } from 'mongoose'

export interface UserDocument extends Document {
	email: string
	password: string
	name: string
	lastLogin: Date
	isVerified: boolean
	resetPasswordToken: string | undefined
	resetPasswordExpiresAt: Date | number | undefined
	verificationToken: string | undefined
	verificationTokenExpiresAt: Date | undefined
}
