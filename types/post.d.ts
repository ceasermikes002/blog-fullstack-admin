// types/post.d.ts

export type Post = {
  id: string;
  title: string;
  content: string;
  slug: string;
  featuredImage?: string;
  draft: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorImage: string?;
  authorName: string;
};
