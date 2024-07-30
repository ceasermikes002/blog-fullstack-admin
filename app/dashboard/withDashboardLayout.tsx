// pages/dashboard/withDashboardLayout.tsx
import React from 'react';
import DashboardLayout from './layout';

const withDashboardLayout = (PageComponent: React.ComponentType) => {
  return function WrappedWithDashboardLayout(props: any) {
    return (
      <DashboardLayout>
        <PageComponent {...props} />
      </DashboardLayout>
    );
  };
};

export default withDashboardLayout;
