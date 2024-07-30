// components/EngagementGraph.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface EngagementItem {
  date: string;
  likes: number;
  signups: number;
}

const EngagementGraph = () => {
  const [engagementData, setEngagementData] = useState<EngagementItem[]>([]);

  useEffect(() => {
    const fetchEngagementData = async () => {
      try {
        const { data } = await axios.get<EngagementItem[]>('/api/engagement');
        setEngagementData(data);
      } catch (error) {
        console.error('Error fetching engagement data:', error);
      }
    };

    fetchEngagementData();
  }, []);

  const labels = engagementData.map((item) => item.date);
  const likesData = engagementData.map((item) => item.likes);
  const signupsData = engagementData.map((item) => item.signups);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Likes',
        data: likesData,
        borderColor: '#82ca9d',
        backgroundColor: 'rgba(130, 202, 157, 0.2)',
        fill: true,
      },
      {
        label: 'Signups',
        data: signupsData,
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.2)',
        fill: true,
      },
    ],
  };

  const options: any = {
    scales: {
      x: {
        type: 'category',
        labels: labels,
        ticks: {
          callback: function (value: any) {
            // Ensure value is a string and then split
            const stringValue = String(value);
            return stringValue.split('-')[1]; // Show only month
          },
        },
      },
      y: {
        type: 'linear',
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  

  return (
    <div className="w-full p-4 flex flex-col items-center">
      <h2 className="text-xl mb-4">Engagement</h2>
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-[300px] max-w-screen-lg">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EngagementGraph;
