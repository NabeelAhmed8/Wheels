import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { adminLogin, getAdminAuth } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Loader2, ArrowRight, ArrowLeft } from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Redirect if already authenticated
  useEffect(() => {
    const auth = getAdminAuth()
    if (auth.isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [navigate])

  const handleFillDemo = () => {
    setEmail('admin@motorcyclefleet.com')
    setPassword('admin123456')
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await adminLogin(email.trim(), password)
      navigate('/admin', { replace: true })
    } catch (err) {
      console.error('Login error:', err)
      setError(err.response?.data?.message || 'Invalid email or password. Please verify your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-red-600 selection:text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <Link to="/" className="flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Public Showroom</span>
        </Link>
        <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 uppercase">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span>Secure Operations Portal Online</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12 bg-[#121212] border border-neutral-800 p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <BrandLogo variant="symbol" size="sm" theme="dark" />
            <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-bold">
              // OFFICIAL MANAGEMENT PORTAL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-white">
            Operations <span className="italic font-normal text-red-500">Management Portal</span>
          </h1>
          <p className="font-mono text-xs text-neutral-400">
            Sign in with your verified administrative credentials to inspect order queues, verify bank slips, and dispatch motorcycles.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 font-mono text-xs flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-neutral-400" />
              <span>Admin Email</span>
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@motorcyclefleet.com"
              className="bg-[#1c1c1c] border-neutral-700 text-white font-mono text-xs h-11 focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-neutral-400" />
              <span>Password</span>
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="bg-[#1c1c1c] border-neutral-700 text-white font-mono text-xs h-11 pr-10 focus:border-red-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold gap-2 cursor-pointer transition-colors mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="border-t border-neutral-800 pt-4 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px]">
            <span>Administrative Quick Access:</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-red-500 hover:text-red-400 uppercase font-bold underline cursor-pointer"
            >
              Fill Credentials
            </button>
          </div>
          <div className="p-2.5 bg-[#171717] border border-neutral-800 font-mono text-[10px] text-neutral-400 space-y-1">
            <div>Email: <strong className="text-white">admin@motorcyclefleet.com</strong></div>
            <div>Password: <strong className="text-white">admin123456</strong></div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="border-t border-neutral-800 pt-4 text-center font-mono text-[10px] uppercase text-neutral-600">
        MOTORCYCLE FLEET AUTHORIZED PORTAL • SUPER POWER & EMOTO PAKISTAN
      </div>
    </div>
  )
}
