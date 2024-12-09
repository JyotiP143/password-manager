import PasswordForm from '../components/PasswordForm'

export default function Home() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Password Manager</h1>
      <PasswordForm />
    </div>
  )
}

