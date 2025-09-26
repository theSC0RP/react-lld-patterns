import "./App.css";
import { NotificationListContextProvider } from "./context/NotificationListContext";
import Notifications from "./views/notificaiton";
import NotificationList from "./NotificationList";
import Sidebar from "./components/Sidebar";
import type { SidebarItem } from "./types";
import { useState } from "react";
import MainView from "./views";
import Home from "./views/home";
import ModalView from "./views/modal";
import { ModalContextProvider } from "./context/ModalContext";
import InfiniteScrollView from "./views/infiniteScroll";

const sidebarItems: SidebarItem[] = [
  {
    index: 0,
    name: "Home",
    component: <Home />,
  },
  {
    index: 1,
    name: "Notifications",
    component: <Notifications />,
  },
  {
    index: 2,
    name: "Modal",
    component: <ModalView />,
  }, 
  {
    index: 3,
    name: "Infinite Scroll View",
    component: <InfiniteScrollView />
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <ModalContextProvider>
      <NotificationListContextProvider>
        <div className="bg-neutral-900 p-4 border-y-1 border-y-neutral-950 text-3xl">
          React LLD Practice
        </div>
        <div className="w-full h-[100%] m-0 flex bg-neutral-900">
          <Sidebar items={sidebarItems} setActiveIndex={setActiveIndex} />
          <>
            <MainView item={sidebarItems[activeIndex]}>
              {sidebarItems[activeIndex].component}
            </MainView>
            <NotificationList />
          </>
        </div>
      </NotificationListContextProvider>
    </ModalContextProvider>
  );
}

export default App;
