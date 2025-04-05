import { defineType, defineField } from "sanity";

export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    // icon: UserIcon,
    fields: [
        
        defineField({
            name: "title",
            type: "string",
          }),

        defineField({   
            name: "slug",
            type: "slug",
            options: {
              source: "title",
            }
          }),
    
        defineField({
            name: "author",
            type: "reference",
            to: { type: "author" },
          }),
    
        defineField({
            name: "views",
            type: "number",
          }),
    
        defineField({
            name: "description",
            type: "text",
          }),

        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.min(1).max(20).required().error("Category must be between 1 and 20 characters")
          }),

        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required().error("Image URL is required"),
          }),
        defineField({
            name: "pitch",
            type: "markdown",
        }),
    
    ],
    preview: {
      select: {
        title: 'name', 
      },
    },
  })