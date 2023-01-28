import './globals.css'
import { Raleway } from '@next/font/google';

export const title = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={title.className}>{children}</body>
    </html>
  )
}
