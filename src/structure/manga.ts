export interface MANGA_CONCISE_DATA {
  id: string,
  title: string,
  imgUrl: string,
  latestChapter: string,
  description: string,
}

export interface MANGA_DETAIL {
  id: string,
  title: string,
  imageUrl: string,
  author: string,
  status: 'Ongoing' | 'Completed' | 'Hiatus' | string, // can refine later if there's a fixed list
  lastUpdated: string, // could also be Date if you parse it
  views: string, // e.g., "268,879" — keep as string unless you parse to number
  genres: string[],
  rating: string, // e.g., "N/A" or "4.5"
  chapters: MANGA_CHAPTER_SUMMARY[],
}

export interface MANGA_CHAPTER_SUMMARY {
  chapterId: string,
  views: string,
  uploaded: string, // e.g., "07-24 07:53"
  timestamp: string, // e.g., "Jul-24-2025 07:53"
}

export interface MANGA_CHAPTER_VIEW {
  title: string,
  chapter: string,
  imageUrls: string[],
}



export interface MANGA_SEARCHED_DATA {
  id: string,
  title: string,
  imgUrl: string,
  latestChapters: {
    name: string,
    chapter: string,
  }[],
  authors: string,     // comma-separated authors
  updated: string,     // e.g., "Jul-11-2025 06:41"
  views: string,       // formatted with commas, e.g., "27,998,895"
}

export interface MANGA_SEARCH_LIST {
  keyword: string,
  count: number,
  manga: MANGA_SEARCHED_DATA[],
}