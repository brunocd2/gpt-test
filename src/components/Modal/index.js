import ReactModal from "react-modal"
import { ModalContent } from "./styles";

export default function Modal({ children, opened, setOpened, customModalContent }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      background: 'none',
      padding: 0,
    },
    overlay: {
      backgroundColor: 'rgba(51, 51, 51, 0.5)',
      zIndex: 5
    }
  };

  return (
    <ReactModal 
      isOpen={opened} onRequestClose={() => setOpened(false)}
      style={customStyles}  
      contentLabel="Modal"
    >
      {customModalContent
        ? children
        : <ModalContent>{children}</ModalContent>
      }
    </ReactModal>
  )
}