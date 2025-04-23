import React from 'react'
import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { Startup, Author } from '@/sanity/types'
import { startup } from '@/sanity/schemaTypes/startup'
import { Skeleton } from './ui/skeleton'

export type StartupCardType = Omit<Startup, "author"> & { author?: Author};

const StartupCard = ({post}: {post: StartupCardType}) => {

    const { _createdAt, views, author, _id, title, description, image, category} = post


  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_date'>
                {formatDate(_createdAt)}
            </p>
            <div className='flex gap-1.5'>
                <EyeIcon />
                <p className='text-16-medium startup_card_views'>
                    {views}
                </p>
            </div>
       </div>  
 
       <div className=' flex-between mt-5 gap-5'>
        <div className='flex-1'>
            <Link href={`/user/${author?._id}`}>
                <p className='text-16-medium line-clamp-1'>
                    {author?.name}
                </p>
            </Link>
            <Link href={`/user/${author?._id}`}>
                <h3 className='text-26-semibold line-clamp-1'>
                    {title}
                </h3>
            </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
            <Image src={author?.image} alt={author?.name} width={48} height={48} className='rounded-full' />
        </Link>
       </div>
            <p className='startup-card_desc'>
                {description}
            </p>
        <Link href={`/startup/${_id}`} className='w-full h-full'>
            <Image
              src={post?.image}
              alt={post?.title}
              className="startup-card_img w-full"
            //   layout="responsive"
              width={1080} // Aspect ratio width
              height={720} // Aspect ratio height
            />
       </Link>
        
        <div className='flex-between mt-5 gap-5'>
            <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className='line-clamp-1 text-16-medium'>
                    {category}
                </p>
            </Link>
            <Button className='startup-card_btn !text-white-100 !hover:bg-primary'>
                <Link href={`/startup/${_id}`} >
                    <p className='text-16-medium !text-white-100 w-full h-full'>
                        Details
                    </p>
                </Link>
            </Button>
        </div>

    </li>
  )
}

export const StartupCardSkeleton = () => (
    <>
        {[0,1,2,3,4].map((index: number) => (
            <li key={cn('skeleton', index)}>
                <Skeleton className='startup-card_skeleton' />
            </li>
        ))}
    </>
)
export default StartupCard