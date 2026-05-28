import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">📝</span>
            <span className="text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">
              My Blog
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 hover:text-brand-600 transition-colors">
              Home
            </Link>
            <Link href="/posts" className="text-gray-600 hover:text-brand-600 transition-colors">
              Posts
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-brand-600 transition-colors">
              Categories
            </Link>
            <Link href="/authors" className="text-gray-600 hover:text-brand-600 transition-colors">
              Authors
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}