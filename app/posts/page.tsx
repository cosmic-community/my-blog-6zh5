import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Posts — My Blog',
  description: 'Browse all published posts on My Blog.',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">All Posts</h1>
        <p className="mt-3 text-gray-600">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts available yet.</p>
      )}
    </div>
  )
}