import { motion } from 'framer-motion';
import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Copy, Cross } from '../../images/index';
import styles from './Modal.module.sass';

interface ModalProp {
  closedImage: (arg: string) => void
  modalImage: File | string
}

const Modal: FC<ModalProp> = ({ closedImage, modalImage }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const currentUrl = window.location.href;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closedImage('');
        navigate('/');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closedImage, navigate]);

  function truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
      return `${str.slice(0, maxLength - 3)}...`;
    }
    return str;
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Текст скопирован в буфер обмена');
      })
      .catch((error) => {
        console.error('Ошибка при копировании в буфер обмена:', error);
      });
  }
  return (
    <div className={`${styles.modal_wrapper}`}>
      <div className={`${styles.modal}`} ref={modalRef}>
        <motion.button className={`${styles.modal_closed}`} onClick={() => closedImage('')} type="button" whileHover={{ scale: 1.4 }}><img alt="" src={Cross} /></motion.button>

        <div className={`${styles.modal_image}`}>
          <img alt="" src={typeof modalImage === 'string' ? modalImage : URL.createObjectURL(modalImage)} />
        </div>

        <p className={`${styles.modal_text}`}>
          Share this with your
          social Community

        </p>

        <div className={`${styles.modal_link}`}>
          <span>{truncateString(currentUrl, 31)}</span>
          <motion.button onClick={() => handleCopy(currentUrl)} type="button" whileHover={{ scale: 1.2 }} whileTap={{ scale: 1 }}>
            <img alt="" src={Copy} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
