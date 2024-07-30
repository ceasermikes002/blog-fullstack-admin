"use client"
import {useState, useEffect} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/post';

const ViewPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('/api/posts');
            setPosts(response.data);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        fetchPosts();
      }, []);

      const handleDelete = async (id: string) => {
        try {
          await axios.delete(`/api/delete?id=${id}`);
          setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      };
    
      const handleEdit = (id: string) => {
        router.push(`/edit/${id}`);
      };

  return (
    <div className='flex items-center justify-center flex-col p-4 m-9 max-h-60'>
        
      <h1>View Posts</h1>
      <div className='flex items-center gap-5 flex-col justify-center my-9'>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <Button onClick={() => handleEdit(post.id)}>Edit</Button>
            <Button onClick={() => handleDelete(post.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewPosts