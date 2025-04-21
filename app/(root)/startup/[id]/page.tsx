/* eslint-disable @next/next/no-img-element */
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import markdownit from 'markdown-it';
import { parse } from 'path';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupCardType } from '@/components/StartupCard';
export const experimental_ppr= true;
export const dynamic = 'force-dynamic'


const md =  markdownit();


const page = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  console.log(id)

  const [post, {select:editorPosts}] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, {id}),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'editor-picks'})
  ]) 
  
  // const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});
  if(!post) return notFound();
  const parsedContent = md.render(post?.pitch || '');
  // // console.log(parsedContent)
  // const {select : editorPosts} = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'editor-picks'});
  return ( 
    <>
    <section className='pink_container !min-h-[230px] flex flex-col items-center justify-center'>
      <p className='tag'> {formatDate(post?._createdAt)} </p>
      <h1 className='heading'>{post.title}</h1>
      <p className='sub-heading !max-w-5xl'>{post.description} </p>
    </section>

    <section className='section_container'>
      <img src={post?.image} alt="startup image thumbnai" className='w-full h-auto rounded-xl' />
      
      <div className='space-y-5 mx-auto max-w-4xl mt-10'>
        <div className='flex-between gap-5'>
          <Link href={`/user/${post?.author?._id}`} className='flex items-center gap-3 mb-3'>
              <Image 
                src={post?.author?.image || "/fallback-image.jpg"} 
                alt={post?.author?.name || "Author image"} 
                width={64} 
                height={64} 
                className="rounded-full drop-shadow-lg" 
              />
              <div>
                <p className='text-20-medium'>{post?.author?.name}</p>
                <p className='text-16-medium !text-black-200'>{post?.author?.username}</p>
              </div>
          </Link>

          <p className='category-tag'> {post.category}</p>
        </div>

        <h3 className='text-30-bold'> Pitch Details </h3>
        
        {
        parsedContent ? (
          <article className='markdown prose max-w-4xl font-work-sans break-all' dangerouslySetInnerHTML={{__html: parsedContent}}></article>
        ) : (
          <p className='text-16-medium'> No pitch details available </p>
        )
        }  
          
        </div>

        <hr className='divider' />

        {editorPosts?.length > 0 && (
          <div className='max-w-4xl mx-auto'>
            <p className='text-30-semibold'>Editor Picks</p>
            <ul className='mt-7 card_grid-sm'>
              {editorPosts.map((post:StartupCardType, index: number)=>(
                <StartupCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback = {<Skeleton className='view_skeleton' />}>
          <View id={id} />
        </Suspense>
    </section>    

    </>
  )
}

export default page