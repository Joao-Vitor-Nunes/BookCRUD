'use client'
import { useState } from 'react'

export default function BookForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ title: '', author: '', year: '', genre: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify({ ...form, year: Number(form.year) }),
    })
    onSuccess()
    setForm({ title: '', author: '', year: '', genre: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
      <input
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        required
        className="bg-[#262626] text-white p-3 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition"
      />
      <input
        name="author"
        placeholder="Autor"
        value={form.author}
        onChange={handleChange}
        required
        className="bg-[#262626] text-white p-3 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition"
      />
      <input
        name="year"
        type="number"
        placeholder="Ano"
        value={form.year}
        onChange={handleChange}
        required
        className="bg-[#262626] text-white p-3 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition"
      />
      <input
        name="genre"
        placeholder="Gênero"
        value={form.genre}
        onChange={handleChange}
        required
        className="bg-[#262626] text-white p-3 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition"
      />
      <button
        type="submit"
        className="bg-[#E50914] hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-all"
      >
        Adicionar Livro
      </button>
    </form>
  )
}
