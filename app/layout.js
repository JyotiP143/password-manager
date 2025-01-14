import './globals.css'

export const metadata = {
  title: 'Password Manager',
  description: 'A simple and secure password manager',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}

