'use client'

import { useEffect, useState } from 'react'

interface GalleryImage {
  id: string
  url: string
  created_at: string
}

export default function Home() {
  const [allImages, setAllImages] = useState<GalleryImage[]>([])
  const [displayedCount, setDisplayedCount] = useState(6)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const imagesPerLoad = 6

  useEffect(() => {
    fetchAllImages()
  }, [])

  async function fetchAllImages() {
    try {
      const response = await fetch('/api/gallery')
      if (!response.ok) throw new Error(`Erreur API: ${response.status}`)

      const images = await response.json()
      setAllImages(images || [])
      setError(null)
    } catch (err) {
      console.error('Erreur chargement galerie:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const imagesToShow = allImages.slice(0, displayedCount)
  const hasMore = displayedCount < allImages.length

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', fontWeight: 700 }}>
          📸 AUREN Gallery
        </h1>

        <div style={{ textAlign: 'center', marginBottom: '40px', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
          <p>
            👉{' '}
            <a
              href="https://auren-jn7p.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#61affe', textDecoration: 'none', fontWeight: 600 }}
            >
              Ajouter des photos dans la galerie
            </a>
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '60px',
          }}
        >
          {loading && <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', gridColumn: '1 / -1' }}>Chargement des images...</div>}

          {error && (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#ff6b6b', gridColumn: '1 / -1' }}>
              Erreur: {error}
            </div>
          )}

          {!loading && !error && imagesToShow.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#999', gridColumn: '1 / -1' }}>
              Aucune image disponible
            </div>
          )}

          {!loading &&
            !error &&
            imagesToShow.map((img) => (
              <div
                key={img.id}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  aspectRatio: '1',
                  background: '#1a1a1a',
                }}
              >
                <img
                  src={img.url}
                  alt="Photo AUREN"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                />
              </div>
            ))}

          {hasMore && !loading && !error && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '30px' }}>
              <button
                onClick={() => setDisplayedCount((prev) => prev + imagesPerLoad)}
                style={{
                  padding: '12px 30px',
                  background: '#e6c97a',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                }}
              >
                ➕ Afficher plus ({allImages.length - displayedCount} restantes)
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

