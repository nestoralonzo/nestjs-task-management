import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});
const mockUser = {
  id: 'someId',
  username: 'nestor',
  password: 'SomePassword',
  tasks: [],
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

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

  describe('getTasks', () => {
    it('call TasksRepository.getTaks and returns the result', async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue('someValue');
      // call taskService.getTasks, which should then call the repository's getTasks
      const result = await tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
