'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StoredPasswords() {
  const [passwords, setPasswords] = useState([])
  const [editId, setEditId] = useState(null)
  const [editEmail, setEditEmail] = useState('')
  const [editPassword, setEditPassword] = useState('')

  useEffect(() => {
    fetchPasswords()
  }, [])

  const fetchPasswords = async () => {
    const response = await fetch('/api/passwords')
    const data = await response.json()
    setPasswords(data)
  }

  const handleEdit = (id, email, password) => {
    setEditId(id)
    setEditEmail(email)
    setEditPassword(password)
  }

  const handleSave = async () => {
    const response = await fetch(`/api/passwords/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: editEmail, password: editPassword }),
    })

    if (response.ok) {
      setEditId(null)
      fetchPasswords()
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`/api/passwords/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      fetchPasswords()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stored Passwords</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passwords.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  {editId === entry.id ? (
                    <Input
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  ) : (
                    entry.email
                  )}
                </TableCell>
                <TableCell>
                  {editId === entry.id ? (
                    <Input
                      type="password"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                    />
                  ) : (
                    '********'
                  )}
                </TableCell>
                <TableCell>
                  {editId === entry.id ? (
                    <Button onClick={handleSave}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEdit(entry.id, entry.email, entry.password)}>Edit</Button>
                  )}
                  <Button variant="destructive" className="ml-2" onClick={() => handleDelete(entry.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

