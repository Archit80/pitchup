import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import React from 'react'
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
export const experimental_ppr= true;
export const dynamic = 'force-dynamic'

const page = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  console.log(id)

  const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});
 
  if(!post) return notFound();

  return ( 
    <>
      <h1 className='text-6xl'>{post.title}</h1>
    </>
  )
}

export default page