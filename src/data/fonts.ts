export interface FontOption {
  value: string;
  label: string;
}

export interface FontGroup {
  label: string;
  fonts: FontOption[];
}

export const fontGroups: FontGroup[] = [
  {
    label: '한글',
    fonts: [
      { value: "'Noto Sans KR', sans-serif", label: '본고딕 (Noto Sans KR)' },
      { value: "'Nanum Myeongjo', serif", label: '나눔명조' },
      { value: "'Nanum Pen Script', cursive", label: '나눔손글씨 펜' },
      { value: "'Gowun Dodum', sans-serif", label: '고운돋움' },
    ],
  },
  {
    label: '영문',
    fonts: [
      { value: 'Inter, sans-serif', label: 'Inter' },
      { value: 'Roboto, sans-serif', label: 'Roboto' },
    ],
  },
];

export const DEFAULT_FONT_FAMILY = fontGroups[0].fonts[0].value;

export const SUPPORT_URL = 'https://link.kakaopay.com/__/ffe10Qe';
export const ISSUES_URL = 'https://github.com/nomelancholy/a4-sticky-guide/issues';
