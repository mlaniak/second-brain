import { NextResponse } from 'next/server'

// Simple password - change this!
const PASSWORD = process.env.BRAIN_PASSWORD || 'jarvis2026'

export async function POST(request: Request) {
  const { password } = await request.json()
  
  if (password === PASSWORD) {
    const response = NextResponse.json({ success: true })
    
    // Set auth cookie - expires in 30 days
    response.cookies.set('brain-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    
    return response
  }
  
  return NextResponse.json({ success: false }, { status: 401 })
}
