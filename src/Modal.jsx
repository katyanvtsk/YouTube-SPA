const Modal = ({ isModal, children }) => {
  if (!isModal) {
    return null;
  }
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Modal;
