// import Image from "next/image";
import SearchForm from "@/components/SearchForm"; 
import StartupCard from "@/components/StartupCard";
const posts = [
  {
    createdAt: new Date().toISOString(),
    views: 55,
    author: { _id: 1, name: "John Doe" },
    id: 1,
    description: "This is a description about innovative robotics technology",
    image: "https://chargeraccount.org/wp-content/uploads/2023/06/K7Kk3DSxN0r4AVhONa9ruggbas3DWRIrbnHw1dJc-1-900x600.jpg", // Placeholder image path
    category: "Robots",
    title: "We Robots"
  },
  {
    createdAt: "2 days ago",
    views: 42,
    author: { _id: 2, name: "Jane Smith" },
    id: 2,
    description: "Revolutionizing AI-powered solutions for everyday challenges",
    image: "https://media.tenor.com/_zWYqfZdneIAAAAe/shocked-face-shocked-meme.png", // Placeholder image path
    category: "Artificial Intelligence",
    title: "AI Innovations"
  },
  {
    createdAt: "Last week",
    views: 78,
    author: { _id: 3, name: "Alice Johnson" },
    id: 3,
    description: "Sustainable energy solutions for a greener future",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj3ZPyxEDIbxnzfeDURkmJLC9FyQut33B6qA&s", // Placeholder image path
    category: "Green Tech",
    title: "EcoTech Solutions"
  }
];

export default async function Home({searchParams}: {searchParams:
   Promise<{query?: string}>}) {

  const query = (await searchParams).query;

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

        { posts?.length > 0 ? (posts.map((post : StartupCardType) => ( 
          <StartupCard key={post?.id} post={post} />
        ))): (
          <p className="no-result">No results found</p>
        ) }
        {/* posts nahi hai -> length 0 hai -> no results found  */}
      </ul>

      </section>

    </div>
  );
}
