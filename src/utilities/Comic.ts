import { atobEx, btoaEx } from "@jsarmyknife/native--cryptographic";
import type { COMIC_CHAPTER_VIEW, COMIC_CONCISE_DATA, COMIC_DETAIL, COMIC_ID_COLLIDER, COMIC_SEARCHED_DATA } from "src/structure/comicCollector";
import type { MANGA_CHAPTER_VIEW, MANGA_CONCISE_DATA, MANGA_DETAIL, MANGA_SEARCHED_DATA } from "src/structure/manga";
import type { MANWHA_CHAPTER_VIEW, MANWHA_CONCISE_DATA, MANWHA_DETAIL, MANWHA_SEARCHED_DATA } from "src/structure/manwha";


export function makeComicId(data: COMIC_ID_COLLIDER){
  return btoaEx(JSON.stringify(data));
}

export function parseComicId(id: string|null|undefined): COMIC_ID_COLLIDER|null{
  if(!id) return null;

  try {
    const decoded = atobEx(id);
    const parsed = JSON.parse(decoded) as COMIC_ID_COLLIDER;
    if(!parsed.id || !parsed.type || (parsed.type !== 'MANGA' && parsed.type !== 'MANWHA')){
      return null;
    }
    return parsed;
  } catch (error){
    return null;
  }
} 


export function comicConciseDataCollider(manga:MANGA_CONCISE_DATA[]|null, manwha:MANWHA_CONCISE_DATA[]|null){
  const combine: COMIC_CONCISE_DATA[] = [];

  if( manga != null){
    for(const data of manga){
      combine.push({
        id: data.id,
        title: data.title,
        imageUrl: data.imgUrl,
      })
    };
  }
  
  if(manwha != null ){
    for(const data of manwha){
      combine.push({
        id: data.manwhaId,
        title: data.title,
        imageUrl: data.image,
      })
    }
  }

  return combine;
}


export function mangaToComicDetail(manga:MANGA_DETAIL): COMIC_DETAIL {
  const comicData:COMIC_DETAIL = {
    id: manga.id,
    title: manga.title,
    status: manga.status,
    imageUrl: manga.imageUrl,
    author: manga.author,
    genres: manga.genres,
    chapters: manga.chapters.map(chapter=>{
      return {
        chapterId: chapter.chapterId,
        releaseDate: chapter.uploaded,
      }
    }),
  }

  return comicData;
}


export function manwhaToComicDetail(manwha:MANWHA_DETAIL, manwhaId = ""): COMIC_DETAIL {
  const comicData:COMIC_DETAIL = {
    id: manwhaId,
    title: manwha.title,
    status: manwha.status,
    imageUrl: manwha.image,
    author: manwha.info.find(info => info["Author"])?.["Author"] || "Unknown",
    genres: manwha.info.find(info => info["Genre"])?.["Genre"] || [],
    chapters: manwha.chapters.map(chapter=>{
      return {
        chapterId: chapter.chapterId,
        releaseDate: chapter.releaseDate,
      }
    }),
  }
  return comicData;
}

export function mangaToComicChapterView(chapter:MANGA_CHAPTER_VIEW): COMIC_CHAPTER_VIEW {
  const comicChapterView:COMIC_CHAPTER_VIEW = {
    title: chapter.title,
    imageUrls: chapter.imageUrls,
  };
  return comicChapterView;
}

export function manwhaToComicChapterView(chapter:MANWHA_CHAPTER_VIEW): COMIC_CHAPTER_VIEW {
  const comicChapterView:COMIC_CHAPTER_VIEW = {
    title: chapter.title,
    imageUrls: chapter.images,
  };
  return comicChapterView;
}


export function mangaToComicSearchedData(manga:MANGA_SEARCHED_DATA): COMIC_SEARCHED_DATA {
  const searchedData:COMIC_SEARCHED_DATA = {
    id: manga.id,
    title: manga.title,
    imageUrl: manga.imgUrl,
  }
  return searchedData;
}


export function manwhaToComicSearchedData(manwha:MANWHA_SEARCHED_DATA): COMIC_SEARCHED_DATA {
  const searchedData:COMIC_SEARCHED_DATA = {
    id: manwha.manwhaId,
    title: manwha.title,
    imageUrl: manwha.image,

  }
  return searchedData;
}


export function comicSearchedCollider(manga:MANGA_SEARCHED_DATA[]|null, manwha:MANWHA_SEARCHED_DATA[]|null){
  const combine: COMIC_SEARCHED_DATA[] = [];

  if( manga != null){
    for(const data of manga){
      combine.push(mangaToComicSearchedData(data));
    }
  }
  if(manwha != null ){
    for(const data of manwha){
      combine.push(manwhaToComicSearchedData(data));
    }
  }
  return combine;
}
