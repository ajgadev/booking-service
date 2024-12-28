import Image from 'next/image'
import { Star } from 'lucide-react'
import { translations, Language } from '@/utils/translations'

interface ServiceProvider {
  id: number
  name: string
  rating: number
  reviews: number
  price: number
  image: string
  category: string
}

export default function ServiceProviderCard({ provider, language }: { provider: ServiceProvider; language: Language }) {
  const t = translations[language]

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={provider.image} alt={provider.name} width={300} height={200} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{provider.name}</h3>
        <div className="flex items-center space-x-1">
          <Star size={16} className="text-yellow-500 fill-current" />
          <span className="font-medium">{provider.rating}</span>
          <span className="text-gray-500">({provider.reviews} {t.reviews})</span>
        </div>
        <p className="text-gray-700">{t.startingFrom} ${provider.price}/{t.hour}</p>
        <p className="text-sm text-gray-500 capitalize">{t[provider.category as keyof typeof t]}</p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
          {t.bookNow}
        </button>
      </div>
    </div>
  )
}

