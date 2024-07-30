"use client";
import React from 'react';
import withDashboardLayout from './withDashboardLayout';
import Graph from '@/components/Graph';
import Overview from '@/components/OverView';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 m-9 h-full w-full">
      <Overview/>
      <Graph />
    </div>
  );
};

export default withDashboardLayout(Dashboard);
