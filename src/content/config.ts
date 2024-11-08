import { z, defineCollection } from "astro:content";

const episodeSchema = z.object({
    title: z.string(),
    audioUrl: z.string(),
    intro: z.string(),
    pubDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    explicit: z.boolean().optional(),
    episode: z.number().optional(),
    season: z.number().optional(),
    episodeType: z.string().optional(),
    duration: z.coerce.string().optional(), //duration in format hh:mm:ss
    size: z.number().optional(), // size in megabytes
    keywords: z.string().optional(),
    voices: z.string().optional(),
});

export type episodeSchema = z.infer<typeof episodeSchema>;

const episodeCollection = defineCollection({ schema: episodeSchema });

export const collections = {
    'episode': episodeCollection,
}