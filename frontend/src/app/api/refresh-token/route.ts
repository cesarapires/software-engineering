import { loginSchema } from '@/types/jwtResponse'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const refreshToken = loginSchema.parse(await req.json())
    const cookie = cookies()
    cookie.set('token', refreshToken.token, {
      expires: new Date().getTime() + refreshToken.expiresIn,
      httpOnly: false,
    })

    return NextResponse.json({})
  } catch (err) {
    console.log(err)
    return NextResponse.json({})
  }
}
