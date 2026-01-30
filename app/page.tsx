import Link from 'next/link'
import { getDocuments } from '@/lib/docs'

export default async function Home() {
  const docs = await getDocuments()
  
  const journals = docs.filter(d => d.type === 'journal').slice(0, 5)
  const concepts = docs.filter(d => d.type === 'concept')
  const projects = docs.filter(d => d.type === 'project')
  const reports = docs.filter(d => d.type === 'report')

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">🧠 Second Brain</h1>
          <p className="text-zinc-400">Mike & Jarvis shared knowledge base</p>
        </header>

        <div className="grid gap-8">
          {/* Recent Journals */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-blue-400">📅 Recent Journals</h2>
            <div className="space-y-2">
              {journals.map(doc => (
                <Link 
                  key={doc.slug} 
                  href={`/docs/${doc.slug}`}
                  className="block p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition"
                >
                  <span className="text-zinc-300">{doc.title}</span>
                  <span className="text-zinc-500 text-sm ml-2">{doc.date}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Concepts */}
          {concepts.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">💡 Concepts</h2>
              <div className="space-y-2">
                {concepts.map(doc => (
                  <Link 
                    key={doc.slug} 
                    href={`/docs/${doc.slug}`}
                    className="block p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition"
                  >
                    <span className="text-zinc-300">{doc.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-green-400">🚀 Projects</h2>
              <div className="space-y-2">
                {projects.map(doc => (
                  <Link 
                    key={doc.slug} 
                    href={`/docs/${doc.slug}`}
                    className="block p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition"
                  >
                    <span className="text-zinc-300">{doc.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Reports */}
          {reports.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-amber-400">📊 Reports</h2>
              <div className="space-y-2">
                {reports.map(doc => (
                  <Link 
                    key={doc.slug} 
                    href={`/docs/${doc.slug}`}
                    className="block p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition"
                  >
                    <span className="text-zinc-300">{doc.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className="mt-16 pt-8 border-t border-zinc-800 text-zinc-500 text-sm">
          Built by Jarvis 🤖 • Updated continuously
        </footer>
      </div>
    </main>
  )
}
