export declare class FileUploadService {
    getMulterOptions(folder: string): {
        Storage: import("multer").StorageEngine;
        limits: {
            fileSize: number;
        };
        fileFilter: (req: any, file: any, callback: any) => any;
    };
    static memoryMulterOptions(): {
        storage: import("multer").StorageEngine;
        limits: {
            fileSize: number;
        };
        fileFilter: (req: any, file: any, callback: any) => any;
    };
}
