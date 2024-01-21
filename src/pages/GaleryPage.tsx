import axios, { AxiosResponse } from 'axios';
import {
  DragEvent,
  FC,
  useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header/Header';
import AxiosImage from '../components/ImagesComp/AxiosImage';
import UploadImage from '../components/ImagesComp/UploadImage';
import Select from '../components/Select/Select';
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
  const memoizedAxiosFiles = useMemo(() => axiosFiles, [axiosFiles]);

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

  useEffect(() => {
    axios.get('https://dog.ceo/api/breed/hound/images/random/20')
      .then((response: AxiosResponse<IResponseAxios>) => setAxiosFiles(response.data.message))
      .catch((error) => console.log(error));
  }, []);
  // the second render occurs due to StrictMode

  return (
    <>
      <Header />
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
                    <UploadImage arrayFavorites={favoritesUploads} file={file} fnDeleteImage={handleDeleteUploadImage} key={index} />
                  ))
                }
                {
                  memoizedAxiosFiles.map((file, index) => (
                    <AxiosImage arrayFavorites={favoritesAxios} file={file} fnDeleteImage={handleDeleteAxiosImage} key={index} />
                  ))
                }
              </div>
            ) : <div className={`${styles.main_left__empty}`}>Gallery is empty</div>}
        </div>
        <div className={`${styles.main_right}`} />
      </div>
    </>
  );
};

export default GaleryPage;
