import { JWT_SECRET } from '$env/static/private'
import jwt from 'jsonwebtoken'

export async function handle({event, resolve}) {
    const token = event.cookies.get('token') || ''
    
    try {
        if (token) {
            const decodeToken = jwt.verify(token, JWT_SECRET)
            event.locals.user = decodeToken
        } else {
            event.locals.user = null
        }
    } catch (error) {
        console.error('Token verification error:', error)
        event.locals.user = null
    }
    
    return await resolve(event)
}