import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  const { id } = params
  const { email, password } = await request.json()
  const index = passwords.findIndex(entry => entry.id === parseInt(id))
  
  if (index !== -1) {
    passwords[index] = { ...passwords[index], email, password }
    return NextResponse.json(passwords[index])
  }
  
  return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
}

export async function DELETE(request, { params }) {
  const { id } = params
  const index = passwords.findIndex(entry => entry.id === parseInt(id))
  
  if (index !== -1) {
    passwords.splice(index, 1)
    return NextResponse.json({ message: 'Entry deleted' })
  }
  
  return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
}

