import { createContext, type ReactElement, useContext, useState } from "react";
import { type INotification } from "../types";


type INotificationListContext = {
  notificationList: INotification[],
  addNotification: (notification: INotification) => void,
  removeNotification: (id: string) => void,
}
export const NotificationListContext = createContext<INotificationListContext | null>(null);


type INotificationListContextProviderProps = {
  children: ReactElement | ReactElement[],
}
export const NotificationListContextProvider = ({ children } : INotificationListContextProviderProps) => {
  const [notificationList, setNotificationList] = useState<INotification[]>([]);

  const addNotification = (notification: INotification) => {
    setNotificationList((prev) => [notification, ...prev]);

    const notificationTimeout = setTimeout(() => {
      removeNotification(notification.id);
    }, notification.duration)

    return () => clearTimeout(notificationTimeout);
  }

  const removeNotification = (id: string) => {
    setNotificationList((prev) => prev.filter(notification => notification.id != id));
  }

  return <NotificationListContext.Provider value={{notificationList, addNotification, removeNotification}}>
    {children}
  </NotificationListContext.Provider>
}

export const useNotificationList = () => {
  const context = useContext(NotificationListContext)

  if (!context) {
    throw new Error("useNotificationList should be used inside NotificationListContextProvider")
  }

  return context;
}