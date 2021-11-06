interface NotificationType {
    _id: string,
    img: string,
    color: string,
    name: string
}

export type NotificationTypeRequest = {
    img: FileList;
    color: string;
    name: string;  
}

export default NotificationType;