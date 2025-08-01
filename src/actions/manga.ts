import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import type { MANGA_CONCISE_DATA, MANGA_DETAIL, MANGA_SEARCH_LIST } from "src/structure/manga";
import { api, checkApiErrorAction } from "src/utilities/Api";


export const manga = {
  list: defineAction({
    input: z.number().optional().default(1),
    async handler(input, ctx){
      //Prepare Api
      const response = await api(ctx.url, ctx.cookies).path(`/manga-list/${input}`).get().request();
      
      //Api Check Error
      await checkApiErrorAction(response);

      return await response.json() as {
        pagination: number[],
        data: MANGA_CONCISE_DATA[],
      }
    }
  }),
  detail: defineAction({
    input: z.string(),
    async handler(input, ctx){
      //Prepare Api
      const response = await api(ctx.url, ctx.cookies).path(`/manga/${input}`).get().request();

      //Api Check Error
      await checkApiErrorAction(response);

      return await response.json() as MANGA_DETAIL;
    }
  }),
  chapterView: defineAction({
    input: z.object({
      mangaId: z.string(),
      chapter: z.number(),
    }),
    async handler(input, ctx){
      //Prepare Api
      const response = await api(ctx.url, ctx.cookies).path(`/manga/${input.mangaId}/${input.chapter}`).get().request();

      //Api Check Error
      await checkApiErrorAction(response);

      return await response.json();
    }
  }),
  search: defineAction({
    input: z.string(),
    async handler(input, ctx){
      //Prepare Api
      const response = await api(ctx.url, ctx.cookies).path(`/search/${input}`).get().request();

      //Api Check Error
      await checkApiErrorAction(response);

      return await response.json() as MANGA_SEARCH_LIST;
    }
  })
}