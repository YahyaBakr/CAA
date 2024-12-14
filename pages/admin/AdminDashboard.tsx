import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdminStats } from '../../components/admin/AdminStats';
import { RevenueChart } from '../../components/admin/RevenueChart';
import { mockAdminStats, mockChartData } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('admin.dashboard')}
        </h1>
      </div>

      <AdminStats stats={mockAdminStats} />

      <div className="mt-8">
        <RevenueChart data={mockChartData} />
      </div>
    </div>
  );
};