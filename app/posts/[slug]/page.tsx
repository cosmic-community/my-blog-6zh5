// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, getMetafieldValue, getTags } from '@/lib/cosmic'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: 'Post Not Found — My Blog' }
  }
  return {
    title: `${post.title} — My Blog`,
    description: getMetafieldValue(post.metadata?.excerpt) || post.title,
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const content = getMetafieldValue(post.metadata?.content)
  const category = post.metadata?.category
  const author = post.metadata?.author
  const tags = getTags(post.metadata?.tags)

  return (
    <article>
      {/* Hero image */}
      {featuredImage && (
        <div className="w-full h-80 sm:h-96 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=2000&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1000}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block mb-4 text-sm font-semibold uppercase tracking-wide text-brand-600 hover:text-brand-700"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          {post.title}
        </h1>

        {author && (
          <Link
            href={`/authors/${author.slug}`}
            className="mt-6 flex items-center gap-3 group w-fit"
          >
            {author.metadata?.profile_photo ? (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={author.title}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                👤
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </Link>
        )}

        {content && (
          <div
            className="prose prose-lg mt-10 prose-headings:text-gray-900 prose-a:text-brand-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Link href="/posts" className="text-brand-600 font-semibold hover:text-brand-700">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}