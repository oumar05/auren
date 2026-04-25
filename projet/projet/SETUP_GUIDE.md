# AUREN Gallery - Setup Instructions

Ce projet est une galerie d'images partagée en temps réel utilisant **Next.js**, **Supabase** et **Cloudinary**.

## 🚀 Configuration

### 1. Supabase Setup

1. Créer un compte sur [Supabase](https://supabase.com)
2. Créer un nouveau projet
3. Aller à SQL Editor et créer la table :

```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  public_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Policy pour lire (public)
CREATE POLICY "Public read access" ON gallery_images
  FOR SELECT USING (true);

-- Policy pour insérer (public)
CREATE POLICY "Public insert access" ON gallery_images
  FOR INSERT WITH CHECK (true);

-- Policy pour supprimer (public)
CREATE POLICY "Public delete access" ON gallery_images
  FOR DELETE USING (true);
```

4. Récupérer vos credentials :
   - Settings > API > Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Settings > API > Project API Key (anon) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Cloudinary Setup

1. Créer un compte sur [Cloudinary](https://cloudinary.com)
2. Aller à Dashboard pour récupérer `Cloud Name`
3. Aller à Settings > Upload pour créer un preset d'upload non-signé :
   - Upload preset name: `auren_gallery`
4. Récupérer :
   - Cloud Name → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - Upload Preset → `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

### 3. Variables d'environnement

Créer/modifier `.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=auren_gallery
```

## 📝 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Ouvrir http://localhost:3000
```

## 🌍 Déploiement sur Vercel

1. Pousser le code sur GitHub
2. Aller à [Vercel](https://vercel.com)
3. Importer le projet
4. Ajouter les variables d'environnement dans Settings > Environment Variables :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
5. Déployer

## ✨ Fonctionnalités

- ✅ Upload d'images via Cloudinary
- ✅ Stockage des métadonnées dans Supabase
- ✅ Galerie en temps réel (partagée entre tous les utilisateurs)
- ✅ Suppression d'images
- ✅ Responsive design

## 🔒 Sécurité

- Les images sont publiques (accessibles à tous)
- Supabase RLS permet l'accès public en lecture/écriture
- Pour sécuriser : ajouter une authentification utilisateur
