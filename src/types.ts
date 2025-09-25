import type { ReactElement } from "react";

export type INotificationPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type INotificationType = "danger" | "warning" | "success" | "info";

export type INotification = {
  id: string,
  message: string;
  position: INotificationPosition
  description?: string;
  duration?: number;
  type?: INotificationType | "";
}

export type SidebarItem = {
  name: string,
  icon?: string,
  index: number,
  component: ReactElement
}