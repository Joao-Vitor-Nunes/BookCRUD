'use client'
import { useState, useEffect } from 'react'

type Review = {
  id: string
  bookTitle: string
  rating: number
  comment?: string
  createdAt: string
}

export default function ReviewForm() {
  const [form, setForm] = useState({ bookTitle: '', rating: '', comment: '' })
  const [reviews, setReviews] = useState<Review[]>([])

  const loadReviews = async () => {
    const res = await fetch('/api/reviews')
    const data = await res.json()
    setReviews(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.bookTitle || !form.rating) return alert('Preencha título e nota')

    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookTitle: form.bookTitle,
        rating: Number(form.rating),
        comment: form.comment
      })
    })

    setForm({ bookTitle: '', rating: '', comment: '' })
    loadReviews()
  }

  useEffect(() => {
    loadReviews()
  }, [])

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-[#E50914]">📘 Avaliar um Livro</h2>
      <form onSubmit={handleSubmit} className="bg-[#222] p-4 rounded-xl space-y-3">
        <input
          placeholder="Título do livro"
          className="w-full p-2 rounded bg-[#1f1f1f] border border-[#444] text-white"
          value={form.bookTitle}
          onChange={(e) => setForm({ ...form, bookTitle: e.target.value })}
        />
        <input
          placeholder="Nota (1 a 5)"
          type="number"
          min="1"
          max="5"
          className="w-full p-2 rounded bg-[#1f1f1f] border border-[#444] text-white"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />
        <textarea
          placeholder="Comentário (opcional)"
          className="w-full p-2 rounded bg-[#1f1f1f] border border-[#444] text-white"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />
        <button className="bg-[#E50914] px-4 py-2 rounded text-white font-semibold hover:bg-red-700">
          Enviar Avaliação
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-[#1f1f1f] border border-[#333] p-4 rounded-xl text-white">
            <p className="font-bold text-lg">{r.bookTitle}</p>
            <p className="text-yellow-400">⭐ Nota: {r.rating}</p>
            {r.comment && <p className="text-gray-300 mt-1">{r.comment}</p>}
            <p className="text-xs text-gray-500 mt-2">
              {new Date(r.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
