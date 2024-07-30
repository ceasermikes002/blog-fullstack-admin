export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: any;
  createdAt: Date;
  isAdmin: boolean;
  likes: Like[];
  favorites: Favorite[];
  archived?: boolean; // Add archived field
};
