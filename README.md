# AUREN Photography - Gallery App

Une application Next.js pour gérer une galerie d'images partagée avec Supabase et Cloudinary.

## 🎯 Fonctionnalités principales

- **Upload d'images** via Cloudinary
- **Stockage partagé** avec Supabase
- **Temps réel** - Tous les utilisateurs voient les mêmes images
- **Responsive** - Adapté à tous les appareils
- **Déploiement Vercel** - Déployez en un clic

## 🛠 Stack technologique

- **Frontend**: Next.js 15+ avec TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: Supabase (PostgreSQL)
- **Stockage d'images**: Cloudinary
- **Déploiement**: Vercel

## ⚙️ Configuration rapide

Voir [SETUP_GUIDE.md](./SETUP_GUIDE.md) pour les instructions détaillées.

### Variables d'environnement requises

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

## 🚀 Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
src/
├── app/              # Pages Next.js
├── components/       # Composants React
│   └── Gallery.tsx  # Composant galerie principal
└── lib/
    └── supabase.ts  # Configuration Supabase
```

## 🎨 Personnalisation

Le composant Gallery peut être intégré dans n'importe quelle page :

```tsx
import Gallery from '@/components/Gallery'

export default function MyPage() {
  return <Gallery />
}
```

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 📝 Licence

MIT

