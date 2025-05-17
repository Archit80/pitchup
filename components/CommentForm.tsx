"use client";

// import {auth, signIn, signOut} from "@/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

//IT IS A SERVER ONLY FILE CALLED INSIDE ACTIONS.TS AS THIS COMPONENT IS CLIENT SIDE
import {addComment} from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

const CommentForm = ({ postId }: { postId: string }) => {

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // const session = await auth();

    // if(!session){
    
    //    toast({
    //       title: "Login Required",
    //       description: "You must be logged in to post a comment.",
    //       variant: "destructive",
    //     })
    //   setIsSubmitting(false);
    //   return;
    // }
    
    const result = await addComment(postId, comment);

    if(result.success) {
      setComment("");
      router.refresh(); // Refresh the page to show the new comment
    }
    else{
         toast({
        title: "Error",
        description: result.error || "Failed to post comment.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };
   

  return (
    <form onSubmit={handleSubmit} className=" max-w-4xl mx-auto flex items-center justify-center gap-4 ">
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        required
      />
     <Button type="submit" disabled={!comment.trim() || isSubmitting} 
     className="text-black rounded-lg bg-secondary hover:bg-[#F5B9D2] transition-all duration-200 ease-in-out">
        {isSubmitting ? "Posting..." : "Post Comment"}
        <Send />
      </Button>
    </form>
  );


};

export default CommentForm;