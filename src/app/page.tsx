'use client'

import BookForm from './components/bookform'
import BookList from './components/booklist'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [refresh, setRefresh] = useState(false)
  const router = useRouter()

  return (
    <div className="bg-[#141414] text-white min-h-screen flex flex-col">

      <header className="bg-[#1f1f1f] border-b border-[#333] py-4 shadow-md">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-[#E50914]">BookShelf App</h1>
          <p className="text-sm text-gray-400">Organize seus livros.</p>
          <button
          onClick={() => router.push('/review')}
          className="bg-[#E50914] text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Avaliar Livro
        </button>
          
        </div>
      </header>

      <main className="flex-1 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-[#1f1f1f] p-8 rounded-2xl shadow-lg border border-[#333]">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-[#E50914] tracking-wide drop-shadow">
            Livros Favoritos
          </h2>

          <BookForm onSuccess={() => setRefresh(!refresh)} />

          <hr className="my-10 border-[#333]" />

          <BookList key={refresh.toString()} />
        </div>
      </main>

  
      <footer className="bg-[#1f1f1f] border-t border-[#333] py-4 text-center text-gray-400 text-sm">
        Projeto Fullstack
      </footer>
    </div>
  )
}
