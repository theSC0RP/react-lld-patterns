// components/NotificationList.tsx
import { useNotificationList } from "./context/NotificationListContext";
import { Notification } from './components/Notification'

const NotificationList = () => {
  const { notificationList } = useNotificationList()

  const positions = ["top-left", "top-right", "bottom-left", "bottom-right"]
  return positions?.map((position) => {
    let notificationPositionClasses = position.includes("top") ? "top-[20px]": "bottom-[20px]";
    notificationPositionClasses += position.includes("left") ? " left-[20px]": " right-[20px]";

    return (
      <div key={position} className={`fixed block ${notificationPositionClasses}`}>
        <>
          {
            notificationList?.filter(notification => notification.position === position).map(notification => {
              return <Notification notification={notification} />
            })
          }
        </>
      </div>
    );
  });
};

export default NotificationList;
