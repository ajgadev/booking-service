import { notFound } from 'next/navigation'
import ServiceProviderCard from '@/components/ServiceProviderCard'
import { Star } from 'lucide-react'

const services = {
  cleaning: 'Cleaning',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  moving: 'Moving',
  painting: 'Painting',
  hvac: 'HVAC',
  handyman: 'Handyman',
}

const serviceProviders = [
  { id: 1, name: 'John Doe', rating: 4.8, reviews: 120, price: 50, image: '/placeholder.svg' },
  { id: 2, name: 'Jane Smith', rating: 4.5, reviews: 89, price: 45, image: '/placeholder.svg' },
  { id: 3, name: 'Bob Johnson', rating: 4.9, reviews: 200, price: 55, image: '/placeholder.svg' },
]

export default function ServiceProvidersPage({ params }: { params: { serviceId: string } }) {
  const serviceName = services[params.serviceId as keyof typeof services]

  if (!serviceName) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{serviceName} Services</h2>
        <div className="flex items-center space-x-2 text-yellow-500">
          <Star size={20} fill="currentColor" />
          <span className="text-gray-700">4.7 average rating</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceProviders.map((provider) => (
          <ServiceProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  )
}

