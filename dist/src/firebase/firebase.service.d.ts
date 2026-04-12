export declare class FirebaseService {
    private readonly app;
    constructor();
    get messaging(): import("node_modules/firebase-admin/lib/messaging/messaging").Messaging;
    sendToTopic(topic: string, title: string, body: string, data?: Record<string, string>): Promise<string>;
    subscribeToTopic(fcmToken: string, topic: string): Promise<import("node_modules/firebase-admin/lib/messaging/messaging-api").MessagingTopicManagementResponse>;
    unsubscribeFromTopic(fcmToken: string, topic: string): Promise<import("node_modules/firebase-admin/lib/messaging/messaging-api").MessagingTopicManagementResponse>;
}
