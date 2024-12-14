import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Car, ShoppingBag, Search, Tag, Shield, Users, ChevronRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: t('landing.features.search.title'),
      description: t('landing.features.search.description'),
    },
    {
      icon: Tag,
      title: t('landing.features.price.title'),
      description: t('landing.features.price.description'),
    },
    {
      icon: Shield,
      title: t('landing.features.security.title'),
      description: t('landing.features.security.description'),
    },
    {
      icon: Users,
      title: t('landing.features.contact.title'),
      description: t('landing.features.contact.description'),
    },
  ];

  const stats = [
    { value: '10K+', label: t('landing.stats.listings') },
    { value: '2K+', label: t('landing.stats.dealers') },
    { value: '50K+', label: t('landing.stats.users') },
    { value: '98%', label: t('landing.stats.satisfaction') },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              {t('landing.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              {t('landing.hero.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => navigate('/listings/new')}
                className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center transform hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-xl" />
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Car className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {t('landing.hero.sell.title')}
                </h2>
                <p className="text-gray-600 mb-4 text-center">
                  {t('landing.hero.sell.description')}
                </p>
                <span className="inline-flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                  {t('landing.hero.sell.cta')} <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </button>

              <button
                onClick={() => navigate('/cars')}
                className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center transform hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-xl" />
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <ShoppingBag className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {t('landing.hero.buy.title')}
                </h2>
                <p className="text-gray-600 mb-4 text-center">
                  {t('landing.hero.buy.description')}
                </p>
                <span className="inline-flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                  {t('landing.hero.buy.cta')} <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-extrabold text-blue-600">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('landing.features.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};