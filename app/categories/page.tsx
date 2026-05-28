import type { Metadata } from 'next'
import { getAllCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Categories — My Blog',
  description: 'Browse posts by category.',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Categories</h1>
        <p className="mt-3 text-gray-600">Find posts grouped by topic.</p>
      </header>

      {categories.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No categories available yet.</p>
      )}
    </div>
  )
}