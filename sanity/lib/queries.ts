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

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(
  `*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
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

export const STARTUP_BY_ID_QUERY = defineQuery(
`  *[_type == "startup" && _id == $id][0]{
    _id, 
    title, 
    slug, 
    _createdAt, 
    image, 
    views,
    description, 
    category,
    author->{_id, name, username, image, bio},
    pitch     
  }`
);

export const STARTUP_VIEWS_QUERY = defineQuery(
  `*[_type == "startup" && _id == $id][0]{
    views, _id
  }`
);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
  `*[_type == "author" && id == $id][0]{
    _id, 
    id,
    name, 
    username, 
    image, 
    bio, 
    email, 
  }`
);

export const AUTHOR_BY_ID_QUERY = defineQuery(
  `*[_type == "author" && _id == $id][0]{
    _id, 
    id,
    name, 
    username, 
    image, 
    bio, 
    email, 
  }`
);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);