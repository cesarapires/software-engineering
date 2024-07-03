import { NextRequest, NextResponse } from 'next/server'
import { JwtResponse, loginSchema } from '@/types/jwtResponse'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const credentials = await req.json()

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const responseData: JwtResponse = await response.json()
    const loginResponse = loginSchema.parse(responseData)
    const cookie = cookies()
    cookie.set('token', loginResponse.token, {
      expires: new Date().getTime() + loginResponse.expiresIn,
      httpOnly: false,
    })

    const redirectUrl = '/'
    return NextResponse.redirect(new URL(redirectUrl, req.url), 302)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 403 })
  }
}
