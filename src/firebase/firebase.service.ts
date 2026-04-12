import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { createFirebaseApp } from './firebase.config';

@Injectable()
export class FirebaseService {
  private readonly app: admin.app.App;

  constructor() {
    this.app = admin.apps.length
      ? admin.app()
      : createFirebaseApp();
  }

  get messaging() {
    return this.app.messaging();
  }

  async sendToTopic(topic: string, title: string, body: string, data?: Record<string, string>) {
    const message: admin.messaging.Message = {
      notification: {
        title,
        body,
      },
      topic,
      data: data || {},
    };

    try {
      const response = await this.messaging.send(message);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async subscribeToTopic(fcmToken: string, topic: string) {
    try {
      const response = await this.messaging.subscribeToTopic(fcmToken, topic);
      console.log('Successfully subscribed to topic:', topic);
      return response;
    } catch (error) {
      console.error('Error subscribing to topic:', error);
      throw error;
    }
  }

  async unsubscribeFromTopic(fcmToken: string, topic: string) {
    try {
      const response = await this.messaging.unsubscribeFromTopic(fcmToken, topic);
      console.log('Successfully unsubscribed from topic:', response);
      return response;
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
      throw error;
    }
  }
}