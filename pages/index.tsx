import { useState, useMemo } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'

interface Project {
  name: string
  description: string
  url: string
  language: string
  status: string
}

interface PageProps {
  projects: Project[]
}

const LANGUAGES = ['TypeScript', 'HTML', 'JavaScript', 'Python', 'Solidity', 'Other']

export default function Home({ projects }: PageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLanguage = selectedLanguage ? project.language === selectedLanguage : true

      return matchesSearch && matchesLanguage
    })
  }, [searchQuery, selectedLanguage])

  return (
    <>
      <Head>
        <title>Zaal's Coding Hub</title>
        <meta name="description" content="Projects by @bettercallzaal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-2 text-4xl font-bold">Zaal&apos;s Coding Hub</h1>
            <p className="text-gray-400">All projects • Web3 • Creator Infrastructure • Governance • IRL Activations</p>
          </div>

          {/* Stats */}
          <div className="mb-8 flex gap-6 rounded-lg bg-gray-800 p-6">
            <div>
              <p className="text-2xl font-bold text-blue-400">{projects.length}</p>
              <p className="text-sm text-gray-400">Projects</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">{filteredProjects.length}</p>
              <p className="text-sm text-gray-400">Matches</p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Language Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLanguage(null)}
              className={`rounded-full px-4 py-2 font-medium transition ${
                selectedLanguage === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`rounded-full px-4 py-2 font-medium transition ${
                  selectedLanguage === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.name}
                className="rounded-lg border border-gray-700 bg-gray-800 p-6 hover:border-blue-500 hover:bg-gray-750 transition"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-lg font-bold text-white">{project.name}</h3>
                  <span className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300">
                    {project.language}
                  </span>
                </div>
                <p className="mb-4 min-h-[2.5rem] text-sm text-gray-400">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No projects found. Try adjusting your search or filters.
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const projectsPath = path.join(process.cwd(), 'public', 'projects.json')
  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'))

  return {
    props: {
      projects: projectsData.projects || [],
    },
    revalidate: 3600,
  }
}
