import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        isCompleted: false,
      },
    });
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { page, limit, search } = paginationQuery;

    const searchFilter: Prisma.TaskWhereInput = search
      ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {};

    const currentPage = page || 1;
    const resourcePerPage = limit || 10;
    const firstResource = (currentPage - 1) * resourcePerPage;

    const [totalCount, data] = await Promise.all([
      this.prisma.task.count({ where: searchFilter }),
      this.prisma.task.findMany({
        where: searchFilter,
        skip: firstResource,
        take: resourcePerPage,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / resourcePerPage);

    return { data, currentPage, totalCount, totalPages };
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async clearAll() {
    return this.prisma.task.deleteMany();
  }

  async markAsCompleted(id: number) {
    return this.prisma.task.update({
      where: { id },
      data: { isCompleted: true },
    });
  }
}
