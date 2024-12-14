import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Plus,
  Upload,
  LayoutDashboard,
  Settings,
  CreditCard,
  FileText,
  ChevronRight,
} from 'lucide-react';

export const DealerTools: React.FC = () => {
  const { t } = useTranslation();

  const tools = [
    {
      icon: LayoutDashboard,
      title: t('dealer.dashboard'),
      description: t('dealer.dashboardDesc'),
      link: '/dealer/dashboard',
    },
    {
      icon: Plus,
      title: t('dealer.addListing'),
      description: t('dealer.addListingDesc'),
      link: '/listings/new',
    },
    {
      icon: Upload,
      title: t('dealer.bulkListing'),
      description: t('dealer.bulkListingDesc'),
      link: '/dealer/bulk-listing',
    },
    {
      icon: CreditCard,
      title: t('dealer.payments'),
      description: t('dealer.paymentsDesc'),
      link: '/dealer/payments',
    },
    {
      icon: FileText,
      title: t('dealer.reports'),
      description: t('dealer.reportsDesc'),
      link: '/dealer/reports',
    },
    {
      icon: Settings,
      title: t('dealer.settings'),
      description: t('dealer.settingsDesc'),
      link: '/dealer/settings',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Link
          key={tool.link}
          to={tool.link}
          className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg" />
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <tool.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {tool.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};