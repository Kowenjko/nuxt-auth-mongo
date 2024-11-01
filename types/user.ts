import { Document } from 'mongoose'

export interface UserDocument extends Document {
	email: string
	password: string
	name: string
	lastLogin: Date
	isVerified: boolean
	resetPasswordToken: string
	resetPasswordExpiresAt: Date
	verificationToken: string | undefined
	verificationTokenExpiresAt: Date | undefined
}