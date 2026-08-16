# A4 Sticky Guide

A4 용지에 포스트잇을 붙여 원하는 문구를 정확한 위치에 인쇄할 수 있도록 돕는 React 기반 웹 도구입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

검증 명령:

```bash
npm run lint
npm run build
```

## AdSense 연결

AdSense 게시자 ID와 사이트 확인용 스크립트는 `index.html`에 직접 등록되어 있습니다. 실제 광고 슬롯 요청은
프로덕션 빌드에서 유효한 광고 단위 ID가 설정된 경우에만 발생합니다. 개발 환경에서는 광고 자리표시자만 표시합니다.

1. AdSense에서 반응형 디스플레이 광고 단위를 만든 뒤 `.env.example`을 참고해 로컬의 `.env.local`과
   Vercel 프로젝트 환경변수에 아래 값을 설정합니다.

   ```text
   VITE_ADSENSE_SLOT_ID=실제_광고_단위_ID
   ```

2. `ads.txt.example`의 게시자 ID를 실제 값으로 바꾸고 `public/ads.txt`로 저장합니다.
3. 배포 후 다음 항목을 확인합니다.

   - 페이지 `<head>`에 `google-adsense-account` 메타 태그와 AdSense 스크립트가 있는지
   - `/ads.txt`가 HTTP 200으로 열리고 게시자 ID가 정확한지
   - 광고 영역이 홈 화면에서만 표시되고 인쇄 미리보기와 출력물에서는 숨겨지는지
   - AdSense의 **개인정보 보호 및 메시지**에서 필요한 지역의 동의 메시지를 게시했는지

`VITE_` 접두사가 붙은 값은 브라우저에 공개됩니다. 광고 단위 ID는 공개용 식별자이므로 문제가 없지만,
결제 키나 서버 비밀키에는 이 접두사를 사용하면 안 됩니다.

## 공개 페이지

- `/privacy.html` — 개인정보처리방침 및 광고 쿠키 안내
- `/terms.html` — 이용약관 및 프린터 안전 안내
- `/contact.html` — 문의와 오류 제보
- `/robots.txt`, `/sitemap.xml` — 검색 크롤러 안내

커스텀 도메인으로 이전하면 `index.html`, `public/sitemap.xml`, `public/robots.txt` 및 정책 페이지의 canonical
URL을 새 도메인으로 변경해야 합니다.
