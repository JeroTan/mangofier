import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import type { COMIC_CONCISE_DATA } from "src/structure/comicCollector";
import type { MANGA_CHAPTER_VIEW, MANGA_CONCISE_DATA, MANGA_DETAIL, MANGA_SEARCH_LIST } from "src/structure/manga";
import type { MANWHA_CHAPTER_VIEW, MANWHA_CONCISE_DATA, MANWHA_DETAIL, MANWHA_SEARCHED_DATA } from "src/structure/manwha";
import { api, api2, checkApiErrorAction, checkIfAllResponseAreNotOk } from "src/utilities/Api";
import { comicConciseDataCollider, comicSearchedCollider, mangaToComicChapterView, mangaToComicDetail, manwhaToComicChapterView, manwhaToComicDetail, parseComicId } from "src/utilities/Comic";
import { allNumbersAndNoDuplicate } from "src/utilities/Parser";


export const comic = {
  list: defineAction({
    input: z.number().optional().default(1),
    async handler(input, ctx){
      //Prepare Api
      const responses = await Promise.all([
        api(ctx.url, ctx.cookies).path(`/manga-list/${input}`).get().request(),
        api2(ctx.url, ctx.cookies).path(`/manwha/home/${input}?mature=0`).get().request(),
      ]);

      //Api Check Error
      const allAreError = checkIfAllResponseAreNotOk(responses);
      if(allAreError){
        for(const response of responses){
          await checkApiErrorAction(response);
        }
      }
      
      const results = [
        responses[0].ok ? await responses[0].json() as {
          pagination: number[],
          data: MANGA_CONCISE_DATA[],
        } : null,
        responses[1].ok ? await responses[1].json() as {
          pagination: number[],
          data: MANWHA_CONCISE_DATA[],
        } : null,
      ] as const;

      const rawConciseData = [
        results[0] ? results[0].data : null,
        results[1] ? results[1].data : null,
      ] as const;
      
      const comicData:{
        pagination: number[],
        data: COMIC_CONCISE_DATA[],
      } = {
        pagination: allNumbersAndNoDuplicate([ ...results[0]?.pagination || [], ...results[1]?.pagination || [] ]) ,
        data: comicConciseDataCollider( rawConciseData[0], rawConciseData[1] ),
      }
      
      return comicData;
    }
  }),
  detail: defineAction({
    input: z.string(),
    async handler(input, ctx){
      const comicParsedId = parseComicId(input);
      if(comicParsedId == null) throw new ActionError({message: "Comic ID is invalid", code: "NOT_FOUND"});

      switch (comicParsedId.type) {
        case  "MANGA":{
          const response = await api(ctx.url, ctx.cookies).path(`/manga/${comicParsedId.id}`).get().request();
          await checkApiErrorAction(response);
          const raw = await response.json() as MANGA_DETAIL;
          return mangaToComicDetail(raw);
        }break;
        case "MANWHA":{
          const response = await api2(ctx.url, ctx.cookies).path(`/manwha/${comicParsedId.id}`).get().request();
          await checkApiErrorAction(response);
          const raw = await response.json() as {
            data: MANWHA_DETAIL,
          };
          return manwhaToComicDetail(raw.data);
        }break;
      }
    }
  }),
  chapterView: defineAction({
    input: z.object({
      id: z.string(),
      chapter: z.number(),
    }),
    async handler(input, ctx){
      const comicParsedId = parseComicId(input.id);
      if(comicParsedId == null) throw new ActionError({message: "Comic ID is invalid", code: "NOT_FOUND"});

      switch (comicParsedId.type) {
        case "MANGA":{
          const response = await api(ctx.url, ctx.cookies).path(`/manga/${comicParsedId.id}/${input.chapter}`).get().request();
          await checkApiErrorAction(response);
          const raw = await response.json() as MANGA_CHAPTER_VIEW;
          return mangaToComicChapterView(raw);
        }break;
        case "MANWHA":{
          const response = await api2(ctx.url, ctx.cookies).path(`/manwha/${comicParsedId.id}/${input.chapter}`).get().request();
          await checkApiErrorAction(response);
          const raw = await response.json() as {
            data: MANWHA_CHAPTER_VIEW
          }
          return manwhaToComicChapterView(raw.data);
        }break;
      }
    }
  }),
  search: defineAction({
    input: z.string(),
    async handler(input, ctx){
      //Prepare Api
      const responses = await Promise.all([
        await api(ctx.url, ctx.cookies).path(`/search/${input}`).get().request(),
        await api2(ctx.url, ctx.cookies).path(`/search/${input}`).get().request()
      ]);

      //Api Check Error
      const allAreError = checkIfAllResponseAreNotOk(responses);
      if(allAreError){
        for(const response of responses){
          await checkApiErrorAction(response);
        }
      }

      const results = [
        responses[0].ok ? await responses[0].json() as MANGA_SEARCH_LIST : null,
        responses[1].ok ? await responses[1].json() as {
          data: MANWHA_SEARCHED_DATA[],
        } : null,
      ] as const;

      const rawConciseData = [
        results[0] ? results[0].manga : null,
        results[1] ? results[1].data : null,
      ] as const;

      return comicSearchedCollider(rawConciseData[0], rawConciseData[1]);
    }
  })
}