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
    defineField({
      name: "caption",
      title: "Açıklama / Proje Adı",
      type: "string",
      description: "Lightbox'ta fotoğrafın altında görünecek yazı. (Örn: Çırağan Palace Wedding)",
    }),
  ],
  preview: {
    select: { title: "caption", alt: "image.alt", media: "image" },
    prepare({ title, alt, media }) {
      return { title: title || alt || "Fotoğraf", media };
    },
  },
});
