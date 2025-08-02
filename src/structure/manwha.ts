export interface MANWHA_CONCISE_DATA {
  index: number,
  title: string,
  image: string,
  status: 'HOT' | 'NEW' | 'UPCOMING' | string, // can refine later if there's a fixed list
  manwhaId: string,
  latestEp: MANWHA_LATEST_EP[],
}

export interface MANWHA_LATEST_EP{
  title: string,
  date: string,
}

export interface MANWHA_LISTING {
  success: boolean,
  pagination: number[],
  data: MANWHA_CONCISE_DATA[],
}

export interface MANWHA_CHAPTER_SUMMARY {
  name: string,
  releaseDate: string,
  chapterId: string,
}

export interface MANWHA_INFO_DATA {
  "Alt Name": string,
  "Author": string,
  "Artist": string,
  "Genre": string[],
}

export interface MANWHA_DETAIL {
  title: string,
  status: 'Ongoing' | 'Completed' | 'Hiatus' | "HOT" | string, // can refine later if there's a fixed list
  image: string,
  info : MANWHA_INFO_DATA[],
  summary: string,
  chaptersCount: number,
  chapters: MANWHA_CHAPTER_SUMMARY[],
}

export interface MANWHA_CHAPTER_VIEW {
  title: string,
  images: string[],
}

export interface MANWHA_SEARCHED_DATA {
  index: number,
  title: string,
  image: string,
  manwhaId: string,
}