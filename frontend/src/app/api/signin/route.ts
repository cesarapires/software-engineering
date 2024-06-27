import { NextRequest, NextResponse } from 'next/server'
import Api from '@/lib/api'
import { JwtResponse, loginSchema } from '@/types/jwtResponse'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const credentials = await req.json()

  try {
    const response = await Api.post<JwtResponse>(
      process.env.NEXT_PUBLIC_API_URL + '/auth/login',
      credentials
    )
    if (response.status !== 200) {
      throw new Error('oi')
    }
    const loginResponse = loginSchema.parse(response.data)
    const cookie = cookies()
    cookie.set('token', loginResponse.token, {
      expires: new Date().getTime() + loginResponse.expiresIn,
      httpOnly: true,
    })

    const redirectUrl = '/'
    return NextResponse.redirect(new URL(redirectUrl, req.url), 302)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 403 })
  }
}
