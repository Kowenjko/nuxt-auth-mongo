import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'

export const verifyToken = (event: H3Event) => {
	const { jwtSecret } = useRuntimeConfig()
	let token = getCookie(event, 'token')

	if (!token) return errorHandler(401, 'Unauthorized - no token provided')

	try {
		const decoded = jwt.verify(token, jwtSecret)
		if (!decoded) return errorHandler(401, 'Unauthorized - invalid token')

		// @ts-ignore
		return decoded.userId
	} catch (error) {
		//@ts-ignore
		errorHandler(400, error.message)
	}
}
