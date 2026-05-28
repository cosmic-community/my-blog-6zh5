// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getCategoryBySlug,
  getPostsByCategory,
  getAllCategories,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) {
    return { title: 'Category Not Found — My Blog' }
  }
  const name = getMetafieldValue(category.metadata?.name) || category.title
  return {
    title: `${name} — My Blog`,
    description: getMetafieldValue(category.metadata?.description) || `Posts in ${name}`,
  }
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-600 mb-3">
          🏷️ Category
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900">{name}</h1>
        {description && <p className="mt-3 text-gray-600 max-w-2xl">{description}</p>}
      </header>

      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts in this category yet.</p>
      )}

      <div className="mt-12">
        <Link href="/categories" className="text-brand-600 font-semibold hover:text-brand-700">
          ← Back to all categories
        </Link>
      </div>
    </div>
  )
}