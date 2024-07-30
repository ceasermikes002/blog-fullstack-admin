import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@/types/post";
import { Stat } from "@/types/stats";
import Image from "next/image";

const RecentPosts = () => {
  const [stats, setStats] = useState<Stat | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, recentPostsRes] = await Promise.all([
          axios.get("/api/stats"),
          axios.get("/api/recent-posts"),
        ]);

        setStats(statsRes.data);
        setRecentPosts(recentPostsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-8 rounded shadow w-full md:w-1/3  max-h-[40vh] overflow-y-auto">
      <h2 className="text-xl mb-4">Recent Posts</h2>
      <ul>
        {recentPosts.map((post: any) => (
          <li key={post.id} className="mb-4">
            <div className="flex hover:bg-slate-600 gap-4 flex-row justify-between">
              <Image
                src={
                  post.featuredImage.startsWith("/")
                    ? `http://localhost:3000${post.featuredImage}`
                    : post.featuredImage
                }
                width={37}
                height={37}
                alt=""
              />
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPosts;
