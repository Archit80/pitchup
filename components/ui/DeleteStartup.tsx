"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { deleteStartup } from '@/lib/actions'
import { Trash2 } from 'lucide-react'

const DeleteStartup = ({postId}: {postId:string}) => {

    const router = useRouter();

    const handleDeleteStartup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // const postId = e.currentTarget.closest('.group')?.id;
        alert('Are you sure you want to delete this startup?');
        // if (!postId) {
        try{
            const result = await deleteStartup(postId);
            if (result.status === 'SUCCESS') {
                router.refresh();
                console.log('Startup deleted successfully');
            } else {
                console.error('Error deleting startup:', result.error);
            }
        }  catch(error){
            console.error('Error deleting startup:', error);
        }

      };

  return (
    <div>
         <button 
                className='absolute -top-2 -right-2 z-50 p-2 rounded-full bg-white shadow-md 
                          hover:bg-red-50 transition-all duration-200 border-2 border-red-400 
                            hover:border-red-600 
                          flex items-center justify-center'
                aria-label="Delete startup"
                onClick={handleDeleteStartup}
              >
                <Trash2 className='text-red-500' size={20} />
              </button>
    </div>
  )
}

export default DeleteStartup