import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        uptime: string;
        environment: string;
        database: {
            status: string;
            message: string;
            type: string;
            database: string;
        };
        version: string;
    }>;
}
