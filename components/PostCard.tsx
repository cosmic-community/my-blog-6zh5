import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const category = post.metadata?.category
  const author = post.metadata?.author

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-brand-300 hover:shadow-xl transition-all duration-300 flex flex-col">
      <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=480&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={240}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-52 bg-gradient-to-br from-brand-100 to-brand-300 flex items-center justify-center">
            <span className="text-5xl">📝</span>
          </div>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-1">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block mb-3 text-xs font-semibold uppercase tracking-wide text-brand-600 hover:text-brand-700"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        {excerpt && (
          <p className="mt-3 text-gray-600 text-sm line-clamp-3 flex-1">{excerpt}</p>
        )}
        {author && (
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
            {author.metadata?.profile_photo ? (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={author.title}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-200 flex items-center justify-center text-sm">
                👤
              </div>
            )}
            <span className="text-sm font-medium text-gray-700">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}