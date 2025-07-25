'use client'
import { useEffect, useState } from 'react'


type Book = {
  id: string
  title: string
  author: string
  year: number
  genre: string

}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [form, setForm] = useState({ title: '', author: '', year: '', genre: '' })

  const loadBooks = async () => {
    // Busca os livros
    const res = await fetch('/api/books')
    const books = await res.json()
    
    // Para cada livro, busca o status de leitura
    const statusPromises = books.map(async (book: Book) => {
      const statusRes = await fetch(`/api/books/${book.id}/reading-status`)
      if (statusRes.ok) {
        const statusData = await statusRes.json()
        return { ...book, status: statusData.status }
      }
      return book
    })
    
    const booksWithStatus = await Promise.all(statusPromises)
    setBooks(booksWithStatus)
  }

  const deleteBook = async (id: string) => {
    await fetch(`/api/books/${id}`, { method: 'DELETE' })
    loadBooks()
  }

  const startEditing = (book: Book) => {
    setEditingBook(book)
    setForm({
      title: book.title,
      author: book.author,
      year: book.year.toString(),
      genre: book.genre
    })
  }

  const updateBook = async () => {
    if (!editingBook) return

    await fetch(`/api/books/${editingBook.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        author: form.author,
        year: Number(form.year),
        genre: form.genre
      })
    })

    setEditingBook(null)
    loadBooks()
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[#E50914]">Lista de Livros</h2>

      {editingBook && (
        <div className="bg-[#222] p-4 rounded-xl mb-6">
          <h3 className="text-white text-lg mb-3">✏️ Editar Livro</h3>
          <div className="grid gap-3">
            <input
              className="p-2 rounded bg-[#1f1f1f] border border-[#444] text-white"
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              className="p-2 rounded bg-[#1f1f1f] border border-[#444] text-white"
              placeholder="Autor"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <input
              className="p-2 rounded bg-[#1f1f1f] border border-[#444] text-white"
              placeholder="Ano"
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
            <input
              className="p-2 rounded bg-[#1f1f1f] border border-[#444] text-white"
              placeholder="Gênero"
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={updateBook}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                💾 Salvar
              </button>
              <button
                onClick={() => setEditingBook(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="space-y-5">
        {books.length === 0 ? (
          <p className="text-gray-400">Nenhum livro cadastrado.</p>
        ) : (
          books.map((book) => (
            <li
              key={book.id}
              className="bg-[#1f1f1f] border border-[#333] rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="text-lg font-semibold text-white">
                  {book.title} <span className="text-gray-400">— {book.author}</span>
                </p>
                <p className="text-sm text-gray-400">{book.year} • {book.genre}</p>
              </div>
              <div className="flex gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => startEditing(book)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                >
                  ✏️ Atualizar
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  🗑️ Excluir
                </button>

              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
