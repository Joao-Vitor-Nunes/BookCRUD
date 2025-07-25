import { prisma } from '../../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const book = await prisma.book.update({
    where: { id: params.id },
    data: body,
  })
  return NextResponse.json(book)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.book.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Livro deletado com sucesso!' })
}

