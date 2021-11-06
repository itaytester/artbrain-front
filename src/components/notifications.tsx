import useFetch from "./useFetch";
import { store } from "react-notifications-component";
import NotificationApi from "../api/notificationApi";
import NotificationType from "../common/types/notificationType";
import AddType from "./addType";
import AddText from "./addText";
import Notification from "../common/types/notification";
import { useEffect, useState } from "react";
import { Clear } from "@mui/icons-material";

interface IProps {
  notification: Notification | undefined;
}

interface NotificationProps extends Notification {
  clickedNotification: (id: string) => Promise<void>;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  text,
  _id,
  clickedNotification,
}) => {

  const close = async (id: string) => {
    await clickedNotification(id);
  }
  return (
    <div
      className="notification-width"
      onClick={(e) => close(_id)}
      style={{
        backgroundColor: text?.type?.color?.primary,
        border: `1px solid ${text?.type?.color?.dark}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="notification-icon"
          src={`${NotificationApi.url}/image/${text?.type?.img}`}
          style={{ width: "64px", height: "64px", marginLeft: ".5rem" }}
          alt=""
        />
        <div className="notification-text">
          <h4 style={{ color: text?.type?.color?.dark }}>{text.text}</h4>
        </div>
        <div className="notification-clear">
          <Clear style={{ color: text?.type?.color?.dark }} />
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

  const clickedNotification = async (id: string) => {
    setSkip(true);
    await NotificationApi.notificationClicked(id);
  };

  const renderNotification = (notification: Notification) => {
    store.addNotification({
      content: () => {
        return (
          <NotificationComponent
            {...notification}
            clickedNotification={clickedNotification}
          />
        );
      },
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: notification.user.notificationDuration,
        click: true,
      },
    });
  };

  useEffect(() => {
    if(notification && !skip) renderNotification(notification);
    if(skip) setSkip(false);
  }, [notification]);

  return (
    <div className="container">
      <AddType refetchTypes={refetch} />
      <AddText
        types={types}
        isTypesError={isTypesError}
        isTypesLoading={isTypesLoading}
      />
    </div>
  );
};

export default Notifications;
