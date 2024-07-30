// types/post.d.ts

export type Post = {
  favorites: any;
  likes: any;
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
  category: string?;
  description: string?;
  isLiked: string?;
  isFavorited: string?;
};
