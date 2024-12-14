import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Car, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Plus, 
  Upload, 
  Download 
} from 'lucide-react';
import { useUserListings } from '../../hooks/useUserListings';

export const DealerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { listings } = useUserListings();

  const stats = [
    {
      name: t('dealer.stats.totalListings'),
      value: listings.length,
      icon: Car,
    },
    {
      name: t('dealer.stats.activeSales'),
      value: listings.filter(l => !l.sold).length,
      icon: TrendingUp,
    },
    {
      name: t('dealer.stats.viewsToday'),
      value: 245,
      icon: Eye,
    },
    {
      name: t('dealer.stats.inquiriesToday'),
      value: 12,
      icon: MessageSquare,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/dealer/bulk-listing"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            {t('dealer.bulkListing')}
          </span>
        </Link>

        <button
          onClick={() => {/* TODO: Implement CSV import */}}
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            {t('dealer.importCsv')}
          </span>
        </button>

        <button
          onClick={() => {/* TODO: Implement CSV export */}}
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Download className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            {t('dealer.exportCsv')}
          </span>
        </button>
      </div>
    </div>
  );
};