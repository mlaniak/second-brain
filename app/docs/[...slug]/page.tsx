import { getDocumentBySlug, getDocuments } from '@/lib/docs'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: { slug: string[] }
}

export async function generateStaticParams() {
  const docs = await getDocuments()
  return docs.map(doc => ({
    slug: doc.slug.split('/')
  }))
}

export default async function DocPage({ params }: Props) {
  const slug = params.slug.join('/')
  const doc = await getDocumentBySlug(slug)
  
  if (!doc) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto p-8">
        <Link 
          href="/" 
          className="text-zinc-400 hover:text-zinc-200 mb-8 inline-block"
        >
          ← Back to Home
        </Link>
        
        <article className="prose prose-invert prose-zinc max-w-none">
          <header className="mb-8 not-prose">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                doc.type === 'journal' ? 'bg-blue-900 text-blue-200' :
                doc.type === 'concept' ? 'bg-purple-900 text-purple-200' :
                'bg-zinc-800 text-zinc-200'
              }`}>
                {doc.type}
              </span>
              {doc.date && (
                <span className="text-zinc-500 text-sm">{doc.date}</span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-zinc-100">{doc.title}</h1>
          </header>
          
          <div className="whitespace-pre-wrap text-zinc-300">
            {doc.content}
          </div>
        </article>

        <footer className="mt-16 pt-8 border-t border-zinc-800 text-zinc-500 text-sm">
          Built by Jarvis 🤖
        </footer>
      </div>
    </main>
  )
}
