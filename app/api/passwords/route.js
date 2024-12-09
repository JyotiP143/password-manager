import { NextResponse } from 'next/server'

let passwords = []
let nextId = 1

export async function GET() {
  return NextResponse.json(passwords)
}

export async function POST(request) {
  const { email, password } = await request.json()
  const newEntry = { id: nextId++, email, password }
  passwords.push(newEntry)
  return NextResponse.json(newEntry, { status: 201 })
}

