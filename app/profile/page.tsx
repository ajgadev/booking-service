'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface Review {
  id: number
  reviewer: string
  rating: number
  comment: string
  date: string
}

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 234 567 8901',
  })

  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, reviewer: 'Bob Smith', rating: 5, comment: 'Great service!', date: '2023-06-15' },
    { id: 2, reviewer: 'Carol Davis', rating: 4, comment: 'Very professional.', date: '2023-06-10' },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold">Your Profile</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Save Changes
        </button>
      </form>
      <div>
        <h3 className="text-2xl font-bold mb-4">Your Reviews</h3>
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-md shadow-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{review.reviewer}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

