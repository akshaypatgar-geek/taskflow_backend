import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { CategoriesRepository } from 'src/categories/repository/categories.repository';
import { TasksRepository } from '../repository/tasks.repository';
import { taskPriorityEnum, taskStatusEnum } from 'src/db/schema';

describe('TasksService', () => {
  let service: TasksService;
  let usersRepo: jest.Mocked<UsersRepository>;
  let categoriesRepo: jest.Mocked<CategoriesRepository>;
  let tasksRepo: jest.Mocked<TasksRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: UsersRepository,
          useValue: { findById: jest.fn() },
        },
        {
          provide: CategoriesRepository,
          useValue: { findById: jest.fn() },
        },
        {
          provide: TasksRepository,
          useValue: {
            createTask: jest.fn(),
            findById: jest.fn(),
            findByAuthorId: jest.fn(),
            updateTask: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    usersRepo = module.get(UsersRepository);
    categoriesRepo = module.get(CategoriesRepository);
    tasksRepo = module.get(TasksRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ================================
  // CREATE TASK
  // ================================
  describe('createTask', () => {
    const dto = {
      title: 'Test Task',
      categoryId: 'cat-1',
      priority: taskPriorityEnum.enumValues[0],
    };

    it('should create task successfully', async () => {
      usersRepo.findById.mockResolvedValue({ id: 'user-1' } as any);
      categoriesRepo.findById.mockResolvedValue({ id: 'cat-1' } as any);
      tasksRepo.createTask.mockResolvedValue({ id: 'task-1', ...dto } as any);

      const result = await service.createTask(dto, 'user-1');

      expect(usersRepo.findById).toHaveBeenCalledWith('user-1');
      expect(categoriesRepo.findById).toHaveBeenCalledWith('cat-1');
      expect(tasksRepo.createTask).toHaveBeenCalledWith(dto, 'user-1');
      expect(result.id).toBe('task-1');
    });

    it('should throw if user not found', async () => {
      usersRepo.findById.mockResolvedValue(undefined);

      await expect(service.createTask(dto, 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw if category not found', async () => {
      usersRepo.findById.mockResolvedValue({ id: 'user-1' } as any);
      categoriesRepo.findById.mockResolvedValue(null);

      await expect(service.createTask(dto, 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ================================
  // FIND BY ID
  // ================================
  describe('findById', () => {
    it('should return task if found', async () => {
      usersRepo.findById.mockResolvedValue({ id: 'user-1' } as any);
      tasksRepo.findById.mockResolvedValue([{ id: 'task-1', title: 'Task 1' }] as any);

      const result = await service.findById('task-1', 'user-1');

      expect(result.id).toBe('task-1');
    });

    it('should throw if task not found', async () => {
      usersRepo.findById.mockResolvedValue({ id: 'user-1' } as any);
      tasksRepo.findById.mockResolvedValue([]);

      await expect(service.findById('task-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw if user not found', async () => {
      usersRepo.findById.mockResolvedValue(undefined);

      await expect(service.findById('task-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ================================
  // FIND BY AUTHOR
  // ================================
  describe('findByAuthorId', () => {
    it('should return tasks for author', async () => {
      usersRepo.findById.mockResolvedValue({ id: 'user-1' } as any);
      tasksRepo.findByAuthorId.mockResolvedValue([{ id: 'task-1' }] as any);

      const result = await service.findByAuthorId('user-1');

      expect(tasksRepo.findByAuthorId).toHaveBeenCalled();
      expect(result.length).toBe(1);
    });

    it('should throw if user not found', async () => {
      usersRepo.findById.mockResolvedValue(undefined);

      await expect(service.findByAuthorId('user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ================================
  // UPDATE TASK
  // ================================
  describe('updateTask', () => {
    it('should update task successfully', async () => {
      usersRepo.findById.mockResolvedValue({ id: 'user-1' } as any);
      tasksRepo.findById.mockResolvedValue({ id: 'task-1' } as any);
      categoriesRepo.findById.mockResolvedValue({ id: 'cat-1' } as any);
      tasksRepo.updateTask.mockResolvedValue({ id: 'task-1', status: 'DONE' } as any);

      const result = await service.updateTask(
        'task-1',
        'user-1',
        'COMPLETED',
        undefined,
        'cat-1',
      );

      expect(tasksRepo.updateTask).toHaveBeenCalledWith(
        'task-1',
        'DONE',
        undefined,
        'cat-1',
      );
      expect(result.status).toBe('DONE');
    });

    it('should throw if user not found', async () => {
      usersRepo.findById.mockResolvedValue(undefined);

      await expect(service.updateTask('task-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw if task not found', async () => {
      usersRepo.findById.mockResolvedValue({ id: 'user-1' } as any);
      tasksRepo.findById.mockResolvedValue(null);

      await expect(service.updateTask('task-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw if category not found', async () => {
      usersRepo.findById.mockResolvedValue({ id: 'user-1' } as any);
      tasksRepo.findById.mockResolvedValue({ id: 'task-1' } as any);
      categoriesRepo.findById.mockResolvedValue(null);

      await expect(
        service.updateTask('task-1', 'user-1', undefined, undefined, 'cat-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});