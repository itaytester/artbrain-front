import NotificationType from './notificationType';

interface NotificationText {
    _id: string,
    type: NotificationType,
    text: string
}

export type NotificationTextRequest = {
    notificationType: string;
    text: string;  
}

export default NotificationText;