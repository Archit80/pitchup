import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {auth, signIn, signOut} from "@/auth";
import { FaGithub } from 'react-icons/fa';

async function Navbar() {
    const session = await auth();
    const user = session?.user;

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
                                <span>Create</span>
                            </Link>

                            <form
                                action={async() => {
                                    "use server";
                                    await signOut({redirectTo: "/"});
                                }} className="text-lg font-semibold">

                                <button type="submit" className="text-lg font-semibold cursor-pointer hover:text-gray-500 p-2 rounded-xl">
                                    Logout
                                </button>
                            </form>

                            <Link href={`/profile/${user.id || ''}`} className="text-lg font-semibold hover:text-gray-500 p-2 rounded-xl">
                                <span>{user.name}</span>
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
