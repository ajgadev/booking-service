'use client'

import { useState, useEffect } from 'react'
import ServiceProviderCard from '@/components/ServiceProviderCard'
import { Language } from '@/utils/translations'

const serviceProviders = [
  { id: 1, name: 'Juan Pérez', rating: 4.8, reviews: 120, price: 50, image: '/placeholder.svg', category: 'cleaning' },
  { id: 2, name: 'María García', rating: 4.5, reviews: 89, price: 45, image: '/placeholder.svg', category: 'plumbing' },
  { id: 3, name: 'Carlos Rodríguez', rating: 4.9, reviews: 200, price: 55, image: '/placeholder.svg', category: 'electrical' },
  { id: 4, name: 'Ana Martínez', rating: 4.7, reviews: 150, price: 60, image: '/placeholder.svg', category: 'moving' },
  { id: 5, name: 'Diego López', rating: 4.6, reviews: 95, price: 48, image: '/placeholder.svg', category: 'painting' },
  { id: 6, name: 'Laura Sánchez', rating: 4.8, reviews: 180, price: 52, image: '/placeholder.svg', category: 'hvac' },
  { id: 7, name: 'Javier Fernández', rating: 4.7, reviews: 130, price: 47, image: '/placeholder.svg', category: 'handyman' },
]

export default function Home({ selectedCategory }: { selectedCategory: string | null }) {
  const [displayedProviders, setDisplayedProviders] = useState(serviceProviders)
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    if (selectedCategory) {
      const filtered = serviceProviders.filter(provider => provider.category === selectedCategory)
      setDisplayedProviders(filtered)
    } else {
      setDisplayedProviders(serviceProviders)
    }
  }, [selectedCategory])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProviders.map((provider) => (
          <ServiceProviderCard key={provider.id} provider={provider} language={language} />
        ))}
      </div>
      <button
        onClick={toggleLanguage}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
      >
        {language === 'es' ? 'English' : 'Español'}
      </button>
    </div>
  )
}

