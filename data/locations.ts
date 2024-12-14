export const locations = [
  // UAE Cities
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
  'Al Ain',

  // Saudi Cities
  'Riyadh',
  'Jeddah',
  'Mecca',
  'Medina',
  'Dammam',
  'Khobar',

  // Kuwait Cities
  'Kuwait City',
  'Al Ahmadi',
  'Hawalli',

  // Bahrain Cities
  'Manama',
  'Riffa',
  'Muharraq',

  // Qatar Cities
  'Doha',
  'Al Wakrah',
  'Al Khor',

  // Oman Cities
  'Muscat',
  'Salalah',
  'Sohar',
] as const;

export type Location = typeof locations[number];