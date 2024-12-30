import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';

const mockTasksRepository = () => ({});

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    // Initialize a NestJS module with taskService and TaskRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile(); // You need to compile your module

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });
});
