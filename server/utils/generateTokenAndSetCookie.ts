import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'
import { NODE_ENV, UserDocument } from '@/types'

export const generateTokenAndSetCookie = (event: H3Event, userId: UserDocument['_id']) => {
	const { jwtSecret, nodeEnv } = useRuntimeConfig()

	const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' })

	setCookie(event, 'token', token, {
		httpOnly: true,
		secure: nodeEnv === NODE_ENV.PRODUCTION,
		sameSite: 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	})

	return token
}
