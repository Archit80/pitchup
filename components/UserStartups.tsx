import { client } from '@/sanity/lib/client'
import DeleteStartup from './ui/DeleteStartup'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import { auth } from '@/auth'

import StartupCard, { StartupCardType } from './StartupCard'
export const revalidate = 0;

const UserStartups = async ({id}: {id: string}) => {
    const session = await auth();
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {
        id,
        timestamp: new Date().getTime(),
    });

    // Only allow delete if the logged-in user is viewing their own profile
    const canDelete = session?.id === id;

    return (
      <>
        {
          startups.length > 0 ? startups.map((startup: StartupCardType) => (
            <div key={startup._id} className='bg-clip-border relative group'>
              {canDelete && (
                <DeleteStartup postId={startup._id} />
              )}
              <StartupCard post={startup} />
            </div>
          ))
          :
          (
            <p className='no-result'> No Posts Yet</p>
          )
        }
      </>
    )
}

export default UserStartups