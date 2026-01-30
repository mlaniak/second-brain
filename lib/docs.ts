import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'docs')

export interface Document {
  slug: string
  title: string
  date: string
  type: string
  content: string
}

function getAllFiles(dir: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      getAllFiles(fullPath, files)
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  
  return files
}

export async function getDocuments(): Promise<Document[]> {
  const files = getAllFiles(docsDirectory)
  
  const docs = files.map(filePath => {
    const relativePath = path.relative(docsDirectory, filePath)
    const slug = relativePath.replace(/\.md$/, '')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
      type: data.type || 'document',
      content
    }
  })
  
  // Sort by date descending
  return docs.sort((a, b) => b.date.localeCompare(a.date))
}

export async function getDocumentBySlug(slug: string): Promise<Document | null> {
  const filePath = path.join(docsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
    type: data.type || 'document',
    content
  }
}
