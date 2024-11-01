import { User } from '~/server/models/user.model'
import { verifyToken } from '~/server/utils/verifyToken'

export default defineEventHandler(async (event) => {
	try {
		const userId = verifyToken(event)

		const user = await User.findById(userId).select('-password')
		if (!user) return errorHandler(400, 'User not found')
		return { success: true, user }
	} catch (error) {
		//@ts-ignore
		errorHandler(400, error.message)
	}
})
