/* ============================================================
   PharmaGrid — Landing Page JS (clean, minimal)
   ============================================================ */

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.photo-hero-content, .hero-text, .hero-preview, .value-item, .contact-inner');
reveals.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

/* ── TRANSLATIONS ── */
const translations = {
  en: {
    'nav.cta': 'Request Access',
    'photohero.eyebrow': 'PharmaGrid',
    'photohero.heading': 'Local Brands. <em>Global Standards.</em>',
    'photohero.sub': 'The curated marketplace connecting premium beauty & wellness brands with verified distributors — starting in North Macedonia, expanding across the Balkans.',
    'photohero.cta': 'Apply to Join',
    'hero.eyebrow': 'B2B Beauty & Wellness Marketplace',
    'hero.heading': 'Your products.<br/><em>In front of the right buyers.</em>',
    'hero.sub': 'PharmaGrid connects premium beauty and wellness brands with verified distributors across Europe. One platform. Curated access. Real margins.',
    'hero.cta': 'Get Early Access',
    'preview.label': 'Platform Preview',
    'dash.welcome': "Good morning, <strong>Marco</strong>",
    'dash.sub': "Here's how your brand is performing this week.",
    'dash.nav.dashboard': 'Dashboard',
    'dash.nav.catalogue': 'Catalogue',
    'dash.nav.analytics': 'Analytics',
    'dash.nav.orders': 'Orders',
    'kpi.revenue.label': 'Revenue MTD',
    'kpi.revenue.delta': '↑ 18% vs last month',
    'kpi.orders.label': 'Active Orders',
    'kpi.orders.delta': '+3 this week',
    'kpi.margin.label': 'Avg. Margin',
    'kpi.margin.delta': 'Across all SKUs',
    'kpi.match.label': 'Catalogue Match',
    'kpi.match.delta': 'AI-curated fit',
    'chart.salesVelocity': 'Sales Velocity',
    'chart.last7weeks': 'Last 7 weeks',
    'chart.topProducts': 'Top Products',
    'chart.live': 'Live',
    'orders.title': 'Recent Orders',
    'orders.viewAll': 'View all',
    'orders.th.order': 'Order',
    'orders.th.distributor': 'Distributor',
    'orders.th.product': 'Product',
    'orders.th.units': 'Units',
    'orders.th.value': 'Value',
    'orders.th.status': 'Status',
    'status.processing': 'Processing',
    'status.shipped': 'Shipped',
    'status.pending': 'Pending',
    'blur.message': 'Sign in to access your brand dashboard',
    'blur.cta': 'Request Access',
    'values.item1.title': 'Curated Distribution',
    'values.item1.desc': 'Your products matched to verified distributors by category, market, and margin — no cold outreach needed.',
    'values.item2.title': 'Compliance Ready',
    'values.item2.desc': 'EU Cosmetics Regulation, CPNP, GMP — your dossier verified and attached to every listing automatically.',
    'values.item3.title': 'Live Analytics',
    'values.item3.desc': 'See which products are trending, which distributors are buying, and where your next opportunity is — in real time.',
    'contact.heading': 'Apply to join PharmaGrid',
    'contact.sub': "We're onboarding our first partner brands. Answer a few short questions — we'll follow up personally within 48 hours.",
    'form.brandName.label': 'Brand Name',
    'form.brandName.placeholder': 'e.g. LUMIÈRE Cosmetics',
    'form.yourName.label': 'Your Name',
    'form.yourName.placeholder': 'First and last name',
    'form.workEmail.label': 'Work Email',
    'form.workEmail.placeholder': 'you@brand.com',
    'form.category.label': 'Product Category',
    'form.category.placeholder': 'Select a category',
    'form.category.opt1': 'Skincare & Serums',
    'form.category.opt2': 'Body & Wellness',
    'form.category.opt3': 'Hair Care',
    'form.category.opt4': 'Supplements',
    'form.category.opt5': 'Aromatherapy',
    'form.category.opt6': 'Other',
    'form.message.label': 'Tell us about your brand',
    'form.message.optional': '(optional)',
    'form.message.placeholder': 'Product range, current markets, annual revenue, certifications…',
    'form.submit': 'Submit Application',
    'form.submitting': 'Submitting…',
    'form.note': 'No commitment. We reply within 48 hours.',
    'success.title': 'Application received',
    'success.desc': "We'll review your answers and reach out within 48 hours to schedule a call.",
    'footer.copy': '© 2026 PharmaGrid. All rights reserved.'
  },
  sq: {
    'nav.cta': 'Kërkoni Qasje',
    'photohero.eyebrow': 'PharmaGrid',
    'photohero.heading': "Marka Lokale. <em>Standarde Globale.</em>",
    'photohero.sub': "Tregu i kuruar që lidh markat premium të bukurisë dhe mirëqenies me shpërndarës të verifikuar — duke filluar në Maqedoninë e Veriut dhe duke u zgjeruar në të gjithë Ballkanin.",
    'photohero.cta': "Apliko për t'u Bashkuar",
    'hero.eyebrow': 'Treg B2B i Bukurisë dhe Mirëqenies',
    'hero.heading': 'Produktet tuaja.<br/><em>Para blerësve të duhur.</em>',
    'hero.sub': 'PharmaGrid lidh markat premium të bukurisë dhe mirëqenies me shpërndarës të verifikuar në të gjithë Evropën. Një platformë. Qasje e kuruar. Marzhe reale.',
    'hero.cta': 'Merr Qasje të Hershme',
    'preview.label': 'Pamje Paraprake e Platformës',
    'dash.welcome': 'Mirëmëngjes, <strong>Marco</strong>',
    'dash.sub': 'Ja si po performon marka juaj këtë javë.',
    'dash.nav.dashboard': 'Paneli',
    'dash.nav.catalogue': 'Katalogu',
    'dash.nav.analytics': 'Analitika',
    'dash.nav.orders': 'Porositë',
    'kpi.revenue.label': 'Të Ardhurat (Muaji)',
    'kpi.revenue.delta': '↑ 18% krahasuar me muajin e kaluar',
    'kpi.orders.label': 'Porosi Aktive',
    'kpi.orders.delta': '+3 këtë javë',
    'kpi.margin.label': 'Marzhi Mesatar',
    'kpi.margin.delta': 'Për të gjitha produktet',
    'kpi.match.label': 'Përputhja e Katalogut',
    'kpi.match.delta': 'Përshtatje e kuruar nga AI',
    'chart.salesVelocity': 'Shpejtësia e Shitjeve',
    'chart.last7weeks': '7 javët e fundit',
    'chart.topProducts': 'Produktet Kryesore',
    'chart.live': 'Live',
    'orders.title': 'Porositë e Fundit',
    'orders.viewAll': 'Shiko të gjitha',
    'orders.th.order': 'Porosia',
    'orders.th.distributor': 'Shpërndarësi',
    'orders.th.product': 'Produkti',
    'orders.th.units': 'Njësi',
    'orders.th.value': 'Vlera',
    'orders.th.status': 'Statusi',
    'status.processing': 'Në Përpunim',
    'status.shipped': 'Dërguar',
    'status.pending': 'Në Pritje',
    'blur.message': 'Kyçuni për të parë panelin e markës suaj',
    'blur.cta': 'Kërkoni Qasje',
    'values.item1.title': 'Shpërndarje e Kuruar',
    'values.item1.desc': 'Produktet tuaja përputhen me shpërndarës të verifikuar sipas kategorisë, tregut dhe marzhit — pa nevojë për kontakte të ftohta.',
    'values.item2.title': 'Gati për Përputhshmëri',
    'values.item2.desc': 'Rregullorja Evropiane e Kozmetikës, CPNP, GMP — dosja juaj e verifikuar dhe e bashkangjitur automatikisht në çdo listim.',
    'values.item3.title': 'Analitikë në Kohë Reale',
    'values.item3.desc': 'Shihni cilat produkte po tërheqin vëmendje, cilët shpërndarës po blejnë dhe ku është mundësia juaj e ardhshme — në kohë reale.',
    'contact.heading': "Apliko për t'u bashkuar me PharmaGrid",
    'contact.sub': "Po pranojmë markat tona të para partnere. Përgjigjuni disa pyetjeve të shkurtra — do t'ju kontaktojmë personalisht brenda 48 orësh.",
    'form.brandName.label': 'Emri i Markës',
    'form.brandName.placeholder': 'p.sh. LUMIÈRE Cosmetics',
    'form.yourName.label': 'Emri Juaj',
    'form.yourName.placeholder': 'Emri dhe mbiemri',
    'form.workEmail.label': 'Email i Punës',
    'form.workEmail.placeholder': 'ju@marka.com',
    'form.category.label': 'Kategoria e Produktit',
    'form.category.placeholder': 'Zgjidhni një kategori',
    'form.category.opt1': 'Kujdes për Lëkurën & Serume',
    'form.category.opt2': 'Trupi & Mirëqenia',
    'form.category.opt3': 'Kujdesi për Flokët',
    'form.category.opt4': 'Suplemente',
    'form.category.opt5': 'Aromaterapi',
    'form.category.opt6': 'Tjetër',
    'form.message.label': 'Na tregoni për markën tuaj',
    'form.message.optional': '(opsionale)',
    'form.message.placeholder': 'Gama e produkteve, tregjet aktuale, të ardhurat vjetore, certifikimet…',
    'form.submit': 'Dërgo Aplikimin',
    'form.submitting': 'Duke dërguar…',
    'form.note': 'Pa asnjë detyrim. Përgjigjemi brenda 48 orësh.',
    'success.title': 'Aplikimi u pranua',
    'success.desc': "Do t'i shqyrtojmë përgjigjet tuaja dhe do t'ju kontaktojmë brenda 48 orësh për të planifikuar një bisedë.",
    'footer.copy': '© 2026 PharmaGrid. Të gjitha të drejtat e rezervuara.'
  },
  mk: {
    'nav.cta': 'Побарај Пристап',
    'photohero.eyebrow': 'PharmaGrid',
    'photohero.heading': 'Локални Брендови. <em>Глобални Стандарди.</em>',
    'photohero.sub': 'Кураторски пазар што ги поврзува премиум брендовите за убавина и здравје со верификувани дистрибутери — почнувајќи од Северна Македонија, а се проширува низ Балканот.',
    'photohero.cta': 'Аплицирај за Пристап',
    'hero.eyebrow': 'B2B Пазар за Убавина и Здравје',
    'hero.heading': 'Вашите производи.<br/><em>Пред вистинските купувачи.</em>',
    'hero.sub': 'PharmaGrid ги поврзува премиум брендовите за убавина и здравје со верификувани дистрибутери низ цела Европа. Една платформа. Кураторски пристап. Реални маржи.',
    'hero.cta': 'Добиј Рана Пристапност',
    'preview.label': 'Преглед на Платформата',
    'dash.welcome': 'Добро утро, <strong>Марко</strong>',
    'dash.sub': 'Еве како вашиот бренд се движи оваа недела.',
    'dash.nav.dashboard': 'Контролна Табла',
    'dash.nav.catalogue': 'Каталог',
    'dash.nav.analytics': 'Аналитика',
    'dash.nav.orders': 'Нарачки',
    'kpi.revenue.label': 'Приход (Месец)',
    'kpi.revenue.delta': '↑ 18% споредено со минатиот месец',
    'kpi.orders.label': 'Активни Нарачки',
    'kpi.orders.delta': '+3 оваа недела',
    'kpi.margin.label': 'Просечна Маржа',
    'kpi.margin.delta': 'За сите производи',
    'kpi.match.label': 'Совпаѓање со Каталогот',
    'kpi.match.delta': 'Прилагодено со AI',
    'chart.salesVelocity': 'Брзина на Продажба',
    'chart.last7weeks': 'Последните 7 недели',
    'chart.topProducts': 'Најпродавани Производи',
    'chart.live': 'На Живо',
    'orders.title': 'Последни Нарачки',
    'orders.viewAll': 'Види ги сите',
    'orders.th.order': 'Нарачка',
    'orders.th.distributor': 'Дистрибутер',
    'orders.th.product': 'Производ',
    'orders.th.units': 'Единици',
    'orders.th.value': 'Вредност',
    'orders.th.status': 'Статус',
    'status.processing': 'Во Обработка',
    'status.shipped': 'Испратено',
    'status.pending': 'На Чекање',
    'blur.message': 'Најавете се за пристап до вашата контролна табла',
    'blur.cta': 'Побарај Пристап',
    'values.item1.title': 'Кураторска Дистрибуција',
    'values.item1.desc': 'Вашите производи се поврзани со верификувани дистрибутери според категорија, пазар и маржа — без потреба од студено контактирање.',
    'values.item2.title': 'Подготвени за Усогласеност',
    'values.item2.desc': 'Европска регулатива за козметика, CPNP, GMP — вашето досие е верификувано и автоматски прикачено кон секој оглас.',
    'values.item3.title': 'Аналитика во Реално Време',
    'values.item3.desc': 'Видете кои производи се трендовски, кои дистрибутери купуваат и каде е вашата следна можност — во реално време.',
    'contact.heading': 'Аплицирај за да се приклучиш на PharmaGrid',
    'contact.sub': 'Ги примаме нашите први партнерски брендови. Одговорете на неколку кратки прашања — ќе ве контактираме лично во рок од 48 часа.',
    'form.brandName.label': 'Име на Брендот',
    'form.brandName.placeholder': 'на пр. LUMIÈRE Cosmetics',
    'form.yourName.label': 'Вашето Име',
    'form.yourName.placeholder': 'Име и презиме',
    'form.workEmail.label': 'Работен Е-маил',
    'form.workEmail.placeholder': 'vie@brend.com',
    'form.category.label': 'Категорија на Производ',
    'form.category.placeholder': 'Изберете категорија',
    'form.category.opt1': 'Нега на Кожа & Серуми',
    'form.category.opt2': 'Тело & Здравје',
    'form.category.opt3': 'Нега на Коса',
    'form.category.opt4': 'Суплементи',
    'form.category.opt5': 'Ароматерапија',
    'form.category.opt6': 'Друго',
    'form.message.label': 'Кажете ни за вашиот бренд',
    'form.message.optional': '(опционално)',
    'form.message.placeholder': 'Асортиман на производи, тековни пазари, годишен приход, сертификати…',
    'form.submit': 'Поднеси Апликација',
    'form.submitting': 'Се поднесува…',
    'form.note': 'Без обврска. Одговараме во рок од 48 часа.',
    'success.title': 'Апликацијата е примена',
    'success.desc': 'Ќе ги разгледаме вашите одговори и ќе ве контактираме во рок од 48 часа за да закажеме повик.',
    'footer.copy': '© 2026 PharmaGrid. Сите права се задржани.'
  }
};

let currentLang = localStorage.getItem('pg_lang') || 'en';

function applyTranslations(lang) {
  const dict = translations[lang] || translations.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = dict[key];
    if (value == null) return;
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = dict[key];
    if (value != null) el.setAttribute('placeholder', value);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
  currentLang = lang;
  localStorage.setItem('pg_lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyTranslations(btn.dataset.lang));
});

applyTranslations(currentLang);

/* ── FORM SUBMIT ── */
function handleSubmit(e) {
  e.preventDefault();
  const form    = e.target;
  const btn     = document.getElementById('btn-text');
  const success = document.getElementById('form-success');
  const dict    = translations[currentLang] || translations.en;

  const submission = {
    submittedAt: new Date().toISOString(),
    brandName: form.brandName.value,
    yourName: form.yourName.value,
    workEmail: form.workEmail.value,
    category: form.category.value,
    message: form.message.value
  };

  const existing = JSON.parse(localStorage.getItem('pharmagrid_applications') || '[]');
  existing.push(submission);
  localStorage.setItem('pharmagrid_applications', JSON.stringify(existing));

  btn.textContent = dict['form.submitting'];

  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('show');
  }, 900);
}

/* ── CHART BAR ENTRANCE ── */
const bars = document.querySelectorAll('.cb');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalH = target.style.getPropertyValue('--h');
      target.style.setProperty('--h', '0%');
      requestAnimationFrame(() => {
        setTimeout(() => {
          target.style.transition = 'height 0.7s cubic-bezier(0.34,1.56,0.64,1)';
          target.style.setProperty('--h', finalH);
          target.style.height = finalH;
        }, 100);
      });
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });
bars.forEach(bar => barObserver.observe(bar));
