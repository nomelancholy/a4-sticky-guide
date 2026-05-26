export interface PostItItem {
  id: number;
  text: string;
  fontSize: number; // in px
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
}

export interface LayoutConfig {
  id: string;
  name: string;
  postItWidth: number; // in mm
  postItHeight: number; // in mm
  cols: number;
  rows: number;
  a4Orientation: 'portrait' | 'landscape';
  gap?: string; // Optional gap in Tailwind format, e.g., 'gap-[2-3mm]'
  description?: string;
}
