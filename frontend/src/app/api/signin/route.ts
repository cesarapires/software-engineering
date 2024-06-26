import { NextApiRequest, NextApiResponse } from 'next'
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
    })

    const redirectUrl = '/'
    return NextResponse.redirect(new URL(redirectUrl, req.url), 302)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 403 })
  }
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JwtResponse>
) {
  if (req.method === 'POST') {
    return POST(req as any)
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
