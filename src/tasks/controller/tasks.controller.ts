import { Controller, Post, Body, Param, Get, UseGuards, ParseUUIDPipe, Query, Put, Delete, Patch } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../dto/create.task.dto';
import { GetTasksByAuthorDTO } from '../dto/get.tasks.by.author.dto';
import { CurrentUser } from 'src/decorators/current.user.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TaskMutationResponseDto } from '../dto/create.task.response.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { GetTasksByAuthorResponseDTO } from '../dto/get.tasks.by.author.response.dto';
import { SortByEnum, SortOrderEnum,taskStatusEnum } from 'src/db/schema';
import { updateTaskDTO } from '../dto/update.task.dto';
import { DeleteTaskResponseDTO } from '../dto/delete.task.response.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiBearerAuth()
  @ResponseDto(TaskMutationResponseDto)
  @ApiCreatedResponse({type: TaskMutationResponseDto})
  @ApiUnauthorizedResponse({
          description: "Unauthorized user"
      })
  @Post('create')
  async createTask(@Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: any
) {
    return this.tasksService.createTask(createTaskDto, user.id);
  }

  @ApiBearerAuth()
  @ResponseDto(GetTasksByAuthorResponseDTO)
  @ApiCreatedResponse({type: GetTasksByAuthorResponseDTO})
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'cursor', required: false, type: String })
  @ApiQuery({ name: 'priority', required: false, type: String })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'searchKey', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: taskStatusEnum.enumValues })
@ApiQuery({ name: 'startDate', required: false, type: String })
@ApiQuery({ name: 'endDate', required: false, type: String })
@ApiQuery({ name: 'sortBy', required: false, enum: SortByEnum })
@ApiQuery({ name: 'sortOrder', required: false, enum: SortOrderEnum })
  @ApiUnauthorizedResponse({
          description: "Unauthorized user"
      })
  @Get()
  async getTasksByAuthor(
    @CurrentUser() user: any ,
    @Query() query: GetTasksByAuthorDTO) {
      const {priority, categoryId, limit, cursor, searchKey,status,
    startDate,
    endDate,
    sortBy,
    sortOrder} = query; 
    return this.tasksService.findByAuthorId(user.id, priority, categoryId,cursor, limit, searchKey,status,
      startDate,
      endDate,
      sortBy,
      sortOrder, );
  }

  @Get(':id')
  async getTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any
  ) {
    return this.tasksService.findById(id, user.id);
  }

  @ApiBearerAuth()
  @ResponseDto(TaskMutationResponseDto)
  @ApiCreatedResponse({type: TaskMutationResponseDto})
  @ApiUnauthorizedResponse({
          description: "Unauthorized user"
      })
  @Patch()
  async updateTask(
    @Body() dto: updateTaskDTO,
    @CurrentUser() user:any
  ) {
    const {id, status, priority, categoryId, title}= dto;
    return await this.tasksService.updateTask(id, user.id, status, priority, categoryId, title);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
          description: "Unauthorized user"
      })
  @ResponseDto(DeleteTaskResponseDTO)
  @ApiOkResponse({type: DeleteTaskResponseDTO, description:"Task deleted successfully"})
  @Delete(':id')
  async deleteTask(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any
  ) {
    return this.tasksService.deleteTask(id, user.id);
  }
}

