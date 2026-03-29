import { defineField, defineType } from "sanity";

export const videoItemType = defineType({
  name: "videoItem",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      description: "Video başlığı — örn: Çırağan Palace Wedding",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID",
      type: "string",
      description: "YouTube URL'sindeki video ID — örn: dQw4w9WgXcQ",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Darbuka Show", value: "darbuka" },
          { title: "Brass Sensetion", value: "brass" },
          { title: "Orient Sensetion", value: "orient" },
          { title: "Tümü", value: "all" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
    prepare({ title, subtitle }) {
      const cat: Record<string, string> = {
        darbuka: "Darbuka Show",
        brass: "Brass Sensetion",
        orient: "Orient Sensetion",
      };
      return { title, subtitle: cat[subtitle] || subtitle };
    },
  },
});
