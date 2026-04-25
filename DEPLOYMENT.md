# 🚀 Guide Complet de Déploiement

Ce guide vous expliquera comment déployer la galerie AUREN sur Vercel avec Supabase et Cloudinary.

## Étape 1: Configurer Supabase

### 1.1 Créer un compte Supabase
- Aller sur [supabase.com](https://supabase.com)
- Cliquer sur "Start your project"
- Se connecter avec GitHub

### 1.2 Créer un nouveau projet
- Cliquer sur "New project"
- Choisir une organisation
- Donner un nom au projet (ex: "auren-gallery")
- Choisir une région (ex: Europe)
- Défmir un mot de passe
- Cliquer sur "Create new project"

### 1.3 Créer la table
- Aller à "SQL Editor"
- Cliquer sur "New query"
- Copier/coller ce code :

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

- Cliquer sur "Run"

### 1.4 Récupérer les credentials
- Aller à "Settings" > "API"
- Copier l'URL du projet → `NEXT_PUBLIC_SUPABASE_URL`
- Copier la clé "anon public" → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Étape 2: Configurer Cloudinary

### 2.1 Créer un compte Cloudinary
- Aller sur [cloudinary.com](https://cloudinary.com)
- S'inscrire (gratuit)

### 2.2 Récupérer le Cloud Name
- Aller au Dashboard
- Copier le "Cloud Name" → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

### 2.3 Créer un Upload Preset
- Aller à "Settings" > "Upload"
- Scroller jusqu'à "Upload presets"
- Cliquer sur "Create"
- Remplir :
  - **Preset name**: `auren_gallery`
  - **Unsigned**: Activé (toggle ON)
- Cliquer sur "Save"
- Copier le nom du preset → `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

## Étape 3: Déployer sur Vercel

### 3.1 Préparer le code
```bash
# Vérifier que tout est commit
git add .
git commit -m "🎉 Add AUREN Gallery with Supabase and Cloudinary"
git push
```

### 3.2 Déployer sur Vercel
- Aller sur [vercel.com](https://vercel.com)
- Cliquer sur "Add New..." > "Project"
- Sélectionner le repository GitHub (auren_officiel)
- Cliquer sur "Import"

### 3.3 Configurer les variables d'environnement
- Dans "Environment Variables", ajouter :

| Clé | Valeur |
|-----|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Votre URL Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Votre clé anon Supabase |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Votre Cloud Name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `auren_gallery` |

### 3.4 Déployer
- Cliquer sur "Deploy"
- Attendre la fin du déploiement
- Cliquer sur le lien du projet
- Voilà! La galerie est en ligne! 🎉

## Étape 4: Tester

1. Ouvrir le lien de votre projet Vercel
2. Cliquer sur "+ Ajouter une image"
3. Sélectionner une image
4. L'image devrait apparaître dans la galerie
5. Ouvrir le lien dans une autre fenêtre en incognito
6. L'image devrait être visible (partagée en temps réel!) ✨

## 📝 Notes importantes

- Les images sont accessibles à **tous** les visiteurs
- Pour sécuriser (ajouter authentification), consultez la [doc Supabase](https://supabase.com/docs/guides/auth)
- Supabase offre **500 MB de stockage** gratuitement
- Cloudinary offre **25 crédits** de transformation gratuits par mois
- Les images supprimées sont supprimées de Supabase mais restent dans Cloudinary (supprimer manuellement si besoin)

## 🆘 Dépannage

### Erreur "Supabase n'est pas configuré"
- Vérifier que .env.local contient les variables
- Dans Vercel, vérifier que les variables sont dans "Environment Variables"
- Re-déployer après ajout des variables

### L'upload d'image ne fonctionne pas
- Vérifier que `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` est correct
- Vérifier que le preset est "Unsigned"
- Ouvrir la console du navigateur (F12) pour voir les erreurs

### Les images de certains utilisateurs ne s'affichent pas
- Vérifier la politique RLS dans Supabase
- S'assurer que "Public read access" est activée

## 💡 Prochaines étapes

- Ajouter authentification utilisateur
- Ajouter des filtres/catégories
- Ajouter des commentaires
- Ajouter des likes
- Améliorer le design avec plus de portfolios
