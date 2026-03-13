import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { TasksRepository } from '../repository/tasks.repository';
import { taskPriorityEnum, taskStatusEnum } from 'src/db/schema';
import { CategoriesRepository } from '../../categories/repository/categories.repository';
import { UsersRepository } from '../../users/repository/users.repository';

describe('TasksService', () => {
  let service: TasksService;
  let usersRepo: UsersRepository;
  let categoriesRepo: CategoriesRepository;
  let tasksRepo: TasksRepository;

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
    usersRepo = module.get<UsersRepository>(UsersRepository);
    categoriesRepo = module.get<CategoriesRepository>(CategoriesRepository);
    tasksRepo = module.get<TasksRepository>(TasksRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ================================
  // CREATE TASK
  // ================================
  describe('createTask', () => {
    const dto = {
      id: "task-1",
      title: 'Test Task',
      categoryId: 'cat-1',
      priority: taskPriorityEnum.enumValues[0],
    };

    it('should create task successfully', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue({ id: 'user-1' } as any);
      jest.spyOn(categoriesRepo, 'findById').mockResolvedValue({ id: 'cat-1' } as any);
      jest.spyOn(tasksRepo, 'createTask').mockResolvedValue({...dto } as any);

      const result = await service.createTask(dto, 'user-1');

      expect(usersRepo.findById).toHaveBeenCalledWith('user-1');
      expect(categoriesRepo.findById).toHaveBeenCalledWith('cat-1');
      expect(tasksRepo.createTask).toHaveBeenCalledWith(dto, 'user-1');
      expect(result.id).toBe('task-1');
    });

    it('should throw if user not found', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue(undefined);

      await expect(service.createTask(dto, 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw if category not found', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue({ id: 'user-1' } as any);
      jest.spyOn(categoriesRepo, 'findById').mockResolvedValue(null);

      await expect(service.createTask(dto, 'user-1')).rejects.toThrow(NotFoundException);
    });
  });

  // ================================
  // FIND BY ID
  // ================================
  describe('findById', () => {
    it('should return task if found', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue({ id: 'user-1' } as any);
      jest.spyOn(tasksRepo, 'findById').mockResolvedValue({ id: 'task-1', title: 'Task 1' } as any);

      const result = await service.findById('task-1', 'user-1');

      expect(result.id).toBe('task-1');
    });

    it('should throw if task not found', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue({ id: 'user-1' } as any);
      jest.spyOn(tasksRepo, 'findById').mockResolvedValue(null);

      await expect(service.findById('task-1', 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw if user not found', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue(undefined);

      await expect(service.findById('task-1', 'user-1')).rejects.toThrow(NotFoundException);
    });
  });

  // ================================
  // FIND BY AUTHOR
  // ================================
  describe('findByAuthorId', () => {
    it('should return tasks for author', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue({ id: 'user-1' } as any);
      jest.spyOn(tasksRepo, 'findByAuthorId').mockResolvedValue([{ id: 'task-1' }] as any);

      const result = await service.findByAuthorId('user-1');

      expect(tasksRepo.findByAuthorId).toHaveBeenCalledWith('user-1');
      expect(result.length).toBe(1);
    });

    it('should throw if user not found', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue(undefined);

      await expect(service.findByAuthorId('user-1')).rejects.toThrow(NotFoundException);
    });
  });

  // ================================
  // UPDATE TASK
  // ================================
  describe('updateTask', () => {
    it('should update task successfully', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue({ id: 'user-1' } as any);
      jest.spyOn(tasksRepo, 'findById').mockResolvedValue({ id: 'task-1' } as any);
      jest.spyOn(categoriesRepo, 'findById').mockResolvedValue({ id: 'cat-1' } as any);
      jest.spyOn(tasksRepo, 'updateTask').mockResolvedValue({ id: 'task-1', status: 'DONE' } as any);

      const result = await service.updateTask('task-1', 'user-1', 'COMPLETED', undefined, 'cat-1');

      expect(tasksRepo.updateTask).toHaveBeenCalledWith('task-1', 'DONE', undefined, 'cat-1');
      expect(result.status).toBe('DONE');
    });

    it('should throw if user not found', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue(undefined);

      await expect(service.updateTask('task-1', 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw if task not found', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue({ id: 'user-1' } as any);
      jest.spyOn(tasksRepo, 'findById').mockResolvedValue(null);

      await expect(service.updateTask('task-1', 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw if category not found', async () => {
      jest.spyOn(usersRepo, 'findById').mockResolvedValue({ id: 'user-1' } as any);
      jest.spyOn(tasksRepo, 'findById').mockResolvedValue({ id: 'task-1' } as any);
      jest.spyOn(categoriesRepo, 'findById').mockResolvedValue(null);

      await expect(service.updateTask('task-1', 'user-1', undefined, undefined, 'cat-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});