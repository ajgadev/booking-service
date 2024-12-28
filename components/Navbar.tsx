'use client'

import Link from 'next/link'
import { useState } from 'react'
import { UserCircle } from 'lucide-react'
import { translations, Language } from '@/utils/translations'

export default function Navbar({ language }: { language: Language }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const t = translations[language]

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">ServiceBook</Link>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <UserCircle size={24} />
                <span>{language === 'es' ? 'Perfil' : 'Profile'}</span>
              </Link>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(true)} 
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              >
                {language === 'es' ? 'Iniciar sesión' : 'Log In'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

