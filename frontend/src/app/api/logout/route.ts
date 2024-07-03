import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  try {
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '{}',
    })

    const cookie = cookies()
    cookie.delete('token')

    const redirectUrl = '/login'
    return NextResponse.redirect(new URL(redirectUrl, req.url), 302)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 403 })
  }
}
