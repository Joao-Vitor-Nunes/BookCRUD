import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(reviews)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { bookTitle, rating, comment } = body

  if (!bookTitle || !rating) {
    return NextResponse.json({ error: 'Título e nota são obrigatórios' }, { status: 400 })
  }

  const review = await prisma.review.create({
    data: {
      bookTitle,
      rating: Number(rating),
      comment,
    },
  })

  return NextResponse.json(review)
}
