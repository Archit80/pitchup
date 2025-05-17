import { defineType, defineField } from "sanity";

export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
     
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
    
        defineField({
            name: "comments",
            type: "array",
            of:[
            { 
              type: "object",
              fields: [
                {name: "author", type: "reference", to: {type: "author"}, 
                validation: (Rule) => Rule.required().error("Author is required"),
                },
                {name: "text", type : "string"},
                {name: "commentedAt", type: "datetime"},
              ]
            }
            ]
        }),
 
        defineField({
          name:"upvotes",
          type: "array",
          of: [{ type: "reference", to: [{ type: "author" }] }],
          description: "Users who upvoted",
        }),
        
        defineField({
          name:"downvotes",
          type: "array",
          of: [{ type: "reference", to: [{ type: "author" }] }],
          description: "Users who downvoted",
        })
    
    ],
    preview: {
      select: {
        title: 'name', 
      },
    },
  })