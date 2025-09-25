import { useModal } from "../../context/ModalContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const ModalView = () => {
  const { modalVisible, showModal, hideModal } = useModal();

  return (
    <div>
      <Button onClick={showModal} className="w-50">
        Show Modal
      </Button>
      {modalVisible && <Modal 
        className="w-[500px] h-[350px] drop-shadow-xl drop-neutral-gray-900 border-gray-950 shadow-lg" 
        title="Test Modal"
        footer={<div className="flex justify-end p-4">
          <Button onClick={hideModal} className="bg-neutral-900 px-6 cursor-pointer hover:bg-neutral-950 shadow-sm">
            Cancel
          </Button>
        </div>}
      >
        <div className="p-4 flex-grow">
          this is a modal
        </div>
      </Modal>}
    </div>
  );
};

export default ModalView;
