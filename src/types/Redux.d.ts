export type PickFile = Pick<File, 'lastModified' | 'name' | 'size' | 'type' | 'webkitRelativePath'>;

export interface IFavorites {
  favoritesAxios: string[],
  favoritesUploads: File[] & PickFile[]
}
