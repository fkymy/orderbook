import { ForbiddenException, Injectable } from '@nestjs/common'
import { EditUserDto } from 'src/user/dto'

import { PrismaService } from '../prisma/prisma.service'

import { CreateBookmarkDto, EditBookmarkDto } from './dto'

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    })
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    })

    return bookmark
  }

  getBookmarkById(userId: number, id: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id,
        userId,
      },
    })
  }

  async editBookmarkById(userId: number, id: number, dto: EditBookmarkDto) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    })
    if (!bookmark || bookmark.id !== userId) {
      throw new ForbiddenException('Access to resources denied')
    }
    return this.prisma.bookmark.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    })
  }

  async deleteBookmarkById(userId: number, id: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    })
    if (!bookmark || bookmark.id !== userId) {
      throw new ForbiddenException('Access to resources denied')
    }
    await this.prisma.bookmark.delete({
      where: {
        id,
      },
    })
  }
}
