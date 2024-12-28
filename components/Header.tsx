'use client'

import { useState, useEffect, useRef } from 'react'
import { Sliders, Hammer, Scissors, Wrench, Zap, Truck, PaintBucket, Thermometer, ChevronLeft, ChevronRight, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { translations, Language } from '@/utils/translations'

const services = [
  { id: 'cleaning', name: 'cleaning', icon: Scissors },
  { id: 'plumbing', name: 'plumbing', icon: Wrench },
  { id: 'electrical', name: 'electrical', icon: Zap },
  { id: 'moving', name: 'moving', icon: Truck },
  { id: 'painting', name: 'painting', icon: PaintBucket },
  { id: 'hvac', name: 'hvac', icon: Thermometer },
  { id: 'handyman', name: 'handyman', icon: Hammer },
]

export default function Header({ onCategorySelect }: { onCategorySelect: (category: string | null) => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [language, setLanguage] = useState<Language>('es')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = categoryId === selectedCategory ? null : categoryId
    setSelectedCategory(newCategory)
    onCategorySelect(newCategory)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md">
      <nav className="border-b">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative flex items-center">
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 z-10 bg-white rounded-full p-2 shadow-md ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity duration-300`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleCategoryClick(service.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition duration-300 flex-shrink-0 ${
                  selectedCategory === service.id ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <service.icon size={24} className="mb-1" />
                <span className="text-sm whitespace-nowrap">{translations[language][service.name as keyof typeof translations.es]}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scroll('right')}
              className={`bg-white rounded-full p-2 shadow-md ${
                canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } transition-opacity duration-300`}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
            <button className="flex-shrink-0 flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300">
              <Sliders size={20} />
              <span>{translations[language].filters}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

