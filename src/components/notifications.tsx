import useFetch from "./useFetch";
import { store } from "react-notifications-component";
import NotificationApi from "../api/notificationApi";
import NotificationType from "../common/types/notificationType";
import AddType from "./addType";
import AddText from "./addText";
import Notification from "../common/types/notification";
import { useEffect, useState } from "react";

interface IProps {
  notification: Notification | undefined;
}

const NotificationComponent: React.FC<Notification> = ({text, user}) => {
  //const [color, setColor] = useState<string>(props.text?.type?.color);
  console.log("render");
  return (
    <div
      className="notification-width"
      style={{backgroundColor: text?.type?.color}}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={`${NotificationApi.url}/image/${text?.type?.img}`}
          style={{ width: "64px", height: "64px", marginLeft: ".5rem" }}
          alt=""
        />
        <div>
          <h4>{text.text}</h4>
        </div>
      </div>
    </div>
  );
};

const Notifications: React.FC<IProps> = ({ notification }) => {
  const [skip, setSkip] = useState<boolean>(false);
  const [isTypesLoading, isTypesError, types, refetch] = useFetch<
    null,
    NotificationType
  >(`${NotificationApi.url}/types`, null);

  useEffect(() => {
    if (notification) renderNotification(notification);
  }, [notification]);

  const renderNotification = (notification: Notification) => {
    store.addNotification({
      content: () => {
        return <NotificationComponent {...notification} />;
      },
      container: "bottom-right", // where to position the notifications
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: notification.user.notificationDuration,
      },
    });
  };

  return (
    <div className="container">
      <AddType refetchTypes={refetch} />
      <AddText
        types={types}
        isTypesError={isTypesError}
        isTypesLoading={isTypesLoading}
      />

      {notification && <NotificationComponent {...notification}/>}
    </div>
  );
};

export default Notifications;
