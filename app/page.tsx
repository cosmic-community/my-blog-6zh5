import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'

export const revalidate = 60

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])
  const featured = posts[0]
  const recent = posts.slice(1, 7)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Stories worth reading
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto">
            A creative blog featuring fresh ideas, insightful posts, and talented writers.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/posts"
              className="px-6 py-3 rounded-full bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors"
            >
              Browse Posts
            </Link>
            <Link
              href="/authors"
              className="px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Meet the Authors
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured */}
        {featured && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
            <Link
              href={`/posts/${featured.slug}`}
              className="group grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
            >
              {featured.metadata?.featured_image ? (
                <img
                  src={`${featured.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt={featured.title}
                  width={600}
                  height={400}
                  className="w-full h-72 md:h-full object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gradient-to-br from-brand-100 to-brand-300 flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
              )}
              <div className="p-8">
                {featured.metadata?.category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {featured.metadata.category.title}
                  </span>
                )}
                <h3 className="mt-3 text-3xl font-extrabold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {featured.title}
                </h3>
                {featured.metadata?.excerpt && (
                  <p className="mt-4 text-gray-600 line-clamp-3">{featured.metadata.excerpt}</p>
                )}
                <span className="mt-6 inline-block text-brand-600 font-semibold">
                  Read more →
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* Recent posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
            <Link href="/posts" className="text-brand-600 font-semibold hover:text-brand-700">
              View all →
            </Link>
          </div>
          {recent.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recent.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts available yet.</p>
          )}
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Explore Categories</h2>
              <Link href="/categories" className="text-brand-600 font-semibold hover:text-brand-700">
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}