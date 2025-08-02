export interface COMIC_CONCISE_DATA {
  id: string,
  title: string,
  imageUrl: string,
}

export interface COMIC_DETAIL {
  id: string,
  title: string,
  status: 'Ongoing' | 'Completed' | 'Hiatus' | string, // can refine later if there's a fixed list
  imageUrl: string,
  author: string,
  genres: string[],
  chapters: COMIC_CHAPTER_SUMMARY[],
}

export interface COMIC_CHAPTER_SUMMARY {
  chapterId: string,
  releaseDate: string, // e.g., "Jul-24-2025"
}

export interface COMIC_CHAPTER_VIEW {
  title: string,
  imageUrls: string[],
}

export interface COMIC_SEARCHED_DATA {
  id: string,
  title: string,
  imageUrl: string,
}

export interface COMIC_ID_COLLIDER{
  id: string,
  type: 'MANGA' | 'MANWHA',
}