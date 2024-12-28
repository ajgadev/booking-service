'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header onCategorySelect={setSelectedCategory} />
        <main className="pt-32">
          {React.cloneElement(children as React.ReactElement, { selectedCategory })}
        </main>
        <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>&copy; 2023 Service Booking App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}

