// src/app/api/books/[id]/route.ts
import { prisma } from '../../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Atualizar livro
export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop() // extrai o ID da URL
  const data = await request.json()

  try {
    const book = await prisma.book.update({
      where: { id },
      data,
    })

    return NextResponse.json(book)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar livro.' }, { status: 500 })
  }
}

// Deletar livro
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop() // extrai o ID da URL

  try {
    await prisma.book.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Livro deletado com sucesso!' })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar livro.' }, { status: 500 })
  }
}
