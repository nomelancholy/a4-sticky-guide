import type { LayoutConfig } from '../types';

export const layouts: LayoutConfig[] = [
  {
    id: 'standard-square',
    name: '표준형 정사각형 (76x76mm)',
    postItWidth: 76,
    postItHeight: 76,
    cols: 2,
    rows: 3,
    a4Orientation: 'portrait',
    gap: 'gap-[3mm]',
    description: '가로 2열 × 세로 3행 (총 6개)'
  },
  {
    id: 'rect-medium',
    name: '직사각형 미디움 (76x51mm)',
    postItWidth: 76,
    postItHeight: 51,
    cols: 2,
    rows: 5,
    a4Orientation: 'portrait',
    gap: 'gap-[2mm]',
    description: '가로 2열 × 세로 5행 (총 10개)'
  },
  {
    id: 'mini',
    name: '미니 사이즈 (38x51mm)',
    postItWidth: 38,
    postItHeight: 51,
    cols: 5,
    rows: 4,
    a4Orientation: 'portrait',
    gap: 'gap-[2mm]',
    description: '가로 5열 × 세로 4행 (총 20개)'
  },
  {
    id: 'large-rect',
    name: '대형 사이즈 (101x152mm)',
    postItWidth: 101,
    postItHeight: 152,
    cols: 2,
    rows: 1,
    a4Orientation: 'landscape',
    gap: 'gap-[5mm]',
    description: '가로 2열 × 세로 1행 (총 2개)'
  },
  {
    id: 'large-square',
    name: '대형 정사각형 (101x101mm)',
    postItWidth: 101,
    postItHeight: 101,
    cols: 2,
    rows: 2,
    a4Orientation: 'portrait',
    gap: 'gap-[4mm]',
    description: '가로 2열 × 세로 2행 (총 4개)'
  },
  {
    id: 'flag-mini',
    name: '플래그 미니 (43.1x11.9mm)',
    postItWidth: 43.1,
    postItHeight: 11.9,
    cols: 4,
    rows: 6,
    a4Orientation: 'portrait',
    gap: 'gap-y-[20mm] gap-x-[5mm]',
    description: '가로 4열 × 세로 6행 (총 24개, 넉넉한 간격)'
  },
  {
    id: 'flag-wide',
    name: '플래그 와이드 (43.1x25.4mm)',
    postItWidth: 43.1,
    postItHeight: 25.4,
    cols: 4,
    rows: 5,
    a4Orientation: 'portrait',
    gap: 'gap-y-[15mm] gap-x-[5mm]',
    description: '가로 4열 × 세로 5행 (총 20개)'
  }
];
