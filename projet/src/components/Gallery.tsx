'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'

interface GalleryImage {
  id: string
  url: string
  public_id: string
  created_at: string
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = getSupabaseClient()

  // Charger les images depuis Supabase
  useEffect(() => {
    if (isSupabaseConfigured) {
      loadImages()
    } else {
      setError('Configuration incomplète')
      setLoading(false)
    }
  }, [])

  const loadImages = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!supabase) {
        setError('Supabase n\'est pas disponible')
        return
      }

      const { data, error: fetchError } = await supabase
        .from('gallery_images')
        .select('id, url, public_id, created_at')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setImages(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error)
      setError('Erreur lors du chargement des images. Vérifiez votre configuration Supabase.')
    } finally {
      setLoading(false)
    }
  }

  // Ajouter une image après upload Cloudinary
  const handleUploadSuccess = async (result: any) => {
    try {
      if (!supabase) {
        setError('Supabase n\'est pas configuré')
        return
      }

      const url = result.info.secure_url
      const public_id = result.info.public_id

      // Sauvegarder dans Supabase
      const { data, error: insertError } = await supabase
        .from('gallery_images')
        .insert({
          url,
          public_id,
        })
        .select()

      if (insertError) throw insertError

      // Ajouter à la liste locale
      if (data && data[0]) {
        setImages([data[0], ...images])
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'image:', error)
      setError('Erreur lors de l\'upload de l\'image')
    }
  }

  // Supprimer une image
  const deleteImage = async (id: string) => {
    try {
      if (!supabase) {
        setError('Supabase n\'est pas configuré')
        return
      }

      const { error: deleteError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setImages(images.filter(img => img.id !== id))
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      setError('Erreur lors de la suppression de l\'image')
    }
  }

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const isCloudinaryConfigured = uploadPreset && cloudName && !uploadPreset.startsWith('YOUR_') && !cloudName.startsWith('YOUR_')
  const isFullyConfigured = isSupabaseConfigured && isCloudinaryConfigured

  return (
    <div className="space-y-8">
      {/* Configuration incomplete message */}
      {!isSupabaseConfigured && (
        <div className="bg-red-900/50 border border-red-700 text-red-100 px-6 py-4 rounded-lg">
          <h3 className="font-semibold mb-2">🔧 Configuration Supabase incomplète</h3>
          <p className="text-sm mb-4">
            Veuillez configurer les variables d'environnement Supabase dans le fichier <code className="bg-red-900 px-2 py-1 rounded">.env.local</code>:
          </p>
          <pre className="bg-black/50 p-3 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=votre_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé`}
          </pre>
          <p className="text-xs mt-3">
            Consultez <a href="/SETUP_GUIDE.md" className="underline hover:no-underline">SETUP_GUIDE.md</a> pour les instructions complètes.
          </p>
        </div>
      )}

      {!isCloudinaryConfigured && (
        <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-100 px-6 py-4 rounded-lg">
          <h3 className="font-semibold mb-2">🎨 Configuration Cloudinary incomplète</h3>
          <p className="text-sm mb-4">
            Veuillez configurer les variables d'environnement Cloudinary dans le fichier <code className="bg-yellow-900 px-2 py-1 rounded">.env.local</code>:
          </p>
          <pre className="bg-black/50 p-3 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=votre_preset`}
          </pre>
          <p className="text-xs mt-3">
            Consultez <a href="/SETUP_GUIDE.md" className="underline hover:no-underline">SETUP_GUIDE.md</a> pour les instructions complètes.
          </p>
        </div>
      )}

      {error && isFullyConfigured && (
        <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded">
          ⚠️ {error}
        </div>
      )}

      {/* Upload Button */}
      <div className="flex justify-end">
        {isFullyConfigured ? (
          <CldUploadWidget
            uploadPreset={uploadPreset}
            cloudName={cloudName}
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <button
                onClick={() => open()}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                + Ajouter une image
              </button>
            )}
          </CldUploadWidget>
        ) : (
          <button disabled className="px-6 py-2 bg-gray-600 text-white rounded-lg opacity-50 cursor-not-allowed">
            + Ajouter une image
          </button>
        )}
      </div>

      {/* Gallery Content */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">
          <div className="inline-block animate-spin">⏳</div> Chargement...
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Aucune image pour le moment</p>
          <p className="text-xs mt-2">Commencez par ajouter votre première image ! 📸</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg bg-gray-900 min-h-[300px]">
              <Image
                src={image.url}
                alt="Galerie AUREN"
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {isFullyConfigured && (
                <button
                  onClick={() => deleteImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition"
                >
                  Supprimer
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
