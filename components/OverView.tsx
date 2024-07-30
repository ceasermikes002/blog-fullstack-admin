// components/Overview.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '@/types/post';
import { Stat } from '@/types/stats';
import RecentPosts from './RecentPosts';

const Overview = () => {
  const [stats, setStats] = useState<Stat | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, recentPostsRes] = await Promise.all([
          axios.get('/api/stats'),
          axios.get('/api/recent-posts'),
        ]);

        setStats(statsRes.data);
        setRecentPosts(recentPostsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl">Total Posts</h2>
          <p className="text-2xl">{stats.totalPosts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl">Total Likes</h2>
          <p className="text-2xl">{stats.totalLikes}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl">Total Favorites</h2>
          <p className="text-2xl">{stats.totalFavorites}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl">Total Users</h2>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Engagement Graph */}
      <div className="flex-1 w-full h-[50vh]">
        {/* Graph will be embedded here */}
      </div>
      <RecentPosts/>
    </div>
  );
};

export default Overview;
