import { baseTranslations } from './translations';

const translations = {
  ...baseTranslations,
  common: {
    ...baseTranslations.common,
    search: 'بحث',
    loading: 'جاري التحميل...',
    apply: 'تطبيق',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    login: 'تسجيل الدخول',
    register: 'تسجيل',
    logout: 'تسجيل الخروج',
    share: 'مشاركة',
    copyLink: 'نسخ الرابط',
    linkCopied: 'تم نسخ الرابط',
    day: 'يوم',
    days: 'أيام',
    yes: 'نعم',
    no: 'لا',
    continue: 'متابعة',
    processing: 'جاري المعالجة...',
    selectYear: 'اختر السنة',
    enterPrice: 'أدخل السعر',
    min: 'الحد الأدنى',
    max: 'الحد الأقصى',
    clear: 'مسح',
    any: 'الكل'
  },
  landing: {
    hero: {
      title: 'ابحث عن سيارتك المثالية',
      subtitle: 'تصفح آلاف السيارات من الوكلاء والبائعين الموثوقين',
      sell: {
        title: 'بيع سيارتك',
        description: 'اعرض سيارتك مجاناً والوصول إلى آلاف المشترين',
        cta: 'ابدأ البيع'
      },
      buy: {
        title: 'شراء سيارة',
        description: 'اعثر على السيارة المثالية التي تناسب احتياجاتك',
        cta: 'ابدأ التصفح'
      }
    },
    features: {
      title: 'لماذا تختارنا',
      subtitle: 'نجعل بيع وشراء السيارات أمراً سهلاً',
      search: {
        title: 'بحث سهل',
        description: 'اعثر على ما تبحث عنه بالضبط مع خيارات البحث المتقدمة'
      },
      price: {
        title: 'أفضل الأسعار',
        description: 'قارن الأسعار من مختلف البائعين للحصول على أفضل صفقة'
      },
      security: {
        title: 'تداول آمن',
        description: 'معاملاتك محمية من خلال منصتنا الآمنة'
      },
      contact: {
        title: 'تواصل مباشر',
        description: 'تواصل مباشرة مع البائعين عبر الدردشة أو الاتصال'
      }
    },
    stats: {
      listings: 'إعلانات نشطة',
      dealers: 'وكلاء معتمدون',
      users: 'مستخدمون سعداء',
      satisfaction: 'رضا العملاء'
    }
  },
  filters: {
    searchPlaceholder: 'ابحث عن السيارات...',
    selectLocation: 'اختر الموقع',
    selectMake: 'اختر الماركة',
    selectModel: 'اختر الموديل',
    minPrice: 'السعر الأدنى',
    maxPrice: 'السعر الأقصى',
    yearFrom: 'من سنة',
    yearTo: 'إلى سنة',
    mileageFrom: 'أدنى مسافة',
    mileageTo: 'أقصى مسافة',
    moreFilters: 'المزيد من الفلاتر',
    advancedFilters: 'فلاتر متقدمة',
    vehicleDetails: 'تفاصيل السيارة',
    enginePerformance: 'المحرك والأداء',
    colorsAppearance: 'الألوان والمظهر',
    sellerInfo: 'معلومات البائع',
    additionalFeatures: 'مميزات إضافية',
    price: {
      under50k: 'أقل من 50,000 درهم',
      '50kTo100k': '50,000 - 100,000 درهم',
      '100kTo200k': '100,000 - 200,000 درهم',
      above200k: 'أكثر من 200,000 درهم'
    },
    year: {
      last5Years: 'آخر 5 سنوات',
      last10Years: 'آخر 10 سنوات',
      older: 'أقدم'
    },
    mileage: {
      under10k: 'أقل من 10,000 كم',
      '10kTo50k': '10,000 - 50,000 كم',
      '50kTo100k': '50,000 - 100,000 كم',
      above100k: 'أكثر من 100,000 كم'
    }
  },
  pagination: {
    itemsPerPage: "{{count}} عناصر لكل صفحة",
    showingResults: "عرض {{from}} إلى {{to}} من أصل {{total}} نتائج"
  },
  sort:
  {
    orderBy:'ترتيب',
    default:'تلقائي',
    priceAsc:'الأعلى سعر',
    priceDesc:'الأقل سعر',
    dateDesc:'الأحدث',
    dateAsc:'الأقدم',
    yearDesc:'الأحدث',
    yearAsc:'الأقدم',
    mileageDesc:'الأكثر ممشى',
    mileageAsc:'الأقل ممشى',
  },
  cars: {
    featured: 'مميز',
    found:'وجد',
    contact: 'تواصل',
    make: 'الماركة',
    model: 'الموديل',
    year: 'السنة',
    price: 'السعر',
    mileage: 'المسافة',
    location: 'الموقع',
    bodyType: 'نوع الهيكل',
    transmission: 'ناقل الحركة',
    fuelType: 'نوع الوقود',
    engineCapacity: 'سعة المحرك',
    cylinders: 'السلندرات',
    exteriorColor: 'اللون الخارجي',
    interiorColor: 'اللون الداخلي',
    serviceHistory: 'سجل الصيانة',
    isFirstOwner: 'المالك الأول',
    hasWarranty: 'تحت الضمان',
    hasServiceHistory: 'سجل صيانة',
    hasAccidents: 'بدون حوادث',
    conditions: {
      new: 'جديد',
      used: 'مستعمل'
    },
    specs: {
      gcc: 'خليجية',
      us: 'أمريكية',
      europe: 'أوروبية',
      japanese: 'يابانية',
      korean: 'كورية',
      chinese: 'صينية'
    }
  },
  description: {
    intro: '{{make}} {{model}} {{year}}{{trim}}',
    conditionWithMileage: '{{condition}} قطعت مسافة {{mileage}} {{unit}}',
    conditionOnly: 'سيارة {{condition}}',
    engine: 'محرك {{capacity}}',
    transmission: 'ناقل حركة {{type}}',
    fuel: 'وقود {{type}}',
    horsepower: '{{value}} حصان',
    specs: 'مجهزة بـ {{specs}}',
    colors: 'لون خارجي {{exterior}} مع لون داخلي {{interior}}',
    specifications: 'سيارة {{spec}}',
    firstOwner: 'مالك أول',
    warranty: 'تحت الضمان',
    serviceHistory: 'سجل صيانة كامل',
    noAccidents: 'بدون حوادث',
    features: 'المميزات تشمل {{features}}',
    location: 'موجودة في {{location}}',
    callToAction: 'تواصل معنا للمزيد من المعلومات أو لتحديد موعد المعاينة.',
    kilometers: 'كيلومتر'
  },
  auth: {
    "noAccount": "ليس لديك حساب؟",
    "registerNow": "سجل الآن",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "loginTitle": "تسجيل الدخول إلى حسابك",
    "login": "تسجيل الدخول",
     "signInWithGoogle": "تسجيل الدخول باستخدام Google",
    "signInWithFacebook": "تسجيل الدخول باستخدام Facebook",
    "user": "مستخدم",
    "dealer": "تاجر",
    "name": "الاسم",
    "register": "تسجيل",
    "haveAccount": "لديك حساب بالفعل؟",
    "loginNow": "سجل الدخول الآن",
    "registerTitle": "إنشاء حساب جديد",
    "dealerInfo": "معلومات التاجر",
    "companyName": "اسم الشركة",
    "tradeLicenseNumber": "رقم الرخصة التجارية",
    "location": "الموقع",
    "establishedYear": "سنة التأسيس"
  }
};

export default translations;