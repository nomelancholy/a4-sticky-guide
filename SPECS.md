# 📄 Functional Specification: a4-sticky-guide

## 1. Overview
* **Service Name:** a4-sticky-guide
* **Tech Stack:** React, Tailwind CSS, TypeScript (Optional)
* **Core Value:** A4 용지에 포스트잇을 붙여 원하는 내용(텍스트, 디자인)을 정확한 위치에 인쇄할 수 있도록 가이드라인 템플릿을 생성하고 편집하는 웹 기반 싱글 페이지 애플리케이션(SPA).

---

## 2. Core Architecture & Tech Specs (React + Tailwind)

### 📌 정밀한 mm 단위 렌더링 (Tailwind CSS Arbitrary Values)
* 화면 및 인쇄 시 실제 포스트잇 크기와 일치시키기 위해 Tailwind의 임의 값 지정 문법(`-[...mm]`)을 적극 활용합니다.
* 예시 클래스:
  * A4 컨테이너: `w-[210mm] h-[297mm] bg-white shadow-lg print:shadow-none print:m-0`
  * 표준 포스트잇 ($76 \times 76\text{ mm}$): `w-[76mm] h-[76mm]`

### 📌 Print CSS 제어 (`@media print`)
* 웹 화면의 설정 UI(사이드바, 버튼 등)는 인쇄 시 숨김 처리합니다: `print:hidden`
* 오직 A4 캔버스 컴포넌트만 출력 영역에 가득 차도록 설정합니다.

---

## 3. UI/UX Flow & 상세 기능 명세

### [Step 1: 규격 선택]
사용자가 출력하고자 하는 포스트잇 사이즈(7종 중 택1)를 선택하는 라디오 버튼 또는 카드형 UI를 제공합니다.

#### 📊 지원 규격 및 Tailwind Grid 매핑 구조
1. **표준형 정사각형 ($76 \times 76\text{ mm}$)**
   * 구조: 가로 2열 $\times$ 세로 3행 (총 6개)
   * 클래스: `grid grid-cols-2 gap-[2-3mm]` (실제 여백 고려 배치)
2. **직사각형 미디움 ($76 \times 51\text{ mm}$)**
   * 구조: 가로 2열 $\times$ 세로 5행 (총 10개)
3. **미니 사이즈 ($38 \times 51\text{ mm}$)**
   * 구조: 가로 5열 $\times$ 세로 4행 (총 20개)
4. **대형 사이즈 ($101 \times 152\text{ mm}$)**
   * 구조: ★ A4 가로 방향 전환 (`w-[297mm] h-[210mm]`), 가로 2열 $\times$ 세로 1행 (총 2개)
5. **대형 정사각형 ($101 \times 101\text{ mm}$)**
   * 구조: 가로 2열 $\times$ 세로 2행 (총 4개)
6. **플래그 미니 ($11.9 \times 43.1\text{ mm}$)**
7. **플래그 와이드 ($25.4 \times 43.1\text{ mm}$)**

---

### [Step 2: 가이드 생성]
선택한 규격에 맞춰 React State가 변경되며, A4 캔버스 내부에 시각적 가이드라인이 실시간으로 렌더링됩니다.

* **급지 방향 안내 (Feed Indicator):**
  * A4 캔버스 최상단에 `flex items-center justify-center` 구조로 **"프린터 급지 방향 (종이가 들어가는 방향) ⬆️"** 문구와 화살표를 렌더링합니다. (`print:hidden` 옵션 적용 가능하도록 설계)
* **접착면 표시 (Sticky Zone Guide):**
  * 각 포스트잇 아이템 컴포넌트의 최상단 `h-[15mm]` 영역에 배경색 무드(`bg-yellow-100/50`) 또는 점선 테두리를 주어 **[접착면 부착 위치]**를 명확히 시각화합니다.
  * 이 가이드는 실제 포스트잇의 끈적한 부분이 프린터 급지 방향(상단)으로 가게 유도하여 종이 걸림을 방지합니다.

---

### [Step 3: 콘텐츠 편집]
각 포스트잇 칸을 클릭하여 텍스트를 입력하고 폰트 속성을 변경할 수 있는 WYSIWYG 상태 관리를 구현합니다.

* **개별 포스트잇 State 구조 예시:**
  ```typescript
  interface PostItItem {
    id: number;
    text: string;
    fontSize: number; // e.g., 14 (px 또는 rem 변환)
    fontFamily: string;
    textAlign: 'left' | 'center' | 'right';
  }

* **인라인 에디터 기능:**
    * 각 칸 내부에 textarea 또는 contenteditable 속성을 Tailwind 클래스 w-full h-full bg-transparent resize-none focus:outline-none과 함께 배치합니다.
    * 특정 칸이 focus되면 상단 또는 사이드바에 [폰트 종류, 폰트 크기 슬라이더, 정렬 버튼] 제어용 툴바가 활성화됩니다.

* **편의 기능:**

    * [일괄 적용] 버튼: 현재 편집 중인 칸의 텍스트 스타일(폰트, 크기, 정렬) 혹은 내용 전체를 나머지 모든 포스트잇 칸에 동기화(Copy to All)하는 함수를 구현합니다.

### [Step 4: 인쇄 및 PDF 저장]

* **브라우저 기본 인쇄 창(window.print())을 호출하는 버튼을 배치합니다.**

* **가이드선 인쇄 여부 토글 (Toggle Guide Line):**
  * 사용자가 원할 경우 포스트잇 테두리 실선과 접착면 가이드까지 함께 인쇄(print:block)하거나, 완전히 숨기고 텍스트만 인쇄(print:hidden)할 수 있도록 React State(showGuideInPrint)로 클래스를 동적 제어합니다.

* **사용자 안내 팝업:**
  * 인쇄 버튼 클릭 시 *"실제 사이즈 출력을 위해 프린터 설정에서 여백: 없음, 배율: 100%(기본값)*로 설정해 주세요." 라는 알림창을 모달로 노출합니다.