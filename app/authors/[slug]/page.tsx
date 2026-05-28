// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getAuthorBySlug,
  getPostsByAuthor,
  getAllAuthors,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) {
    return { title: 'Author Not Found — My Blog' }
  }
  const name = getMetafieldValue(author.metadata?.name) || author.title
  return {
    title: `${name} — My Blog`,
    description: getMetafieldValue(author.metadata?.bio) || `Posts by ${name}`,
  }
}

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const email = getMetafieldValue(author.metadata?.email)
  const photo = author.metadata?.profile_photo

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
          {photo ? (
            <img
              src={`${photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={name}
              width={160}
              height={160}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-white/30 mb-6"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-5xl mb-6">
              👤
            </div>
          )}
          <h1 className="text-4xl font-extrabold">{name}</h1>
          {bio && <p className="mt-4 text-brand-100 max-w-2xl">{bio}</p>}
          {email && (
            <a
              href={`mailto:${email}`}
              className="mt-6 inline-block px-5 py-2 rounded-full bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors"
            >
              Contact {name.split(' ')[0]}
            </a>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Posts by {name} ({posts.length})
        </h2>
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">This author has no published posts yet.</p>
        )}

        <div className="mt-12">
          <Link href="/authors" className="text-brand-600 font-semibold hover:text-brand-700">
            ← Back to all authors
          </Link>
        </div>
      </div>
    </div>
  )
}