"use server"; 
import {auth} from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

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
          _type: "comment",
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