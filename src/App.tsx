import {useEffect, useState} from 'react';
import useSessionStorage from './components/useSessionStorage';
import { io, Socket } from "socket.io-client";
import ReactNotification from 'react-notifications-component'
import UserApi from './api/userApi';
import User from './common/types/user';
import Notification from "./common/types/notification";
import Notifications from './components/notifications';
import 'react-notifications-component/dist/theme.css'
import './App.css';

const App = () => {
  const [currNotification, setCurrNotification] = useState<Notification>();
  const [client] = useState<Socket>(io("http://localhost:8080/"))
  const [user, setUser] = useSessionStorage<User>('user');

  useEffect(()=> {
    const createUser = async () => {
      const response:User = await UserApi.newUser();
      setUser(response);
    }
    if(!user) createUser();
  },[]);

  useEffect(()=>{
    if(user) client.emit('start', user.id);

    client.on("notification", (notification: Notification) => {
        setCurrNotification(notification);
    });

  },[user]);

  return (
    <div className="App">
      <ReactNotification />
      <Notifications notification={currNotification} />
    </div>
  );
}

export default App;
