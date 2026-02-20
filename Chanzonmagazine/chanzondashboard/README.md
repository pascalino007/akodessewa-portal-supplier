# Chanzon Dashboard

Dashboard Next.js pour gérer les **articles** et les **catégories** (CRUD). Données stockées dans le navigateur (localStorage) pour l’instant ; prêt à être branché sur une API / base de données.

## Lancer le projet

```bash
cd chanzondashboard
npm install
npm run dev
```

Ouvrir [http://localhost:3001](http://localhost:3001). La racine redirige vers `/dashboard`.

## Fonctionnalités

- **Sidebar** : Tableau de bord, Articles, Catégories.
- **Catégories** : Liste, création (nom + slug), modification, suppression.
- **Articles** : Liste, création, modification, suppression.
  - Champs : **nom**, **image** (URL), **catégorie**, **au moins 3 sections de texte**.
  - Possibilité d’ajouter ou supprimer des sections (minimum 3).

## Structure

- `src/context/DashboardContext.tsx` : état global (catégories + articles), persistance localStorage.
- `src/app/dashboard/layout.tsx` : layout avec sidebar.
- `src/app/dashboard/categories/` : CRUD catégories.
- `src/app/dashboard/posts/` : CRUD articles.

Pour connecter un backend, remplacer dans le context les lectures/écritures localStorage par des appels API.
