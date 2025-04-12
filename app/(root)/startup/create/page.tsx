import StartupForm from '@/components/StartupForm'
import React from 'react'
import { redirect } from 'next/navigation';
import { auth } from '@/auth'

const page = async () => {
  const session = await auth();  

    if (!session) redirect('/')
    

  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>Pitch Your Startup to the World</p>
        <h1 className='heading'> Submit Your Startup</h1>
    </section>

        <StartupForm />
    </>
  )
}

export default page