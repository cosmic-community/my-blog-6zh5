import type { Metadata } from 'next'
import { getAllAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Authors — My Blog',
  description: 'Meet the talented writers behind My Blog.',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Authors</h1>
        <p className="mt-3 text-gray-600">Meet the writers behind the stories.</p>
      </header>

      {authors.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No authors available yet.</p>
      )}
    </div>
  )
}