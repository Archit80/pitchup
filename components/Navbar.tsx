
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {auth, signIn, signOut} from "@/auth";
import { FaGithub } from 'react-icons/fa';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

async function Navbar() {
    const session = await auth();
    const user = session?.user;
    console.log("user id",session?.id);
    return (    
        <header className="flex px-5 py-3 shadow-md w-full justify-between items-center bg-gradient-to-r text-black bg-white font-work-sans">
            <nav className="flex items-center justify-between w-full">
                <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                    <Image src={"/Coming.png"} alt="App Logo" width={64} height={64} className="rounded-full shadow-lg" />
                    <span>PitchUp</span>
                </Link>

                <div className="flex items-center gap-4">
                    {session && user ? (
                        <>
                            <Link href="/startup/create" className="text-lg font-semibold hover:text-gray-500 p-2 rounded-xl">
                                <span className='max-sm:hidden'>Create</span>
                                <BadgePlus className='sm:hidden size-6' />
                            </Link>

                            <form
                                action={async() => {
                                    "use server";
                                    await signOut({redirectTo: "/"});
                                }} className="text-lg font-semibold">

                                <button type="submit" className="text-lg font-semibold cursor-pointer hover:text-gray-500 p-2 rounded-xl">
                                    <span className='max-sm:hidden'>Logout</span>
                                    <LogOut className='size-6 sm:hidden text-red-500' />
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`} className="text-lg font-semibold hover:text-gray-500 p-2 rounded-xl">
                                {/* <span>{user.name}</span> */}
                                <Avatar className='h-12 w-12' >
                                    <AvatarImage
                                        src = {session?.user?.image || ''}                            
                                        alt = {session?.user?.name || ''}
                                    />

                                        <AvatarFallback> 
                                            AV
                                        </AvatarFallback>

                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <form action={async() => {
                            "use server";
                            await signIn('github');
                        }}>
                            <button type="submit" className="flex cursor-pointer text-lg font-semibold items-center gap-2 hover:text-gray-500 p-2 rounded-xl">
                                Login with <FaGithub />
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
