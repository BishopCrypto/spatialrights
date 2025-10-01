import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Check authentication from cookies
function checkAuth(request) {
  const cookies = request.headers.get('cookie') || ''
  return cookies.includes('admin_authenticated=true')
}

// Recursively get all markdown files from a directory
async function getMarkdownFiles(dir, baseDir = dir, category = '') {
  const files = []
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        const subCategory = entry.name.toUpperCase()
        const subFiles = await getMarkdownFiles(fullPath, baseDir, subCategory)
        files.push(...subFiles)
      } else if (entry.name.endsWith('.md')) {
        // Get file stats for size and date
        const stats = await fs.stat(fullPath)
        const relativePath = path.relative(baseDir, fullPath)

        files.push({
          id: relativePath.replace(/\.md$/, '').replace(/\//g, '-').toLowerCase(),
          title: entry.name.replace(/\.md$/, '').replace(/_/g, ' '),
          filename: relativePath,
          category: category || 'General',
          size: `${(stats.size / 1024).toFixed(1)}KB`,
          updated: new Date(stats.mtime).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          owner: 'RS'
        })
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error)
  }

  return files
}

export async function GET(request) {
  try {
    // Check authentication
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const docsDir = path.join(process.cwd(), 'documents')

    // If ID provided, return specific document content
    if (id) {
      // Reconstruct filename from ID
      const filename = id.replace(/-/g, '/') + '.md'
      const docPath = path.join(docsDir, filename)

      try {
        const fileContent = await fs.readFile(docPath, 'utf8')
        const stats = await fs.stat(docPath)

        return NextResponse.json({
          id,
          filename,
          content: fileContent,
          size: `${(stats.size / 1024).toFixed(1)}KB`,
          updated: new Date(stats.mtime).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        })
      } catch (error) {
        return NextResponse.json(
          { error: 'Document file not found' },
          { status: 404 }
        )
      }
    }

    // Otherwise return document list (scan all markdown files)
    const documents = await getMarkdownFiles(docsDir)

    // Count categories
    const categories = documents.reduce((acc, doc) => {
      acc[doc.category] = (acc[doc.category] || 0) + 1
      return acc
    }, {})

    return NextResponse.json({
      documents,
      stats: {
        total: documents.length,
        categories
      }
    })
  } catch (error) {
    console.error('Error in documents API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
