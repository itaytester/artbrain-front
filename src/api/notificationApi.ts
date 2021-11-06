import axios from "axios";
import Notification from "../common/types/notification";
import NotificationText, {NotificationTextRequest} from "../common/types/notificationText";
import NotificationType, {NotificationTypeRequest} from "../common/types/notificationType";

export default class NotificationApi {

    static url:string = "http://localhost:8080/Notification"

    static async getTypes(): Promise<NotificationType[]> {
        const response = await axios.get(`${this.url}/types`)
        return {...response.data, id: response.data._id};
    }

    static async getTexts(): Promise<NotificationText[]> {
        const response = await axios.get(`${this.url}/texts`)
        return {...response.data, id: response.data._id};
    }

    static async addType(data:NotificationTypeRequest): Promise<NotificationText> {
        const {name, color, img} = data;
        const formData = new FormData();
        formData.append("file",img[0]);
        formData.append("name",name);
        formData.append("color",color);
        const response = await axios.post(`${this.url}/type`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
        return {...response.data, id: response.data._id};
    }

    static async addTexts(data:NotificationTextRequest): Promise<NotificationText> {
        const {text, notificationType} = data;
        const response = await axios.post(`${this.url}/text`, {text, type: notificationType})
        return {...response.data, id: response.data._id};
    }

    static async notificationClicked(id:number): Promise<Notification> {
        const response = await axios.post(`${this.url}/notificationClicked/${id}`)
        return {...response.data, id: response.data._id};
    }
}

