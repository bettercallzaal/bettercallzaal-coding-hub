import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  description: string
  url: string
  language: string
  status: string
}

interface Props {
  projects: Project[]
}

export default function Portfolio({ projects }: Props) {
  const [search, setSearch] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')

  const languages = ['All', ...new Set(projects.map(p => p.language))]

  const filtered = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
      
      const matchesLanguage = 
        selectedLanguage === 'All' || project.language === selectedLanguage

      return matchesSearch && matchesLanguage
    })
  }, [search, selectedLanguage, projects])

  return (
    <>
      <Head>
        <title>Zaal's Portfolio Hub</title>
        <meta name="description" content="70 projects aggregated with search and filtering" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">Zaal's Projects</h1>
            <p className="text-lg text-gray-400">
              {projects.length} projects across {new Set(projects.map(p => p.language)).size} languages
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search projects by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Language Filter */}
          <div className="mb-8 flex flex-wrap gap-3">
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-full font-medium transition ${\n                  selectedLanguage === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-400 mb-6">
            Showing {filtered.length} of {projects.length} projects
          </p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 hover:bg-gray-750 transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-blue-400 transition">
                    {project.name}
                  </h3>
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    {project.language}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-400 font-medium">
                    {project.status}
                  </span>
                  <span className="text-blue-400 text-sm group-hover:translate-x-1 transition">
                    View →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No projects found. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  // Load projects from the public folder
  const projects = require('../public/projects.json')
  
  return {
    props: {
      projects: projects.slice(0, 70),
    },
    revalidate: 3600, // Revalidate every hour
  }
}
