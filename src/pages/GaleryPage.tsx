import axios, { AxiosResponse } from 'axios';
import {
  FC,
  useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';

import AxiosImage from '../components/AxiosImage';
import Header from '../components/Header';
import Select from '../components/Select';
import UploadImage from '../components/UploadImage';
import { selectFavorites } from '../redux/slices/FavoritesSlice';

type PickFile = Pick<File, 'name'>;
interface IResponseAxios {
  message: string[],
  success: string
}
const GaleryPage: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [axiosFiles, setAxiosFiles] = useState<string[]>([]);

  const { favoritesAxios, favoritesUploads } = useSelector(selectFavorites);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) => file instanceof File);
    setUploadedFiles((prevFiles) => [...validFiles, ...prevFiles]);
  };

  const handleDeleteAxiosImage = (file : string) => {
    setAxiosFiles(axiosFiles.filter((imageStr) => imageStr !== file));
  };

  const handleDeleteUploadImage = (file: PickFile) => {
    setUploadedFiles(uploadedFiles.filter((item) => file.name !== item.name));
  };

  useEffect(() => {
    axios.get('https://dog.ceo/api/breed/hound/images/random/20')
      .then((response: AxiosResponse<IResponseAxios>) => setAxiosFiles(response.data.message))
      .catch((error) => console.log(error));
    console.log('rerender');
  }, []);
  // the second render occurs due to StrictMode

  return (
    <>
      <Header />
      <div
        className="main container"
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="main-left">
          <div className="main-left_up-block">
            <div className="main-left_title">Gallery</div>
            <Select />
          </div>
          {uploadedFiles.length > 0 || axiosFiles.length > 0
            ? (
              <div className="main-left_images-wrapper">
                {
                  uploadedFiles.map((file, index) => (
                    <UploadImage arrayFavorites={favoritesUploads} file={file} fnDeleteImage={handleDeleteUploadImage} key={index} />
                  ))
                }
                {
                  axiosFiles.map((file, index) => (
                    <AxiosImage arrayFavorites={favoritesAxios} file={file} fnDeleteImage={handleDeleteAxiosImage} key={index} />
                  ))
                }
              </div>
            ) : <div className="main-left_empty">Gallery is empty</div>}
        </div>
        <div className="main-right" />
      </div>
    </>
  );
};

export default GaleryPage;
