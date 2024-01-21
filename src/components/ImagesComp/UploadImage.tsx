import { FC, useMemo, useState } from 'react';
import { FaRegHeart, FaRegTrashAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';

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
}

const UploadImage: FC<Omit<IUploadImageProps, 'key'>> = ({ arrayFavorites, file, fnDeleteImage }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHoveredLike, setIsHoveredLike] = useState<boolean>(false);

  const isLiked = arrayFavorites.find((item) => item.name === file.name);

  const dispatch: AppDispatch = useAppDispatch();

  const handleChangeFavorites = (): void => {
    dispatch(changeFavoritesUploads(file));
  };
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

  return (
    <div
      className={`${styles.main_left__images_item}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`${styles.main_left__images_item}`}
        onClick={() => console.log('Клик!')}
        type="button"
      >
        <img alt="" src={uploadImage} />

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

export default UploadImage;
