import NotificationText from './notificationText'
import User from './user';

interface Notification {
    text: NotificationText,
    clicked: boolean,
    repeatingNotification: boolean,
    user: User
}

export default Notification;