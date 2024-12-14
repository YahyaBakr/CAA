import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Car, 
  Users, 
  Building2, 
  Clock,
  DollarSign,
  Crown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface AdminStatsProps {
  stats: {
    totalListings: number;
    pendingListings: number;
    featuredListings: number;
    totalDealers: number;
    totalUsers: number;
    revenueThisMonth: number;
    listingsThisMonth: number;
    featuredRequestsThisMonth: number;
  };
}

export const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const { t } = useTranslation();

  const statItems = [
    {
      label: t('admin.stats.totalListings'),
      value: stats.totalListings.toLocaleString(),
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: t('admin.stats.pendingListings'),
      value: stats.pendingListings.toLocaleString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: t('admin.stats.featuredListings'),
      value: stats.featuredListings.toLocaleString(),
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: t('admin.stats.totalDealers'),
      value: stats.totalDealers.toLocaleString(),
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: t('admin.stats.totalUsers'),
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      label: t('admin.stats.revenueThisMonth'),
      value: formatCurrency(stats.revenueThisMonth),
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      label: t('admin.stats.listingsThisMonth'),
      value: stats.listingsThisMonth.toLocaleString(),
      icon: CheckCircle,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
    },
    {
      label: t('admin.stats.featuredRequests'),
      value: stats.featuredRequestsThisMonth.toLocaleString(),
      icon: AlertCircle,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="relative bg-white overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
          <div className="p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-md ${item.bgColor} p-3`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.label}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {item.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};