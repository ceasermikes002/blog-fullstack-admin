"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types/post';
import Image from 'next/image';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} legacyBehavior>
                <a>{post.title}</a>
              </Link>
              <p>{post.content}</p>
              {post.featuredImage ? (
                <Image src={post.featuredImage} alt="" width={150} height={150} />
              ) : (
                <p>No image available</p>
              )}
            </li>
          ))
        ) : (
          <div>No data</div>
        )}
      </ul>
    </div>
  );
}
