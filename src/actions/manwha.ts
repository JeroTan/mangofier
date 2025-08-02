import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import type { MANWHA_CHAPTER_VIEW, MANWHA_CONCISE_DATA, MANWHA_DETAIL, MANWHA_SEARCHED_DATA } from "src/structure/manwha";
import { api2, checkApiErrorAction } from "src/utilities/Api";


export const manwha = {
  list: defineAction({
    input: z.number().optional().default(1),
    async handler(input, ctx){
      //Prepare Api
      const response = await api2(ctx.url, ctx.cookies).path(`/manwha/home/${input}?mature=0`).get().request();
      
      //Api Check Error
      await checkApiErrorAction(response);

      return await response.json() as {
        pagination: number[],
        data: MANWHA_CONCISE_DATA[],
      }
    }
  }),
  detail: defineAction({
    input: z.string(),
    async handler(input, ctx){
      //Prepare Api
      const response = await api2(ctx.url, ctx.cookies).path(`/manwha/${input}`).get().request();

      //Api Check Error
      await checkApiErrorAction(response);

      return await response.json() as {
        data: MANWHA_DETAIL,
      };
    }
  }),
  chapterView: defineAction({
    input: z.object({
      id: z.string(),
      chapter: z.number(),
    }),
    async handler(input, ctx){
      //Prepare Api
      const response = await api2(ctx.url, ctx.cookies).path(`/manwha/${input.id}/${input.chapter}`).get().request();

      //Api Check Error
      await checkApiErrorAction(response);

      return await response.json() as {
        data: MANWHA_CHAPTER_VIEW
      }
    }
  }),
  search: defineAction({
    input: z.string(),
    async handler(input, ctx){
      //Prepare Api
      const response = await api2(ctx.url, ctx.cookies).path(`/search/${input}`).get().request();

      //Api Check Error
      await checkApiErrorAction(response);

      return await response.json() as {
        data: MANWHA_SEARCHED_DATA[],
      };
    }
  })
}