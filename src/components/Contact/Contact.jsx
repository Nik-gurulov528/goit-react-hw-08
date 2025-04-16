import css from './Contact.module.css';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contactsOps';
import { useRandomColor } from '../../js/useRandomColor';
import { useRef, useState } from 'react';
import { getExactContact } from '../../redux/contacts/contactsSlice';
import Modal from 'react-modal';
import { BsDisplay } from 'react-icons/bs';

export default function Contact({ name, phone, id }) {
  const dispatch = useDispatch();
  const randomRgb = useRef(useRandomColor());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '16px',
    },
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  Modal.setAppElement('#root');

  return (
    <>
      <ul className={css.mainInfo}>
        <li className={css.contactInfo}>
          <div
            className={css.colorfulBackground}
            style={{ backgroundColor: randomRgb.current }}
          >
            <FaUser color="white" />
          </div>
          <p>{name}</p>
        </li>
        <li className={css.contactInfo}>
          <div
            className={css.colorfulBackground}
            style={{ backgroundColor: randomRgb.current }}
          >
            <FaPhoneAlt color="white" />
          </div>
          <p>{phone}</p>
        </li>
      </ul>
      <div className={css.additionalBtns}>
        <button
          type="button"
          className={css.editBtn}
          onClick={() => {
            dispatch(getExactContact(id));
          }}
        >
          <MdOutlineModeEdit size={24} color="white" />
        </button>
        <button
          type="button"
          className={css.deleteBtn}
          onClick={() => {
            openModal();
          }}
        >
          <RiDeleteBinLine size={24} color="white" />
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className={css.modalContent}>
          <p className={css.modalQuestion}>
            Are you sure that you want to delete{' '}
            <span className={css.modalName}>{name || 'this contact'}</span> ?
          </p>
          <div className={css.modalBtns}>
            <button
              type="button"
              className={css.modalBtn}
              onClick={() => {
                closeModal();
              }}
            >
              No
            </button>
            <button
              type="button"
              className={`${css.modalBtn} ${css.modalBtnYes}`}
              onClick={() => {
                closeModal();
                dispatch(deleteContact(id));
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

// dispatch(deleteContact(id)
