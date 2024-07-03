import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname
  const isAuth = await isAuthenticated(request.cookies.get('token')?.value)

  if (currentPath === '/' && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

const isAuthenticated = async (token: string | undefined) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth/is-logged-in'
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }
    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    const body = await response.json()
    fetch(process.env.NEXT_PUBLIC_FRONT_URL + '/api/refresh-token', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const config = {
  matcher: ['/((?!api|v1|_next/static|_next/image|.*\\.png$).*)'],
}
