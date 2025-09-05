import { useContext, useState } from "react";
import { NotificationListContext } from "./context/NotificationListContext";
import Button from "./components/Button";
import Input from "./components/Input";
import { nanoid } from "nanoid";
import { type INotification, type INotificationPosition, type INotificationType } from "./types";
import Textarea from "./components/Textarea";

const NotificationCreator = () => {
  const initialState:INotification = {
    id: "",
    message: "",
    description: "",
    type: "info",
    duration: 3000,
    position: "top-right"
  }

  const [notification, setNotification] = useState<INotification>(initialState)

  const NotificationListCtx = useContext(NotificationListContext);

  const onShowNotificationButtonClick = () => {
    if (NotificationListCtx) {
      if (!notification.message) {
        NotificationListCtx.addNotification({id: nanoid(), message: "Please add a message", duration: 3000, position: "top-right", type: "danger"});
        return
      }

      NotificationListCtx.addNotification({...notification, id: nanoid()});
      setNotification(initialState);
    }
  }

  return (
    <div>
      <h2 className="text-4xl mb-8">Create Notification</h2>
      <Input
        placeholder="Notification Message"
        name="notificaiton_message"
        value={notification.message}
        onChange={(e) => {
          setNotification(prev => {return {...prev, "message": e.target.value}})
        }}
        className="block w-[500px] h-[40px] mb-4 rounded-md"
      />

      <Textarea
        placeholder="Notification Description"
        name="notificaiton_description"
        value={notification?.description || ""}
        onChange={(e) => {
          setNotification(prev => {return {...prev, "description": e.target.value}})
        }}
        className="block w-[500px] mb-4 rounded-md"
        rows={3}
      />

      <Input
        placeholder="Notification Duration"
        name="notificaiton_duration"
        value={notification.duration || 3000}
        type="number"
        onChange={(e) => {
          setNotification(prev => {return {...prev, "duration": Number(e.target.value)}})
        }}
        className="block w-[500px] h-[40px] mb-4 rounded-md"
      />

      <select
        name="notificaiton_position"
        value={notification.position || "top-right" as INotificationPosition}
        onChange={(e) => {
          setNotification(prev => {return {...prev, "position": e.target.value as INotificationPosition}})
        }}
        className="bg-white text-gray-800 border-1 p-2 block w-[500px] h-[40px] mb-4 rounded-md"
      >
        <option value={"top-right"}>Top Right</option>
        <option value={"top-left"}>Top Left</option>
        <option value={"bottom-right"}>Bottom Right</option>
        <option value={"bottom-left"}>Bottom Left</option>
      </select>

      <select
        name="notificaiton_type"
        value={notification.type}
        onChange={(e) => {
          setNotification(prev => {return {...prev, "type": e.target.value as INotificationType}})
        }}
        className="bg-white text-gray-800 border-1 p-2 block w-[500px] h-[40px] mb-4 rounded-md"
      >
        <option value={"info"}>Information</option>
        <option value={"success"}>Success</option>
        <option value={"danger"}>Danger</option>
        <option value={"warning"}>Warning</option>
      </select>

      <Button
        buttonText="Show Notification"
        className="h-[40px] mt-6 bg-blue-500 text-white"
        onClick={() => onShowNotificationButtonClick()}
      />
    </div>
  );
};

export default NotificationCreator;
