import React from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, Copy, MessageCircleMore } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  url, 
  title,
  className = ''
}) => {
  const { t } = useTranslation();
  const [showOptions, setShowOptions] = React.useState(false);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('common.linkCopied'));
    } catch (error) {
      toast.error(t('errors.copyFailed'));
    }
    setShowOptions(false);
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
    window.open(whatsappUrl, '_blank');
    setShowOptions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(!showOptions);
        }}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label={t('common.share')}
      >
        <Share2 className="h-5 w-5 text-gray-600" />
      </button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu">
            <button
              onClick={handleCopyLink}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Copy className="h-4 w-4 mr-2" />
              {t('common.copyLink')}
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <MessageCircleMore className="h-4 w-4 mr-2" />
              WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};