import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block p-6 rounded-2xl border border-gray-200 bg-white hover:border-brand-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-xl group-hover:bg-brand-200 transition-colors">
          🏷️
        </span>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
          {name}
        </h3>
      </div>
      {description && <p className="text-sm text-gray-600 line-clamp-3">{description}</p>}
    </Link>
  )
}