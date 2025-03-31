import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

const StartupCard = ({post}: {post: StartupCardType}) => {

    const { createdAt, views, author:{_id, name}, id, title, description, image, category} = post


  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_date'>
                {formatDate(createdAt)}
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
            <Link href={`/user/${_id}`}>
                <p className='text-16-medium line-clamp-1'>
                    {name}
                </p>
            </Link>
            <Link href={`/startup/${id}`}>
                <h3 className='text-26-semibold line-clamp-1'>
                    {title}
                </h3>
            </Link>
        </div>
        <Link href={`/user/${_id}`}>
            <Image src={image} alt={name} width={48} height={48} className='rounded-full' />
        </Link>
       </div>
       <Link href={`/startup/${id}`}>
            <p className='startup-card_desc'>
                {description}
            </p>

            <img src={image} alt={name} className='startup-card_img w-full' />
       </Link>
        
        <div className='flex-between mt-5 gap-5'>
            <Link href={`/?query=${category.toLowerCase()}`}>
                <p className='line-clamp-1 text-16-medium'>
                    {category}
                </p>
            </Link>
            <Button className='startup-card_btn'>
                <Link href={`/startup/${id}`}>
                    <p className='text-16-medium'>
                        Details
                    </p>
                </Link>
            </Button>
        </div>

    </li>
  )
}

export default StartupCard