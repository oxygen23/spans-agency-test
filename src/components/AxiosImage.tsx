import { FC, useState } from 'react';
import { FaRegHeart, FaRegTrashAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import { changeFavoritesAxios } from '../redux/slices/FavoritesSlice';
import { AppDispatch } from '../redux/store';

interface IAxiosImageProps {
  arrayFavorites: string[]
  file: string,
  key: number,
}

const AxiosImage: FC<Omit<IAxiosImageProps, 'key'>> = ({ arrayFavorites, file }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHoveredLike, setIsHoveredLike] = useState<boolean>(false);
  const isLiked = arrayFavorites.includes(file);
  const dispatch: AppDispatch = useDispatch();
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
      className="main-left_images-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="main-left_images-item"
        onClick={handleChangeFavorites}
        type="button"
      >
        <img alt="" src={file} />
      </button>
      <button
        className="main-left_images-item_button like"
        onClick={handleChangeFavorites}
        onMouseEnter={handleMouseEnterLike}
        onMouseLeave={handleMouseLeaveLike}
        type="button"
      >
        {isHoveredLike || isLiked ? <FaHeart /> : <FaRegHeart />}
      </button>
      {isHovered && <button className="main-left_images-item_button delete" type="button"><FaRegTrashAlt /></button>}

    </div>
  );
};

export default AxiosImage;
