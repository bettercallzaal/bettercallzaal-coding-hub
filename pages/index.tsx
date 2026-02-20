import { useState, useMemo } from 'react'

const LANGUAGES = ['TypeScript', 'Python', 'HTML', 'JavaScript', 'Solidity', 'Other']

export default function Home() {
  const [search, setSearch] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [projects, setProjects] = useState<any[]>([])

  const [isLoading, setIsLoading] = useState(true)

  useMemo(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setIsLoading(false)
      })
  }, [])

  const filtered = useMemo(() => {
    return projects.filter((p: any) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      const matchesLanguage = !selectedLanguage || p.language === selectedLanguage
      return matchesSearch && matchesLanguage
    })
  }, [search, selectedLanguage, projects])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">All Projects</h1>
          <p className="text-slate-600 mt-2">Browse {projects.length} projects across different languages</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLanguage(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !selectedLanguage
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              All Languages
            </button>
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLanguage === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 text-slate-600">
          Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project: any) => (
            <div
              key={project.id}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-slate-900 flex-1">{project.name}</h3>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full ml-2">
                  {project.status}
                </span>
              </div>
              
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                  {project.language}
                </span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View →
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No projects found. Try a different search or filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}