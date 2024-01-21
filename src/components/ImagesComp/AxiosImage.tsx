import { FC, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import Heart from '../../images/icons/Heart';
import { changeFavoritesAxios } from '../../redux/slices/FavoritesSlice';
import { useAppDispatch } from '../../redux/store';
import styles from './Image.module.sass';

interface IAxiosImageProps {
  arrayFavorites: string[]
  file: string,
  fnDeleteImage: (file : string) => void
  key: number,
}

const AxiosImage: FC<Omit<IAxiosImageProps, 'key'>> = ({ arrayFavorites, file, fnDeleteImage }) => {
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
      <button
        className={`${styles.main_left__images_item}`}
        onClick={handleChangeFavorites}
        type="button"
      >
        <img alt="" src={file} />
      </button>
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
        <button
          className={`${styles.main_left__images_item_button} ${styles.delete}`}
          onClick={() => fnDeleteImage(file)}
          type="button"
        >
          <FaRegTrashAlt />
        </button>
        )}

    </div>
  );
};

export default AxiosImage;
