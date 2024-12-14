import React from 'react';
import { useTranslation } from 'react-i18next';
import { Car, TrendingUp, Eye, MessageSquare } from 'lucide-react';

interface DealerStatsProps {
  totalListings: number;
  activeSales: number;
  viewsToday: number;
  inquiriesToday: number;
}

export const DealerStats: React.FC<DealerStatsProps> = ({
  totalListings,
  activeSales,
  viewsToday,
  inquiriesToday,
}) => {
  const { t } = useTranslation();

  const stats = [
    {
      name: t('dealer.stats.totalListings'),
      value: totalListings,
      icon: Car,
    },
    {
      name: t('dealer.stats.activeSales'),
      value: activeSales,
      icon: TrendingUp,
    },
    {
      name: t('dealer.stats.viewsToday'),
      value: viewsToday,
      icon: Eye,
    },
    {
      name: t('dealer.stats.inquiriesToday'),
      value: inquiriesToday,
      icon: MessageSquare,
    },
  ];

  return (
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
  );
};