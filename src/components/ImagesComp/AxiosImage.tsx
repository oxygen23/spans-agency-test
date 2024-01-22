import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Heart from '../../images/icons/Heart';
import { changeFavoritesAxios } from '../../redux/slices/FavoritesSlice';
import { useAppDispatch } from '../../redux/store';
import styles from './Image.module.sass';

interface IAxiosImageProps {
  arrayFavorites: string[]
  file: string,
  fnDeleteImage: (file: string) => void
  key: number,
  openImage: (file: string) => void
}

const AxiosImage: FC<Omit<IAxiosImageProps, 'key'>> = ({
  arrayFavorites,
  file,
  fnDeleteImage,
  openImage,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHoveredLike, setIsHoveredLike] = useState<boolean>(false);

  const isLiked = arrayFavorites.includes(file);
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterLike = () => {
    setIsHoveredLike(true);
  };
  const handleMouseLeaveLike = () => {
    setIsHoveredLike(false);
  };

  const handleChangeFavorites = () => {
    dispatch(changeFavoritesAxios(file));
  };
  return (
    <div
      className={`${styles.main_left__images_item}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/${file.replace('https://', '')}`}>
        <button
          className={`${styles.main_left__images_item}`}
          onClick={() => openImage(file)}
          type="button"
        >
          <img alt="" src={file} />
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

export default AxiosImage;
