"use client"
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';

const EditPostPage = () => {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorImage, setAuthorImage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null); // Add state for featured image
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/api/post/${id}`).then(response => {
        const post = response.data;
        setPost(post);
        setTitle(post.title);
        setContent(post.content);
        setAuthorImage(post.authorImage);
        setAuthorName(post.authorName);
        setCategory(post.category);
        setDescription(post.description);
        setSlug(post.slug);
      }).catch(error => {
        console.error('Error fetching post:', error);
      });
    }
  }, [id]);

  const onDrop = useCallback((acceptedFiles: React.SetStateAction<File | null>[]) => {
    setFeaturedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('id', id as string);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('authorImage', authorImage);
    formData.append('authorName', authorName);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('slug', slug);
  
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
  
    try {
      await axios.put(`/api/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
        <CardDescription>Make changes to your post</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
            />
          </div>
          <div>
            <label>Author Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label>Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Featured Image</label>
            <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag &apos;n&apos; drop an image here, or click to select one</p>
              )}
            </div>
            {featuredImage && <p>{featuredImage.name}</p>}
          </div>
          <Button type="submit">Update Post</Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push('/dashboard')}>Cancel</Button>
      </CardFooter>
    </Card>
  );
};

export default EditPostPage;
