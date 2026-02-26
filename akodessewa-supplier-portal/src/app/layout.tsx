import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Akodessewa - Portail Fournisseur',
  description: 'Gerez vos produits, commandes et ventes sur Akodessewa.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
