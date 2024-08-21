import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export function generateToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: 60 * 60 * 24 * 30
  })
}

export function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header was not provided' }), { status: 401 })
  }

  const authParts = authHeader.split(' ')

  if (authParts.length !== 2) {
    return new Response(JSON.stringify({ error: 'Token malformed' }), {
      status: 401
    })
  }

  const [bearer, token] = authParts

  if (!/^Bearer$/i.test(bearer)) {
    return new Response(JSON.stringify({ error: 'Token malformed' }), {
      status: 401
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    return decoded as jwt.JwtPayload
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid Token' }), {
      status: 400
    })
  }
}
