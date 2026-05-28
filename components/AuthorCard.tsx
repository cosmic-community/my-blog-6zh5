import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const photo = author.metadata?.profile_photo

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 bg-white hover:border-brand-300 hover:shadow-lg transition-all duration-300"
    >
      {photo ? (
        <img
          src={`${photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
          alt={name}
          width={100}
          height={100}
          className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-brand-50 group-hover:ring-brand-100 transition"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center text-4xl mb-4">
          👤
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
        {name}
      </h3>
      {bio && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{bio}</p>}
    </Link>
  )
}