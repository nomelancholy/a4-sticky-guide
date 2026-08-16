const links = [
  { href: '#guide', label: '사용 가이드' },
  { href: '#faq', label: '자주 묻는 질문' },
  { href: '/privacy.html', label: '개인정보처리방침' },
  { href: '/terms.html', label: '이용약관' },
  { href: '/contact.html', label: '문의' },
];

function SiteFooter() {
  return (
    <footer className="mt-8 w-full max-w-4xl border-t border-slate-300 px-2 py-8 text-sm text-slate-500 print:hidden">
      <nav aria-label="하단 메뉴">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a className="transition-colors hover:text-indigo-600" href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-4 text-center text-xs">© 2026 A4 Sticky Guide. 정확한 출력을 위한 무료 웹 도구입니다.</p>
    </footer>
  );
}

export default SiteFooter;
