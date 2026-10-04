export type TextAlign = 'left' | 'center' | 'right';

export interface PostItItem {
  id: number;
  text: string;
  fontSize: number; // in px
  fontFamily: string;
  textAlign: TextAlign;
}

/** 화면 미리보기 색상. 인쇄 결과와는 무관하다. */
export type PreviewTone = 'mono' | 'color';

export interface LayoutConfig {
  id: string;
  name: string;
  postItWidth: number; // in mm
  postItHeight: number; // in mm
  cols: number;
  rows: number;
  a4Orientation: 'portrait' | 'landscape';
  gap?: string; // Tailwind gap classes, e.g. 'gap-[3mm]'
  description?: string;
  /** 접착면 띠 높이(mm). 포스트잇 상단, 급지 방향 쪽. */
  stickyZoneMm: number;
  /** 입력 텍스트가 시작하는 상단 여백(mm). 접착면보다 커야 한다. */
  textTopMm: number;
}
