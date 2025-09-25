import { useNotificationList } from "../context/NotificationListContext";
import type { INotification } from "../types";

type INotificationProps = {
  notification: INotification
}
export const Notification = ({notification}: INotificationProps) => {
  const {removeNotification} = useNotificationList();
  
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
          removeNotification(notification.id);
        }}
      >
        ╳
      </div>
    </div>
  </div>
}