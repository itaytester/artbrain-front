interface NotificationType {
    _id: string,
    img: string,
    color: {
        light: string,
        primary: string,
        dark: string
    },
    name: string
}

export type NotificationTypeRequest = {
    img: FileList;
    color: string;
    name: string;  
}

export default NotificationType;