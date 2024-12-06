import { DataSource, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.findOneBy({
      id: id,
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }
}
