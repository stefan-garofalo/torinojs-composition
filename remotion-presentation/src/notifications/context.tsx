import { createContext, useContext } from "react";
import type { NotificationViewModel } from "./types";

const NotificationContext = createContext<NotificationViewModel | null>(null);

export function NotificationProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: NotificationViewModel;
}) {
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const value = useContext(NotificationContext);
  if (!value) {
    throw new Error("Notification primitives must be used inside NotificationProvider.");
  }
  return value;
}
