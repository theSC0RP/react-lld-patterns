import { createContext, useContext, useState, type Dispatch, type ReactElement, type SetStateAction } from "react";


type IModalContext = {
  modalVisible: boolean,
  showModal: () => void,
  hideModal: () => void
}
export const ModalContext = createContext<IModalContext|null>(null)


type IModalContextProviderProps = {
  children: ReactElement[] | ReactElement
}
export const ModalContextProvider = ({children}: IModalContextProviderProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  return <ModalContext.Provider value={{modalVisible, showModal, hideModal}}>
    <>{children}</>
  </ModalContext.Provider>
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalContextProvider");
  }
  return context;
};