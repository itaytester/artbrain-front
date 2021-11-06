import axios from "axios";

export default class UserApi {

    static url:string = "http://localhost:8080/User"

    static async newUser() {
        const response = await axios.post(`${this.url}/newUser`)
        return {...response.data, id: response.data._id};
    }

}

