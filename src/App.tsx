import './App.css'
import { NotificationListContextProvider } from './context/NotificationListContext'
import NotificationCreator from './NotificationCreator'
import NotificationList from './NotificationList'

function App() {
  return (
    <>
      <NotificationListContextProvider>
        <NotificationCreator />
        <NotificationList />
      </NotificationListContextProvider>
    </>
  )
}

export default App
