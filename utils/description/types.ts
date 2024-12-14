export interface DescriptionSection {
  key: string;
  content: string;
}

export interface DescriptionContext {
  isRTL: boolean;
  language: string;
}

export interface DescriptionOptions {
  joinChar?: string;
  formatNumbers?: boolean;
}