import axios, { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';
import {
  DragEvent,
  FC,
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import AxiosImage from '../components/ImagesComp/AxiosImage';
import UploadImage from '../components/ImagesComp/UploadImage';
import Modal from '../components/Modal/Modal';
import Select from '../components/Select/Select';
import { Banner, Camera } from '../images';
import { selectFavorites } from '../redux/slices/FavoritesSlice';
import styles from './GaleryPage.module.sass';

type PickFile = Pick<File, 'name'>;
interface IResponseAxios {
  message: string[],
  success: string
}
const GaleryPage: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [axiosFiles, setAxiosFiles] = useState<string[]>([]);
  const [modalImage, setModalImage] = useState<File | string>('');

  const fileRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileRef.current) {
      fileRef.current.click(); // вызов метода click() для input[type="file"]
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files && event.target.files[0];

    if (fileInput) {
      setUploadedFiles([...uploadedFiles, fileInput]);
    }
  };

  const memoizedAxiosFiles = useMemo(() => axiosFiles, [axiosFiles]);
  const navigate = useNavigate();
  const { favoritesAxios, favoritesUploads } = useSelector(selectFavorites);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) => file instanceof File);
    setUploadedFiles((prevFiles) => [...validFiles, ...prevFiles]);
  };

  const handleDeleteAxiosImage = (file : string): void => {
    setAxiosFiles(axiosFiles.filter((imageStr) => imageStr !== file));
  };

  const handleDeleteUploadImage = (file: PickFile): void => {
    setUploadedFiles(uploadedFiles.filter((item) => file.name !== item.name));
  };

  const openImage = (file: File | string) => {
    setModalImage(file);
  };

  const closedImage = () => {
    setModalImage('');
    navigate('/');
  };

  useEffect(() => {
    axios.get('https://dog.ceo/api/breed/hound/images/random/20')
      .then((response: AxiosResponse<IResponseAxios>) => setAxiosFiles(response.data.message))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Header fileRef={fileRef} handleButtonClick={handleButtonClick} handleFileChange={handleFileChange} />
      <div
        className={`${styles.main} container`}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={`${styles.main_left}`}>
          <div className={`${styles.main_left__up_block}`}>
            <div className={`${styles.main_left__title}`}>Gallery</div>
            <Select />
          </div>
          {uploadedFiles.length > 0 || axiosFiles.length > 0
            ? (
              <div className={`${styles.main_left__images_wrapper}`}>
                {
                  uploadedFiles.map((file, index) => (
                    <UploadImage
                      arrayFavorites={favoritesUploads}
                      file={file}
                      fnDeleteImage={handleDeleteUploadImage}
                      key={index}
                      openImage={openImage}
                    />
                  ))
                }
                {
                  memoizedAxiosFiles.map((file, index) => (
                    <AxiosImage
                      arrayFavorites={favoritesAxios}
                      file={file}
                      fnDeleteImage={handleDeleteAxiosImage}
                      key={index}
                      openImage={openImage}
                    />
                  ))
                }
              </div>
            ) : <div className={`${styles.main_left__empty}`}>Gallery is empty</div>}
          <div className={`${styles.main_left__load_wrapper}`}>
            <motion.button
              className={`${styles.main_left__load}`}
              type="button"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 1 }}
            >
              Load More
            </motion.button>
          </div>
        </div>
        <div className={`${styles.main_right}`}>
          <button
            className={`${styles.main_right__button}`}
            onClick={handleButtonClick}
            type="button"
          >
            <div className={`${styles.main_right__button_wrapper}`}>
              <div
                className={`${styles.main_right__button__img_wrapper}`}
              >
                <img alt="" src={Camera} />

              </div>
              Make magic
              <input
                onChange={handleFileChange}
                ref={fileRef}
                style={{ display: 'none' }}
                type="file"
              />
            </div>
          </button>
          <img alt="" className={`${styles.main_right__banner}`} src={Banner} />
        </div>
      </div>
      {modalImage !== '' && (
      <Modal
        closedImage={closedImage}
        modalImage={modalImage}
      />
      )}
    </>
  );
};

export default GaleryPage;
