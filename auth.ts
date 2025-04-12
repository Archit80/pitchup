import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import {client} from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
// import {signIn} from "next-auth/react"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({user:{name, email, image}, profile:{login, id, bio}}) {
      const exisitingUser = await client.withConfig({useCdn : false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                id});

      if(!exisitingUser){
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          image,
          email,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({useCdn : false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

        token.id = user?._id;
      }  

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, {
        id: token.id,
      });
      return session;
    },
  },
});