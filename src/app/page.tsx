'use client'

import dynamic from 'next/dynamic'

const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">AUREN Gallery</h1>
          <p className="text-gray-400 mt-2">Galerie d'images partagée en temps réel</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <section>
          <h2 className="text-2xl font-semibold mb-8">Galerie</h2>
          <Gallery />
        </section>
      </div>
    </main>
  )
}

