"use client";
import React, { useState, useEffect } from 'react';
import { toggleUpVote, toggleDownVote } from "@/lib/actions";
import { ArrowUp, ArrowDown } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { log } from 'console';


interface VoteCountProps {
  post: {
    _id: string;
    upvotes: Array<{ _ref: string }>;
    downvotes:Array<{ _ref: string }>;
  };
   userId?: string;
  disabled?: boolean; // <-- add this
}

const VoteCount = ({ post, userId, disabled }: VoteCountProps) => {

    // const router = useRouter();

  const [hover, setHover] = useState<"up" | "down" | null>(null);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [localUpvotes, setLocalUpvotes] = useState(post.upvotes ?? []);
  const [localDownvotes, setLocalDownvotes] = useState(post.downvotes ?? []);
  const [isVoting, setIsVoting] = useState(false);

  // const score = localUpvotes - localDownvotes;

   useEffect(() => {
    if (!userId) {
      setVoted(null);
      return;
    }
    if (post.upvotes?.some(u => u._ref === userId)) {
      setVoted("up");
    } else if (post.downvotes?.some(u => u._ref === userId)) {
      setVoted("down");
    } else {
      setVoted(null);
    }
  }, [post.upvotes, post.downvotes, userId]);

  useEffect(() => {
    setLocalUpvotes(post.upvotes ?? []);
    setLocalDownvotes(post.downvotes ?? []);
  }, [post.upvotes, post.downvotes]);

  const handleUpVote = async () => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      const res = await toggleUpVote(post._id);
      if (res.success) {
        if (voted === "up") {
          setLocalUpvotes(localUpvotes.filter(u => u._ref !== userId));
          setVoted(null);
        } else {
          setLocalUpvotes([...localUpvotes, { _ref: userId! }]);
          setLocalDownvotes(localDownvotes.filter(u => u._ref !== userId));
          setVoted("up");
        }
      }
    } finally {
      setIsVoting(false);
    }
  };

  const handleDownVote = async () => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      const res = await toggleDownVote(post._id);
      if (res.success) {
        if (voted === "down") {
          setLocalDownvotes(localDownvotes.filter(u => u._ref !== userId));
          setVoted(null);
        } else {
          setLocalDownvotes([...localDownvotes, { _ref: userId! }]);
          setLocalUpvotes(localUpvotes.filter(u => u._ref !== userId));
          setVoted("down");
        }
      }
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 relative">
      <div className="flex gap-1 bg-gray-100 rounded-lg px-2 py-1 shadow-sm border border-gray-300">
        <div className="relative">
          <button
            onClick={handleUpVote}
            aria-label="Upvote"
              disabled={ !userId || disabled || isVoting}
            onMouseEnter={() => setHover("up")}
            onMouseLeave={() => setHover(null)}
            
            className={`p-1 rounded hover:bg-gray-200 transition ${
              voted === "up" ? "bg-green-100 ring-2 ring-green-400" : ""
            }`}
          >
            <ArrowUp size={20} className="text-green-600" />
          </button>
          {hover === "up" && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-white border p-2 rounded shadow text-xs z-10 whitespace-nowrap">
              Upvotes: {localUpvotes.length ?? 0}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={handleDownVote}
            aria-label="Downvote"
              disabled={!userId || disabled || isVoting}
            onMouseEnter={() => setHover("down")}
            onMouseLeave={() => setHover(null)}
             
            className={`p-1 rounded hover:bg-gray-200 transition ${
              voted === "down" ? "bg-red-100 ring-2 ring-red-400" : ""
            }`}
          >
            <ArrowDown size={20} className="text-red-600" />
          </button>
          {hover === "down" && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-white border p-2 rounded shadow text-xs z-10 whitespace-nowrap">
              Downvotes: {localDownvotes.length ?? 0}
            </div>
          )}
        </div>
      </div>
       <span className="font-bold ml-2">{localUpvotes.length - localDownvotes.length} </span>
    </div>
  );
};

export default VoteCount;
