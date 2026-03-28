import { defineField, defineType } from "sanity";

export const galleryImageType = defineType({
  name: "galleryImage",
  title: "Galeri Fotoğrafı",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Fotoğraf",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Metni",
          type: "string",
          description: "Ekran okuyucular için açıklayıcı metin",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "image.alt", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Fotoğraf", media };
    },
  },
});
