/* Static, offline-capable teaching tool. Evidence is tied to a company and a source. */
const SOURCES = {
  cdek: { title: 'CDEK: трансформация платформы данных', year: '2025', url: 'https://habr.com/ru/companies/cdek_blog/articles/881618/', note: 'История PostgreSQL, Greenplum, ClickHouse, Airflow, Kafka и Superset; описывает платформу данных на конец 2024 года.' },
  lenta: { title: 'Lenta Tech: эволюция платформы логирования', year: '2026', url: 'https://habr.com/ru/companies/lentatech/articles/1012076/', note: 'Kafka, ClickHouse и Grafana показаны в контуре логирования, а не как полный стек ритейлера.' },
  domclick: { title: 'Домклик: проектирование Feature Platform', year: '2025', url: 'https://habr.com/ru/companies/domclick/articles/902926/', note: 'Автор описывает существующие Greenplum, Airflow, Kubeflow, PostgreSQL и варианты хранения эмбеддингов.' },
  domclickK8s: { title: 'Домклик: Kubernetes-платформа', year: '2020', url: 'https://habr.com/ru/companies/domclick/articles/501122/', note: 'Исторический опыт Kubernetes и PostgreSQL. Не подтверждает состояние всех систем сегодня.' },
  ozon: { title: 'Ozon Tech: внутренняя платформа', year: '2022', url: 'https://habr.com/ru/companies/ozontech/articles/708274/', note: 'Прямо перечислены PostgreSQL, S3, Redis, Kafka, ClickHouse, Kubernetes и GitLab.' },
  magnit: { title: 'Магнит Tech: платформа данных OMNI', year: '2024', url: 'https://habr.com/ru/companies/magnit/articles/864472/', note: 'Greenplum, ClickHouse, Airflow, Kafka, S3 и DataLens в конкретном контуре данных.' },
  tbank: { title: 'Т‑Банк: обзор платформы данных', year: '2025', url: 'https://habr.com/ru/companies/tbank/articles/926886/', note: 'В отдельных компонентах платформы названы Airflow, PostgreSQL, Redis, Kafka, S3, Spark, FastAPI, Kubernetes, Prometheus и Grafana.' },
  avito: { title: 'Авито: DBaaS и выбор хранилищ', year: '2024', url: 'https://habr.com/ru/companies/avito/articles/854732/', note: 'Разные задачи решают PostgreSQL, Redis, ClickHouse, Kafka и другие системы.' },
  severstal: { title: 'Северсталь: технологическая платформа', year: '2025', url: 'https://habr.com/ru/companies/severstal/articles/923512/', note: 'Промышленный пример связки Kafka, NiFi, Debezium, Spark и Airflow.' }
};

const INDUSTRIES = [
  { id: 'logistics', name: 'Логистика', companies: [['cdek','СДЭК'],['onlinetrade','Onlinetrade']], analog: 'cdek', defaults: {scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:false}, story:'Заказы, статусы доставки, склады и аналитика SLA.' },
  { id: 'industrial', name: 'Нефть и промышленность', companies: [['gazprom','Газпром'],['lukoil','Лукойл'],['rosneft','Роснефть'],['nornickel','Норникель']], analog:'severstal', defaults:{scale:'large',infra:'onprem',ml:true,events:true,analytics:true,vector:false}, story:'Датчики, производство, активы, прогнозирование и корпоративные ограничения.' },
  { id: 'retail', name: 'Ритейл', companies: [['sportmaster','Спортмастер'],['detmir','Детский мир'],['lenta','Лента'],['bristol','Бристоль']], analog:'magnit', defaults:{scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:false}, story:'Продажи, остатки, кассы, программы лояльности и спрос.' },
  { id: 'ecommerce', name: 'E-commerce', companies: [['goldapple','Золотое яблоко'],['dns','DNS'],['mvideo','М.Видео'],['chitai','Читай-город']], analog:'ozon', defaults:{scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:true}, story:'Каталог, корзина, заказы, рекомендации и события сайта.' },
  { id: 'services', name: 'Сервисы', companies: [['domclick','Домклик'],['tutu','Tutu']], analog:'avito', defaults:{scale:'medium',infra:'hybrid',ml:true,events:true,analytics:true,vector:true}, story:'Бронирование или сделки, пользовательские сценарии и поиск.' },
  { id: 'finance', name: 'Финансы', companies: [['modulbank','Модульбанк'],['ingos','Ингосстрах']], analog:'tbank', defaults:{scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:false}, story:'Транзакции, риск, отчётность и контроль изменений.' },
  { id: 'development', name: 'Девелоперы', companies: [['pik','ПИК'],['samolet','Самолёт']], analog:'domclick', defaults:{scale:'medium',infra:'hybrid',ml:true,events:false,analytics:true,vector:false}, story:'Объекты, сделки, документы, строительные и клиентские данные.' },
  { id: 'transport', name: 'Транспорт', companies: [['aeroflot','Аэрофлот'],['pobeda','Победа'],['rzd','РЖД']], analog:'cdek', defaults:{scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:false}, story:'Расписания, билеты, рейсы, телеметрия и планирование.' }
];

// Only the listed selected companies have direct evidence. All others use an explicitly labeled analogue.
const DIRECT = {
  cdek: { 'PostgreSQL':'cdek', 'Greenplum':'cdek', 'ClickHouse':'cdek', 'Airflow':'cdek', 'Kafka':'cdek', 'Superset':'cdek' },
  lenta: { 'Kafka':'lenta', 'Grafana':'lenta' },
  domclick: { 'PostgreSQL':'domclick', 'Greenplum':'domclick', 'Airflow':'domclick', 'Kubernetes':'domclickK8s', 'Elasticsearch':'domclick' }
};

function industryById(id) { return INDUSTRIES.find(item => item.id === id) || INDUSTRIES[0]; }
function companyName(industry, id) { return industry.companies.find(item => item[0] === id)?.[1] || industry.companies[0][1]; }
function defaultsFor(id) { return { ...industryById(id).defaults }; }

function buildStack(industryId, companyId, options) {
  const industry = industryById(industryId);
  const company = industry.companies.some(item => item[0] === companyId) ? companyId : industry.companies[0][0];
  const o = { ...industry.defaults, ...options };
  const large = o.scale === 'large';
  const busy = o.scale !== 'small';
  const evidence = DIRECT[company] || {};
  const items = [];
  function add(layer, tech, why) {
    const source = evidence[tech] || null;
    items.push({ layer, tech, why, status: tech === 'Пока не требуется' ? 'deferred' : source ? 'confirmed' : 'proposed', source });
  }
  add('Операционная БД', 'PostgreSQL', 'Транзакции, заказы и сущности приложения; аналитическую нагрузку лучше отделять.');
  add('Аналитическая БД / DWH', o.analytics ? ((company === 'cdek' || company === 'domclick') ? 'Greenplum' : 'ClickHouse') : 'Пока не требуется', o.analytics ? 'Отдельный контур для тяжёлых выборок и отчётов.' : 'Пока отчёты невелики, отдельное хранилище добавит лишнюю сложность.');
  add('Файлы и датасеты', o.infra === 'onprem' ? 'MinIO' : 'S3', 'Объектное хранение файлов, выгрузок и артефактов; конкретный провайдер зависит от инфраструктуры.');
  add('Обработка на одной машине', 'Python + SQL', 'Понятный старт для загрузок и расчётов, пока объём помещается на одном узле.');
  add('Распределённая обработка', large && o.analytics ? 'Spark / PySpark' : 'Пока не требуется', large && o.analytics ? 'Рассматривать для вычислений, которые уже не помещаются на одном узле; не обязателен только из-за размера компании.' : 'SQL и Python покрывают выбранный сценарий без отдельного кластера.');
  add('Оркестрация пайплайнов', (o.analytics || o.ml) && busy ? 'Airflow' : 'Пока не требуется', (o.analytics || o.ml) && busy ? 'Расписание, зависимости, повторные запуски и наблюдение за batch-задачами.' : 'Небольшое число независимых задач можно запускать проще.');
  add('Кэш', busy || o.events ? 'Redis' : 'Пока не требуется', busy || o.events ? 'Ускоряет повторные чтения; источником истины остаётся операционная БД.' : 'Добавить, когда появится измеренная потребность в кэше.');
  add('API / онлайн-сервис', o.ml ? 'FastAPI' : 'Пока не требуется', o.ml ? 'HTTP-интерфейс для онлайн-инференса; пакетным моделям он может не понадобиться.' : 'Без онлайн-модели отдельный ML API не нужен.');
  add('Эксперименты и версии моделей', o.ml ? 'MLflow' : 'Пока не требуется', o.ml ? 'Параметры, метрики, артефакты и версии модели.' : 'Слой относится к ML-сценарию.');
  const repo = o.infra === 'cloud' && o.scale === 'small' ? 'GitHub' : 'GitLab';
  add('Репозиторий кода', repo, 'Общий источник кода и история изменений; выбор продукта зависит от существующей платформы команды.');
  add('CI/CD', repo === 'GitHub' ? 'GitHub Actions' : 'GitLab CI/CD', 'Проверка изменений и доставка образов по управляемому процессу.');
  add('Сборка образов', 'Docker', 'Упаковывает сервис и его зависимости в воспроизводимый образ.');
  add('Реестр образов', repo === 'GitLab' ? 'GitLab Container Registry' : 'GitHub Container Registry', 'Хранит собранные версии для выкладки и отката.');
  add('Управление контейнерами', large ? 'Kubernetes' : 'Docker Compose', large ? 'При множестве сервисов помогает управлять размещением и обновлениями.' : 'Для компактной системы достаточно простого запуска на одном хосте.');
  add('Технические метрики', 'Prometheus', 'Сбор задержек, ошибок и доступности сервисов.');
  add('Операционные дашборды', 'Grafana', 'Графики технического состояния и алерты.');
  add('BI-отчёты', o.analytics ? 'Superset' : 'Пока не требуется', o.analytics ? 'Дашборды на бизнес-данных из аналитического контура.' : 'Без отдельной аналитики BI-слой можно отложить.');
  add('Качество модели и дрейф', o.ml ? 'Evidently' : 'Пока не требуется', o.ml ? 'Шаблон для проверки изменений данных и качества после внедрения; требует подходящих меток и правил.' : 'Мониторинг модели нужен после появления ML-продукта.');
  add('Векторный поиск', o.vector ? (company === 'domclick' ? 'Elasticsearch' : large ? 'Qdrant' : 'pgvector') : 'Пока не требуется', o.vector ? 'Нужен только если продукт действительно ищет похожие объекты или эмбеддинги.' : 'Обычная реляционная БД покрывает текущие запросы.');
  add('Брокер событий', o.events ? (busy ? 'Kafka' : 'RabbitMQ') : 'Пока не требуется', o.events ? 'Развязывает отправителей и потребителей событий; Kafka уместна при потоках и нескольких потребителях.' : 'Если асинхронного обмена нет, брокер не нужен.');
  return { industry, company, companyLabel: companyName(industry, company), options: o, items, analog: industry.analog };
}

function exportText(result) {
  const lines = [`Сценарий: ${result.companyLabel} · ${result.industry.name}`, 'Это учебная гипотеза, не карта реальной инфраструктуры.', ''];
  for (const item of result.items) {
    const tag = item.status === 'confirmed' ? 'публично упомянуто' : item.status === 'deferred' ? 'не требуется сейчас' : 'гипотеза';
    lines.push(`${item.layer}: ${item.tech} [${tag}] — ${item.why}${item.source ? ` Источник: ${SOURCES[item.source].url}` : ''}`);
  }
  return lines.join('\n');
}

if (typeof module !== 'undefined' && module.exports) module.exports = { SOURCES, INDUSTRIES, DIRECT, buildStack, defaultsFor, exportText };

if (typeof document !== 'undefined' && document.getElementById('industry')) {
  const $ = id => document.getElementById(id);
  const industrySelect = $('industry');
  const companySelect = $('company');
  for (const industry of INDUSTRIES) industrySelect.add(new Option(industry.name, industry.id));
  function setCompanies() {
    const industry = industryById(industrySelect.value);
    companySelect.replaceChildren();
    for (const [id, name] of industry.companies) companySelect.add(new Option(name, id));
  }
  function setDefaults() {
    const defaults = defaultsFor(industrySelect.value);
    $('scale').value = defaults.scale;
    $('infra').value = defaults.infra;
    for (const key of ['ml','events','analytics','vector']) $(key).checked = defaults[key];
    render();
  }
  function currentOptions() {
    return {scale:$('scale').value, infra:$('infra').value, ml:$('ml').checked, events:$('events').checked, analytics:$('analytics').checked, vector:$('vector').checked};
  }
  function renderSources(result) {
    const used = [...new Set(result.items.map(item => item.source).filter(Boolean))];
    const analog = result.analog;
    const list = $('sources-list');
    list.replaceChildren();
    if (!used.length) {
      const p = document.createElement('p'); p.className = 'empty-source';
      p.textContent = 'Для выбранной компании прямых подтверждений в этой подборке пока нет. Название здесь задаёт бизнес-сценарий, а не известный стек.';
      list.append(p);
    }
    for (const id of used) appendSource(list, id, 'Прямой источник для выбранной компании');
    if (!used.includes(analog)) appendSource(list, analog, 'Отраслевой аналог · не подтверждает стек выбранной компании');
  }
  function appendSource(list, id, relation) {
    const source = SOURCES[id];
    const row = document.createElement('div'); row.className = 'source-item';
    const link = document.createElement('a'); link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = `${source.title} ↗`;
    const note = document.createElement('p'); note.textContent = `${relation} · ${source.year}. ${source.note}`;
    row.append(link, note); list.append(row);
  }
  function render() {
    const result = buildStack(industrySelect.value, companySelect.value, currentOptions());
    const direct = DIRECT[result.company];
    $('company-context').textContent = direct ? 'Есть публикации самой команды. Подтверждения относятся только к описанным в них системам.' : 'Публичный стек этой компании здесь не установлен; используем отраслевой аналог и выбранные условия.';
    $('summary').textContent = `${result.companyLabel} · ${result.industry.story}`;
    const container = $('stack'); container.replaceChildren();
    for (const item of result.items) {
      const card = document.createElement('article'); card.className = 'stack-card' + (item.status === 'deferred' ? ' off' : '');
      const layer = document.createElement('div'); layer.className = 'layer'; layer.textContent = item.layer;
      const heading = document.createElement('h3'); heading.textContent = item.tech;
      const reason = document.createElement('p'); reason.className = 'reason'; reason.textContent = item.why;
      const badge = document.createElement('span'); badge.className = `badge ${item.status}`;
      badge.textContent = item.status === 'confirmed' ? '● Подтверждено' : item.status === 'deferred' ? '— Пока не требуется' : '◇ Гипотеза';
      card.append(layer, heading, reason, badge);
      if (item.source) {
        const source = SOURCES[item.source];
        const link = document.createElement('a'); link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Источник ↗'; link.title = source.note; card.append(link);
      }
      container.append(card);
    }
    renderSources(result);
  }
  industrySelect.value = 'logistics'; setCompanies(); setDefaults();
  industrySelect.addEventListener('change', () => { setCompanies(); setDefaults(); });
  companySelect.addEventListener('change', render);
  for (const id of ['scale','infra','ml','events','analytics','vector']) $(id).addEventListener('change', render);
  $('reset').addEventListener('click', setDefaults);
  $('copy').addEventListener('click', async () => {
    const value = exportText(buildStack(industrySelect.value, companySelect.value, currentOptions()));
    try { await navigator.clipboard.writeText(value); $('copy').textContent = 'Скопировано ✓'; }
    catch (_) { const area = document.createElement('textarea'); area.value = value; document.body.append(area); area.select(); document.execCommand('copy'); area.remove(); $('copy').textContent = 'Скопировано ✓'; }
    setTimeout(() => { $('copy').textContent = 'Скопировать стек'; }, 2200);
  });
}
