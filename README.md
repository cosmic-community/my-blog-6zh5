# My Blog

![App Preview](https://imgix.cosmicjs.com/004559a0-5ac8-11f1-8f10-3bfb47a5cb5d-autopilot-photo-1585208798174-6cedd86e019a-1779995046948.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and fully responsive creative blog built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse posts, explore categories, and discover talented authors — all served from your existing Cosmic content structure.

## Features

- 📝 **Posts** — Full blog post listing and detail pages with featured images, excerpts, tags, author, and category
- 🏷️ **Categories** — Browse posts by category with dedicated category pages
- 👤 **Authors** — Author profiles with bio, photo, and their published posts
- 🎨 **Modern, responsive design** built with Tailwind CSS
- ⚡ **Server-rendered** with Next.js App Router for fast performance and SEO
- 🔍 **SEO optimized** with dynamic metadata per page
- 🖼️ **Optimized images** using imgix transformations
- ♿ **Accessible** semantic markup and keyboard-friendly navigation

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a18916d213faba114a0520f&clone_repository=6a189256213faba114a05240)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) ([SDK docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `authors`, `categories`, and `posts` object types

### Installation

```bash
# Install dependencies
bun install

# Set up environment variables (see below)

# Run the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

Set the following in your hosting platform or a local `.env` file:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with connected author and category
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three Cosmic object types:

- **authors** — `name`, `bio`, `profile_photo`, `email`
- **categories** — `name`, `description`
- **posts** — `content`, `excerpt`, `featured_image`, `tags`, `author` (object), `category` (object)

Connected objects (author and category on a post) are resolved using the Cosmic `depth` parameter. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push your code to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables above
4. Deploy

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Set the build command to `bun run build`
3. Add the environment variables
4. Deploy

<!-- README_END -->