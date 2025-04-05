import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  `*[_type == "startup" && defined(slug.current) && 
    (!defined($search) || lower(title) match lower($search) || lower(category) match lower($search) || lower(author->name) match lower($search))] 
    | order(_createdAt desc) {
      _id, 
      title, 
      slug, 
      _createdAt, 
      image, 
      views,
      description, 
      category,
      author->{_id, name, image, bio}
    }`
);