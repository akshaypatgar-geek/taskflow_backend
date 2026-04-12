import { FirebaseService } from './firebase.service';
import { SubscribeDto } from './dto/subscribe.dto';
export declare class FirebaseController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    subscribe(user: any, dto: SubscribeDto): Promise<import("node_modules/firebase-admin/lib/messaging/messaging-api").MessagingTopicManagementResponse>;
    unsubscribe(user: any, dto: SubscribeDto): Promise<import("node_modules/firebase-admin/lib/messaging/messaging-api").MessagingTopicManagementResponse>;
}
