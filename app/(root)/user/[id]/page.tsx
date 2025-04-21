import { auth } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { Suspense } from 'react';
export const experimental_ppr = true;

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params; // Extract the id from params
  const session = await auth();

  // Fetch the user by id
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <>
    <section className='profile_container'>
        <div className='profile_card'>
            <div className='profile_title'>
                <h3 className='line-clamp-1 text-24-black uppercase text-center'>
                    {user.name}
                </h3>
            </div>
            <Image
                src={user.image}
                alt={user.name}
                width={220}
                height={220}
                className='profile_image'
            />
            <p className='text-30-extrabold mt-7 text-center'>
                @{user?.username}
            </p>
            <p className='mt-1 text-center text-14-normal'>
                {user?.bio}
            </p>
        </div>
        <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
            <p className='text-30-bold '>
                {session?.id ===id ? 'Your Startups' : `${user.name}'s Startups`}
            </p>
            <ul className='card_grid-sm'>
                {/* TODO: ADD USER STARTUPS */}
                <Suspense fallback={<StartupCardSkeleton />}>
                <UserStartups id={id} />
                </Suspense>
            </ul>
        </div>
    </section>
    </>
  );
};

export default page;