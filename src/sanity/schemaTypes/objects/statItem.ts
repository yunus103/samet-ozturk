import { defineField, defineType } from "sanity";

export const statItemType = defineType({
  name: "statItem",
  title: "İstatistik",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Değer",
      type: "string",
      description: "Sayısal değer — örn: 17+ veya 500+",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Etiket",
      type: "string",
      description: "Değerin altındaki metin — örn: Yıl Sahne",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
