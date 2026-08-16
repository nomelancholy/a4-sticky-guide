const supportedSizes = [
  '76 × 76mm 표준형',
  '76 × 51mm 직사각형',
  '38 × 51mm 미니',
  '101 × 152mm 대형',
  '101 × 101mm 대형 정사각형',
  '43.1 × 11.9mm 플래그',
  '43.1 × 25.4mm 플래그',
];

const faqs = [
  {
    question: '인쇄한 위치가 포스트잇과 조금씩 어긋나요.',
    answer:
      '인쇄 대화창에서 배율을 100% 또는 실제 크기로 지정하고, 페이지에 맞춤이나 축소 옵션을 끄세요. 프린터마다 급지 오차가 있으므로 첫 장은 일반 용지에 시험 인쇄하는 것을 권장합니다.',
  },
  {
    question: '포스트잇의 접착면은 어느 방향으로 놓아야 하나요?',
    answer:
      '접착면이 먼저 프린터 안으로 들어가도록 배치하세요. 들뜬 가장자리가 먼저 들어가면 용지가 걸릴 수 있습니다. 프린터의 실제 급지 방향은 기종 설명서도 함께 확인해 주세요.',
  },
  {
    question: '가이드선 없이 내용만 다시 인쇄할 수 있나요?',
    answer:
      '가능합니다. 첫 번째 시험 인쇄에서는 가이드선을 켜고, 포스트잇을 붙여 다시 출력할 때는 가이드선 인쇄를 끄면 텍스트만 출력됩니다.',
  },
  {
    question: '레이저 프린터에서도 사용할 수 있나요?',
    answer:
      '포스트잇 제조사와 프린터 제조사가 해당 용지 사용을 허용하는지 먼저 확인하세요. 고열을 사용하는 프린터에서는 접착제가 변형될 수 있으므로 사용자가 기기 안전성을 판단해야 합니다.',
  },
];

function GuideContent() {
  return (
    <div className="mt-10 w-full max-w-4xl space-y-6 print:hidden">
      <section id="guide" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">사용 가이드</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
          A4 용지로 포스트잇을 정확하게 인쇄하는 방법
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Sticky Guide는 실제 포스트잇 크기에 맞춘 A4 배치 가이드를 제공합니다. 먼저 일반 A4 용지에
          가이드를 출력하고 포스트잇을 붙인 뒤, 원하는 내용을 입력해 같은 용지를 다시 인쇄하세요.
          브라우저의 페이지 맞춤 기능을 끄는 것이 정확한 크기를 유지하는 핵심입니다.
        </p>

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ['01', '규격 선택', '가지고 있는 포스트잇의 가로·세로 길이와 같은 규격을 선택합니다.'],
            ['02', '가이드 시험 인쇄', '가이드선을 켜고 일반 용지에 배율 100%로 먼저 출력합니다.'],
            ['03', '부착 후 재인쇄', '접착면을 급지 방향으로 붙이고 내용을 입력한 다음 다시 출력합니다.'],
          ].map(([number, title, description]) => (
            <li key={number} className="rounded-xl bg-slate-50 p-4">
              <span className="text-xs font-black text-indigo-500">{number}</span>
              <h3 className="mt-2 font-bold text-slate-800">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">지원하는 포스트잇 규격</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            정사각형, 직사각형, 대형 및 플래그형까지 자주 쓰는 7가지 규격을 지원합니다.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            {supportedSizes.map((size) => (
              <li key={size} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                {size}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-amber-950">프린터 안전 확인</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            프린터의 급지 방식과 허용 용지 종류는 기종마다 다릅니다. 포스트잇이 들뜨거나 손상된 경우에는
            사용하지 말고, 중요한 인쇄 전에는 한 장만 시험해 주세요. 본 도구의 화면 안내보다 프린터
            제조사의 사용 설명서를 우선해야 합니다.
          </p>
        </div>
      </section>

      <section id="faq" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">FAQ</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">자주 묻는 질문</h2>
        <div className="mt-5 divide-y divide-slate-200">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group py-4 first:pt-0 last:pb-0">
              <summary className="cursor-pointer list-none pr-8 text-sm font-bold text-slate-800 marker:content-none">
                {question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

export default GuideContent;
