"use client";
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setFeaturedImage(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept:{
    'image/png': ['.png'],
    'image/jpg': ['.jpg'],
    'image/jpeg': ['.jpeg'],
    }, });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('slug', title.toLowerCase().replace(/ /g, '-'));
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    formData.append('authorImage', authorImage);
    formData.append('authorName', authorName);

    try {
      const response = await axios.post('/api/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        router.push('/new');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
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
          <ReactQuill value={content} onChange={setContent} />
        </div>
        <div>
          <label>Featured Image</label>
          <div {...getRootProps()} style={{ border: '1px solid #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            }
          </div>
          {featuredImage && <p>Selected file: {featuredImage.name}</p>}
        </div>
        <div>
          <label>Author Image URL</label>
          <input
            type="text"
            value={authorImage}
            onChange={(e) => setAuthorImage(e.target.value)}
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
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
};

export default CreatePost;
