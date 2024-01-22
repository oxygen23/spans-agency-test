import { motion } from 'framer-motion';
import { FC, useMemo, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Heart from '../../images/icons/Heart';
import { changeFavoritesUploads } from '../../redux/slices/FavoritesSlice';
import { AppDispatch, useAppDispatch } from '../../redux/store';
import styles from './Image.module.sass';

type PickFile = Pick<File, 'name'>;
interface IUploadImageProps {
  arrayFavorites: File[]
  file: File,
  fnDeleteImage: (file: PickFile) => void
  key: number,
  openImage: (file: File) => void
}

const UploadImage: FC<Omit<IUploadImageProps, 'key'>> = ({
  arrayFavorites,
  file,
  fnDeleteImage,
  openImage,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHoveredLike, setIsHoveredLike] = useState<boolean>(false);

  const isLiked = arrayFavorites.find((item) => item.name === file.name);

  const dispatch: AppDispatch = useAppDispatch();

  const uploadImage = useMemo(() => URL.createObjectURL(file), [file]);

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const handleMouseEnterLike = (): void => {
    setIsHoveredLike(true);
  };

  const handleMouseLeaveLike = (): void => {
    setIsHoveredLike(false);
  };

  const handleChangeFavorites = (): void => {
    dispatch(changeFavoritesUploads(file));
  };

  return (
    <div
      className={`${styles.main_left__images_item}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

    >
      <Link to={`/${file.name}`}>
        <button
          className={`${styles.main_left__images_item}`}
          onClick={() => openImage(file)}
          type="button"
        >
          <img alt="" src={uploadImage} />

        </button>
      </Link>
      <button
        className={`${styles.main_left__images_item_button} ${styles.like}`}
        onClick={handleChangeFavorites}
        onMouseEnter={handleMouseEnterLike}
        onMouseLeave={handleMouseLeaveLike}
        type="button"
      >
        <Heart color={(isHoveredLike || isLiked) ? 'white' : ''} />
      </button>
      {isHovered
        && (
        <motion.button
          className={`${styles.main_left__images_item_button} ${styles.delete}`}
          onClick={() => fnDeleteImage(file)}
          type="button"
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1 }}
        >
          <FaRegTrashAlt />
        </motion.button>
        )}

    </div>
  );
};

export default UploadImage;
