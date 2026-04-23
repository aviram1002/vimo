'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [mode, setMode]         = useState<'login' | 'signup'>('login')
  const [sent, setSent]         = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        window.location.href = '/app/dashboard'
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/app/dashboard` },
        })
        if (error) throw error
        setSent(true)
      }
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials'
        ? 'אימייל או סיסמה שגויים'
        : err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-10 shadow-card border border-brand-border max-w-md w-full text-center">
          <div className="text-5xl mb-4">📬</div>
          <h2 className="text-2xl font-black text-brand-text mb-2">בדוק את המייל שלך</h2>
          <p className="text-brand-muted">שלחנו לך קישור אימות לכתובת <strong>{email}</strong></p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/"><Logo size="lg" /></Link>
          <p className="text-brand-muted mt-2">
            {mode === 'login' ? 'ברוך הבא בחזרה 👋' : 'צור חשבון חינמי'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-card border border-brand-border">
          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-brand-border hover:bg-gray-50 font-semibold text-sm transition-colors mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            המשך עם Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-brand-border" />
            <span className="text-xs text-brand-muted">או</span>
            <div className="flex-1 h-px bg-brand-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="כתובת אימייל"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="סיסמה"
              type="password"
              placeholder="לפחות 8 תווים"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-xl">{error}</p>
            )}

            <Button variant="gradient" size="lg" fullWidth loading={loading} type="submit">
              {mode === 'login' ? 'התחבר' : 'צור חשבון'}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-brand-muted mt-5">
            {mode === 'login' ? 'עדיין אין לך חשבון?' : 'כבר יש לך חשבון?'}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-brand-purple font-bold hover:underline"
            >
              {mode === 'login' ? 'הירשם חינם' : 'התחבר'}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-brand-muted mt-6">
          בהתחברות אתה מסכים ל
          <Link href="/terms" className="text-brand-purple hover:underline mx-1">תנאי השימוש</Link>
          ול
          <Link href="/privacy" className="text-brand-purple hover:underline mr-1">מדיניות הפרטיות</Link>
        </p>
      </div>
    </div>
  )
}
