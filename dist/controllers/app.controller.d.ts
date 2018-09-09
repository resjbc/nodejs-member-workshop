import { AppService } from '../services/app.service';
export declare class AppController {
    private appService;
    constructor(appService: AppService);
    root(): {
        Message: string;
    };
}
