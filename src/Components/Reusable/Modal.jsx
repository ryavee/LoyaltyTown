import { Modal as EnterpriseModal } from "../enterprise";

const Modal = ({ isOpen, onClose, title, children }) => (
  <EnterpriseModal open={isOpen} onClose={onClose} title={title || "Dialog"}>
    {children}
  </EnterpriseModal>
);

export default Modal;
