// components/KebabMenu.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { deleteComment } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function KebabMenu({ postId, commentedAt }: { postId: string, commentedAt: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  
  const togglePopup = () => {
    setOpen(!open);
  };
 
  const handleDelete = async () => {
    // console.log("Delete button clicked for:", { postId, commentedAt });
    setIsDeleting(true);
    try {
      const result = await deleteComment(postId, commentedAt);
      console.log("Delete result:", result);
      
      if (result.status === 'SUCCESS') {
        router.refresh();
        // window.location.href = window.location.href;
        setIsDeleting(false);
      }
      
      setOpen(false);
    } catch(error) {
      console.log(error);
    } finally {
      setOpen(false);
      setIsDeleting(false);

    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className={`relative inline-block rounded-full hover:bg-gray-100 active:bg-gray-200 p-2 ${open ? "bg-gray-100" : ""}`}>
      <MoreVertical onClick={togglePopup} className="cursor-pointer" />
      {open && (
        <div className="absolute right-8 top-0 mb-2 w-40 bg-white border-2 border-gray-300 rounded-md z-50">
            {isDeleting && (
                <div 
          onClick={handleDelete}
          className="block w-full px-4 py-2 text-sm font-semibold text-red-500 bg-gray-100">
            Deleting...
          </div>
        )} 

          <button 
          onClick={handleDelete}
          className={`block w-full px-4 py-2 font-medium text-sm text-red-800 hover:font-semibold hover:text-red-500 hover:bg-gray-100 ${isDeleting ? "hidden" : ""}`}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
