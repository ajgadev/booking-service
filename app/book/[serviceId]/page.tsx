import { notFound } from 'next/navigation'
import BookingForm from '@/components/BookingForm'

const services = {
  plumbing: 'Plumbing',
  gardening: 'Gardening',
  electrical: 'Electrical Work',
  technician: 'Technician Services',
}

export default function BookingPage({ params }: { params: { serviceId: string } }) {
  const serviceName = services[params.serviceId as keyof typeof services]

  if (!serviceName) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Book {serviceName}</h2>
      <BookingForm serviceName={serviceName} />
    </div>
  )
}

