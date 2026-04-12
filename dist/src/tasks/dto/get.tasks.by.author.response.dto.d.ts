import { TaskDTO } from "./task.dto";
export declare class GetTasksByAuthorResponseDTO {
    tasks: TaskDTO[];
    nextCursor?: string;
    hasNextPage: boolean;
}
