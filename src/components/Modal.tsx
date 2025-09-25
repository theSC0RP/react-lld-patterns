import { useEffect, type ReactElement } from "react";
import { useModal } from "../context/ModalContext";

type IModalViewProps = {
  children: ReactElement[] | ReactElement | string;
  title: string;
  className?: string;
  footer?: ReactElement
};

const Modal = ({ children, className, title, footer }: IModalViewProps) => {
  const {hideModal} = useModal();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hideModal();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div 
      className="absolute top-0 left-0 modal-container w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-xs"
      onClick={hideModal}
    >
      <div className={`${className ? className : ""} flex flex-col z-10 bg-neutral-800`} onClick={e => e.stopPropagation()}>
        <div className="flex p-4 justify-between border-b-1 border-b-neutral-950">
          <div className="text-xl tracking-wider">{title}</div>
          <div className="text-xl cursor-pointer hover:font-semibold" onClick={hideModal}>x</div>
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
        <div>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
