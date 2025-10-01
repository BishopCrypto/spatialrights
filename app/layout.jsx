import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SpatialRights - AR Property Rights Marketplace',
  description: 'The world\'s first marketplace for AR advertising rights on buildings and properties',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SR</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">SpatialRights</span>
                </Link>
              </div>

              <div className="flex items-center space-x-8">
                <Link href="/properties" className="text-gray-700 hover:text-blue-600 font-medium">
                  Properties
                </Link>
                <Link href="/invest" className="text-gray-700 hover:text-blue-600 font-medium">
                  Invest
                </Link>
                <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                  Admin
                </Link>
                <Link
                  href="/list-property"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
                >
                  List Property
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen bg-gray-50">
          {children}
        </main>

        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SR</span>
                </div>
                <span className="text-gray-600">© 2024 SpatialRights. AR Property Rights Management Platform.</span>
              </div>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-500 hover:text-gray-700">Privacy</Link>
                <Link href="/terms" className="text-gray-500 hover:text-gray-700">Terms</Link>
                <Link href="/contact" className="text-gray-500 hover:text-gray-700">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}