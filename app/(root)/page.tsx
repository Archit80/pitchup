// import Image from "next/image";
import SearchForm from "@/components/SearchForm"; 
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "../../sanity/lib/queries";
// import { client } from "@/sanity/lib/client";
import { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

// const posts = await client.fetch(STARTUPS_QUERY);

export default async function Home({searchParams}: {searchParams:
   Promise<{query?: string}>}) {


  const query = (await searchParams).query;
  const params = { search: query ? `${query}*` : null };
    console.log("Search params:", params);

  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params, // Pass an empty string if no search term
  });
    // console.log("Fetched posts:", posts);
  return (
    <div className="bg-white h-screen w-full font-work-sans">

      <section className="pink_container">

      <h1 className=" heading ">Pitch Your Startup! <br /> Connect With Entrepreneurs</h1>

       <p className="sub-heading !max-w-3xl">Find and connect with like-minded entrepreneurs and investors to share ideas, get feedback, and build your startup.</p>

       <SearchForm query={query}/>

      </section>

      <section className="section_container">
        <h2 className=" text-30-semibold">
          {query ? `Search Results for "${query}"` : 'Explore Startups'}
        </h2>

      <ul className="startup_list mt-7 card_grid">
        {/* posts hai -> length > 0 hai -> map kardo  */}
        {/* posts nahi hai -> length 0 hai -> no results found */}

        {posts?.length > 0 ? (
          posts.map((post: StartupCardType) => {
            // console.log("Rendering post:", post);
            return <StartupCard key={post.slug?.current || post.title} post={post} />;
          })
        ) : (
          <p className="no-result">No results found</p>
        )}
        {/* posts nahi hai -> length 0 hai -> no results found  */}
      </ul>

      </section>

      <SanityLive />

    </div>
  );
}
