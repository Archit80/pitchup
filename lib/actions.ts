"use server"; 
import {auth} from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { randomUUID } from "crypto"; // Node.js 16.17+ or use another unique string generator

export const createPitch = async( 
    state:any,
    form:FormData, 
    pitch: string 
    ) =>{
    const session = await auth();    
    if(!session)
        return parseServerActionResponse({
            status: 'ERROR',
            error: 'Not Signed In'
        });
    const {title, category, description, link} = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch'),
    );

    const slug = slugify(title as string, { lower: true, strict: true });

    try{
        const startup = {
            title,
            description,
            category,
            slug:{
                _type: slug,
                current : slug,
            },
            image: link,
            author : {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch
        };

        const result = await writeClient.create({
            _type: 'startup',
            ...startup,
        })

        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS',
            // data: result,
        }); 

    } catch(error){
        console.log(error);
        return parseServerActionResponse({
            status: 'ERROR',
            error: JSON.stringify(error),
        });
    }

}

export const deleteStartup = async (postId: string) => {
  try{
    const result = await writeClient.delete(postId);
    console.log("Delete STARTUP successful:", result);
    
    return parseServerActionResponse({
      status: 'SUCCESS',
      error: '',
    });
  }catch(error){
    console.log("Error deleting startup:", error);
    
    return parseServerActionResponse({
      status: 'ERROR',
      error: JSON.stringify(error),
    });
  }

}
    
export const deleteComment = async (postId: string, commentedAt: string) => {
  console.log("deleteComment called with:", { postId, commentedAt });
  
  const session = await auth();
  console.log("Session:", session ? "Authenticated" : "Unauthenticated");
  
  const userId = session?.id;
  console.log("User ID:", userId);
  
  try {
    console.log("Attempting to delete comment with commentedAt:", commentedAt);
    
    const response = await writeClient
      .patch(postId)
      .unset([`comments[commentedAt == "${commentedAt}"]`])
      .commit();
    
    console.log("Delete operation successful:", response);
      
    return parseServerActionResponse({
      status: 'SUCCESS',
      error: '',
    }); 
  } catch(error) {
    console.log("Error deleting comment:", error);
    console.log("Error details:", JSON.stringify(error, null, 2));
    
    return parseServerActionResponse({
      status: 'ERROR',
      error: JSON.stringify(error),
    });
  } finally {
    console.log("Delete comment operation completed");
  }
}

export const addComment = async (postId: string, comment: string) => {
  const session = await auth();   
  const userId = session?.id;
  // console.log(userId, "USER ID");
  // console.log(session, "USER SESSION");
  try {
    await writeClient
      .patch(postId)
      .setIfMissing({ comments: [] })
      .append("comments", [
        {
          _key: randomUUID(), // <-- Add this line!
          text: comment,
          commentedAt: new Date().toISOString(),
          author: {
            _type: "reference",
            _ref: userId,
          },
        },
      ])
      .commit();

    return { success: true };
  } catch (error) {
    console.error("Failed to post comment:", error);
    return { success: false, error: error.message };
  }
};

// export const upVote = async (postId: string) => {
//   // const session = await auth();   
//   // const userId = session?.id;
//   try {
//     await writeClient
//       .patch(postId)
//       .setIfMissing({ upvotes: 0 }) 
//       .inc({ upvotes: 1 })
//       .commit();

//     return { success: true };
//   } catch (error) {
//     console.error("Failed to Vote:", error);
//     return { success: false, error: error.message };
//   }
// };

// export const downVote = async (postId: string) => {
//   // const session = await auth();   
//   // const userId = session?.id;
//   try {
//     await writeClient
//       .patch(postId)
//       .setIfMissing({ downvotes: 0 })
//       .inc({ downvotes: 1 })
//       .commit();

//     return { success: true };
//   } catch (error) {
//     console.error("Failed to Vote:", error);
//     return { success: false, error: error.message };
//   }
// };

export const toggleUpVote = async (postId: string) => {
  const session = await auth();
  const userId = session?.id;
  console.log(userId, "USER ID");
  console.log(session, "USER SESSION");
  if (!userId) return { success: false, error: "Not authenticated" };

  // Fetch current upvotes and downvotes
  const post = await writeClient.fetch(
    `*[_type == "startup" && _id == $postId][0]{upvotes[]->{_id}, downvotes[]->{_id}}`,
    { postId }
  );

  const hasUpvoted = post?.upvotes?.some((u: any) => u._id === userId);
  let patch = writeClient.patch(postId);

  patch = patch.unset([`upvotes[_ref=="${userId}"]`]); // Always remove first
  if (!hasUpvoted) {
    patch = patch
      .setIfMissing({ upvotes: [] })
      .setIfMissing({ downvotes: [] })
      .unset([`downvotes[_ref=="${userId}"]`])
      .append("upvotes", [{ _type: "reference", _ref: userId, _key: randomUUID() }]);
  }

  try {
    await patch.commit()
    .then(() => console.log("Vote toggled successfully"))
    .catch((err) => console.error("Patch failed:", err.message));
    return { success: true };

  } catch (error) {
    console.error("Failed to toggle upvote:", error);
    return { success: false, error: error.message };
  }
};

export const toggleDownVote = async (postId: string) => {
  const session = await auth();
  const userId = session?.id;
  if (!userId) return { success: false, error: "Not authenticated" };
  
  // Fetch current upvotes and downvotes
  const post = await writeClient.fetch(
    `*[_type == "startup" && _id == $postId][0]{upvotes[]->{_id}, downvotes[]->{_id}}`,
    { postId }
  );

  const hasDownvoted = post?.downvotes?.some((u: any) => u._id === userId);
  let patch = writeClient.patch(postId);

  if (hasDownvoted) {
    // Remove downvote
    patch = patch.unset([`downvotes[_ref=="${userId}"]`]);
  } else {
    // Remove upvote if present, then add downvote
    patch = patch
      .setIfMissing({ upvotes: [] })
      .setIfMissing({ downvotes: [] })
      .unset([`upvotes[_ref=="${userId}"]`])
      .append("downvotes", [{ _type: "reference", _ref: userId, _key: randomUUID() }]);
  }

  try {
    await patch.commit();
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle downvote:", error);
    return { success: false, error: error.message };
  }
};