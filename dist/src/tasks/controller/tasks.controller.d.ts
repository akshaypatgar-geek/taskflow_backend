import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../dto/create.task.dto';
import { GetTasksByAuthorDTO } from '../dto/get.tasks.by.author.dto';
import { updateTaskDTO } from '../dto/update.task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    createTask(createTaskDto: CreateTaskDto, user: any): Promise<any>;
    getTasksByAuthor(user: any, query: GetTasksByAuthorDTO): Promise<any>;
    getTaskById(id: string, user: any): Promise<any>;
    updateTask(dto: updateTaskDTO, user: any): Promise<any>;
    deleteTask(id: string, user: any): Promise<{
        id: any;
    }>;
}
