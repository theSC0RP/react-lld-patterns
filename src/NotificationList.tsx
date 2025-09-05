// components/NotificationList.tsx
import { useContext } from "react";
import { NotificationListContext } from "./context/NotificationListContext";
import type { INotification } from "./types";

type INotificationProps = {
  notification: INotification
}
const Notification = ({notification}: INotificationProps) => {
  const NotificationListCtx = useContext(NotificationListContext);
  let notificationColor = "bg-amber-50"
  switch(notification?.type) {
    case "danger":
      notificationColor = "bg-red-500";
      break;
    case "warning":
      notificationColor = "bg-amber-500";
      break;
    case "success":
      notificationColor = "bg-emerald-600"
      break;
    case "info":
      notificationColor = "bg-blue-500"
      break;
  }

  return <div
      key={notification.id}
      className={`w-[300px] mt-4 p-2 rounded-sm ${notificationColor}`}
    >
    <div className="flex">
      <div className="w-[300px] text-left text-wrap">
        <div className={"text-white font-semibold"}>
          {notification.message}
        </div>
        <div className={"text-white"}>
          {notification?.description}
        </div>
      </div>
      <div
        className={"text-white cursor-pointer font-semibold hover:font-bold"}
        onClick={() => {
          if (NotificationListCtx)
            NotificationListCtx.removeNotification(notification.id);
        }}
      >
        x
      </div>
    </div>
  </div>
}

const NotificationList = () => {
  const NotificationListCtx = useContext(NotificationListContext);
  let notificationList = null;
  if (NotificationListCtx) {
    notificationList = NotificationListCtx.notificationList;
  }

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
