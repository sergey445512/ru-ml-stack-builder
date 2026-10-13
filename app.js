/* Static, offline-capable teaching tool. Published cases are examples, not company profiles. */
const SOURCES = {
  cdek: { title: 'CDEK: трансформация платформы данных', year: '2025', url: 'https://habr.com/ru/companies/cdek_blog/articles/881618/', note: 'История PostgreSQL, Greenplum, ClickHouse, Airflow, Kafka и Superset; описывает платформу данных на конец 2024 года.' },
  lenta: { title: 'Lenta Tech: эволюция платформы логирования', year: '2026', url: 'https://habr.com/ru/companies/lentatech/articles/1012076/', note: 'Kafka, ClickHouse и Grafana показаны в контуре логирования, а не как полный стек ритейлера.' },
  domclick: { title: 'Домклик: проектирование Feature Platform', year: '2025', url: 'https://habr.com/ru/companies/domclick/articles/902926/', note: 'Автор описывает существующие Greenplum, Airflow, Kubeflow, PostgreSQL и варианты хранения эмбеддингов.' },
  domclickK8s: { title: 'Домклик: Kubernetes-платформа', year: '2020', url: 'https://habr.com/ru/companies/domclick/articles/501122/', note: 'Исторический опыт Kubernetes и PostgreSQL. Не подтверждает состояние всех систем сегодня.' },
  ozon: { title: 'Ozon Tech: внутренняя платформа', year: '2022', url: 'https://habr.com/ru/companies/ozontech/articles/708274/', note: 'Прямо перечислены PostgreSQL, S3, Redis, Kafka, ClickHouse, Kubernetes и GitLab.' },
  magnit: { title: 'Магнит Tech: платформа данных OMNI', year: '2024', url: 'https://habr.com/ru/companies/magnit/articles/864472/', note: 'Greenplum, ClickHouse, Airflow, Kafka, S3 и DataLens в конкретном контуре данных.' },
  tbank: { title: 'Т‑Банк: обзор платформы данных', year: '2025', url: 'https://habr.com/ru/companies/tbank/articles/926886/', note: 'В отдельных компонентах платформы названы Airflow, PostgreSQL, Redis, Kafka, S3, Spark, FastAPI, Kubernetes, Prometheus и Grafana.' },
  avito: { title: 'Авито: DBaaS и выбор хранилищ', year: '2024', url: 'https://habr.com/ru/companies/avito/articles/854732/', note: 'Разные задачи решают PostgreSQL, Redis, ClickHouse, Kafka и другие системы.' },
  severstal: { title: 'Северсталь: технологическая платформа', year: '2025', url: 'https://habr.com/ru/companies/severstal/articles/923512/', note: 'Промышленный пример связки Kafka, NiFi, Debezium, Spark и Airflow.' },
  sportmaster: { title: 'SportmasterLab: интервью о технологическом стеке', year: '2024', url: 'https://habr.com/ru/amp/publications/786340/', note: 'Руководитель веб-разработки назвал Redis, Kafka, Kubernetes, Docker, GitLab, Prometheus и Grafana для своих команд; это не описание ML-платформы.' },
  mvideo: { title: 'М.Видео: система качества данных', year: '2024', url: 'https://habr.com/ru/companies/mvideo/articles/825314/', note: 'В конкретной системе контроля качества данных используются PostgreSQL и Airflow.' },
  mvideoData: { title: 'М.ТЕХ: вакансия инженера данных', year: 'опубликованная вакансия', url: 'https://h.careers/job/58e3a62a-7084-4fda-aeed-7fa345455726', note: 'В вакансии Greenplum, ClickHouse и Airflow названы текущим стеком команды; Trino и Iceberg описаны как планы.' },
  tutu: { title: 'Туту: поток аналитических данных об отелях', year: '2025', url: 'https://habr.com/ru/companies/tuturu/articles/883462/', note: 'Описана связка MongoDB → Kafka → Redpanda Connect → ClickHouse в одном контуре.' },
  ingos: { title: 'Ингосстрах: архитектура автоматического обучения моделей', year: '2025', url: 'https://habr.com/ru/companies/ingos_it/articles/901782/', note: 'Собственный конвейер обучения и предсказания; статья не подтверждает использование MLflow или Airflow.' },
  samolet: { title: 'Самолёт: платформа данных и ML', year: '2025', url: 'https://habr.com/ru/companies/samolet/articles/912782/', note: 'CDO перечисляет MinIO, Airflow, Spark, Kafka, ClickHouse, MLflow, Qdrant, GitLab и Kubernetes в платформе данных.' },
  rzd: { title: 'РЖД: проект мониторинга ИТ-блока', year: '2025', url: 'https://globalcio.ru/projects/54640/', note: 'Публичная карточка конкретного проекта перечисляет Kafka, Airflow, Spark, PostgreSQL, Greenplum, Grafana и Prometheus; не весь стек РЖД.' },
  goldapple: { title: 'Золотое яблоко: технологический радар', year: 'публичный радар', url: 'https://techradar.goldapple.ru/', note: 'В Adopt указаны Kafka, MongoDB, Redis, Kubernetes, Docker, GitLab, Prometheus и Grafana; PostgreSQL отмечен как Trial.' },
  dns: { title: 'DNS Технологии: вакансии инженерных команд', year: 'текущие вакансии', url: 'https://www.dns-tech.ru/vacancies', note: 'На сайте компании для отдельных команд названы Postgres, MSSQL, Kafka и RabbitMQ; это не единый стек всей компании.' },
  detmir: { title: 'Детмир Тех: вакансия инженера платформы данных', year: '2026', url: 'https://finder.work/vacancies/36787220', note: 'В опубликованном описании команды названы Spark, Kafka, Airflow, ClickHouse, Superset и Kubernetes; ссылка ведёт на копию вакансии работодателя.' },
  nornickel: { title: 'Норникель: годовой отчёт об инновационных технологиях', year: '2024', url: 'https://ar2024.nornickel.ru/ru/business-overview/innovation-technologies.html', note: 'Подтверждены собственная ML-среда и корпоративный MLOps-процесс; конкретные Airflow, MLflow или СУБД здесь не названы.' }
};

const INDUSTRIES = [
  { id: 'logistics', name: 'Логистика', companies: [['cdek','СДЭК'],['onlinetrade','Onlinetrade']], analog: 'cdek', evidence:['cdek'], defaults: {scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:false}, story:'Заказы, статусы доставки, склады и аналитика SLA.' },
  { id: 'industrial', name: 'Нефть и промышленность', companies: [['gazprom','Газпром'],['lukoil','Лукойл'],['rosneft','Роснефть'],['nornickel','Норникель']], analog:'severstal', evidence:['nornickel','severstal'], defaults:{scale:'large',infra:'onprem',ml:true,events:true,analytics:true,vector:false}, story:'Датчики, производство, активы, прогнозирование и корпоративные ограничения.' },
  { id: 'retail', name: 'Ритейл', companies: [['sportmaster','Спортмастер'],['detmir','Детский мир'],['lenta','Лента'],['bristol','Бристоль']], analog:'magnit', evidence:['sportmaster','detmir','lenta','magnit'], defaults:{scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:false}, story:'Продажи, остатки, кассы, программы лояльности и спрос.' },
  { id: 'ecommerce', name: 'E-commerce', companies: [['goldapple','Золотое яблоко'],['dns','DNS'],['mvideo','М.Видео'],['chitai','Читай-город']], analog:'ozon', evidence:['goldapple','dns','mvideo','mvideoData','ozon'], defaults:{scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:true}, story:'Каталог, корзина, заказы, рекомендации и события сайта.' },
  { id: 'services', name: 'Сервисы', companies: [['domclick','Домклик'],['tutu','Tutu']], analog:'avito', evidence:['domclick','tutu','avito'], defaults:{scale:'medium',infra:'hybrid',ml:true,events:true,analytics:true,vector:true}, story:'Бронирование или сделки, пользовательские сценарии и поиск.' },
  { id: 'finance', name: 'Финансы', companies: [['modulbank','Модульбанк'],['ingos','Ингосстрах']], analog:'tbank', evidence:['ingos','tbank'], defaults:{scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:false}, story:'Транзакции, риск, отчётность и контроль изменений.' },
  { id: 'development', name: 'Девелоперы', companies: [['pik','ПИК'],['samolet','Самолёт']], analog:'domclick', evidence:['samolet','domclick'], defaults:{scale:'large',infra:'onprem',ml:true,events:true,analytics:true,vector:true}, story:'Объекты, сделки, документы, строительные и клиентские данные.' },
  { id: 'transport', name: 'Транспорт', companies: [['aeroflot','Аэрофлот'],['pobeda','Победа'],['rzd','РЖД']], analog:'cdek', evidence:['rzd','cdek'], defaults:{scale:'large',infra:'hybrid',ml:true,events:true,analytics:true,vector:false}, story:'Расписания, билеты, рейсы, телеметрия и планирование.' }
];

// Technologies explicitly mentioned in each published case; no attribution to companies in the examples list.
const CASE_TECH = {
  cdek: { 'PostgreSQL':'cdek', 'Greenplum':'cdek', 'ClickHouse':'cdek', 'Airflow':'cdek', 'Kafka':'cdek', 'Superset':'cdek' },
  sportmaster: { 'Redis':'sportmaster', 'Kafka':'sportmaster', 'Kubernetes':'sportmaster', 'Docker':'sportmaster', 'GitLab':'sportmaster', 'Prometheus':'sportmaster', 'Grafana':'sportmaster' },
  detmir: { 'ClickHouse':'detmir', 'Spark / PySpark':'detmir', 'Airflow':'detmir', 'Kafka':'detmir', 'Superset':'detmir', 'Kubernetes':'detmir', 'Docker':'detmir' },
  lenta: { 'Kafka':'lenta', 'Grafana':'lenta' },
  goldapple: { 'Redis':'goldapple', 'Kafka':'goldapple', 'Kubernetes':'goldapple', 'Docker':'goldapple', 'GitLab':'goldapple', 'Prometheus':'goldapple', 'Grafana':'goldapple' },
  dns: { 'PostgreSQL':'dns', 'Kafka':'dns' },
  mvideo: { 'PostgreSQL':'mvideo', 'Airflow':'mvideo' },
  mvideoData: { 'Greenplum':'mvideoData', 'ClickHouse':'mvideoData', 'Airflow':'mvideoData' },
  tutu: { 'ClickHouse':'tutu', 'Kafka':'tutu' },
  ingos: {},
  nornickel: {},
  samolet: { 'ClickHouse':'samolet', 'MinIO':'samolet', 'Spark / PySpark':'samolet', 'Airflow':'samolet', 'Kafka':'samolet', 'MLflow':'samolet', 'GitLab':'samolet', 'Kubernetes':'samolet', 'Qdrant':'samolet' },
  rzd: { 'PostgreSQL':'rzd', 'Greenplum':'rzd', 'Spark / PySpark':'rzd', 'Airflow':'rzd', 'Kafka':'rzd', 'Grafana':'rzd', 'Prometheus':'rzd' },
  domclick: { 'PostgreSQL':'domclick', 'Greenplum':'domclick', 'Airflow':'domclick', 'Kubernetes':'domclickK8s' },
  ozon: { 'PostgreSQL':'ozon', 'S3':'ozon', 'Redis':'ozon', 'Kafka':'ozon', 'ClickHouse':'ozon', 'Kubernetes':'ozon', 'GitLab':'ozon' },
  magnit: { 'ClickHouse':'magnit', 'Airflow':'magnit', 'Kafka':'magnit', 'S3':'magnit' },
  tbank: { 'PostgreSQL':'tbank', 'S3':'tbank', 'Airflow':'tbank', 'Redis':'tbank', 'Kafka':'tbank', 'FastAPI':'tbank', 'Kubernetes':'tbank', 'Prometheus':'tbank', 'Grafana':'tbank' },
  avito: { 'PostgreSQL':'avito', 'Redis':'avito', 'ClickHouse':'avito', 'Kafka':'avito' },
  severstal: { 'Airflow':'severstal', 'Kafka':'severstal' }
};

function industryById(id) { return INDUSTRIES.find(item => item.id === id) || INDUSTRIES[0]; }

function buildStack(industryId) {
  const industry = industryById(industryId);
  const o = { ...industry.defaults, ml: true };
  const large = o.scale === 'large';
  const busy = o.scale !== 'small';
  const evidence = Object.assign({}, ...industry.evidence.slice().reverse().map(id => CASE_TECH[id] || {}));
  const items = [];
  function add(layer, tech, why) {
    const source = evidence[tech] || null;
    items.push({ layer, tech, why, status: tech === 'Пока не требуется' ? 'deferred' : source ? 'confirmed' : 'proposed', source });
  }
  add('Операционная БД', 'PostgreSQL', 'Транзакции, заказы и сущности приложения; аналитическую нагрузку лучше отделять.');
  add('Аналитическая БД / DWH', o.analytics ? (['logistics','transport'].includes(industry.id) ? 'Greenplum' : 'ClickHouse') : 'Пока не требуется', o.analytics ? 'Отдельный контур для тяжёлых выборок и отчётов.' : 'Пока отчёты невелики, отдельное хранилище добавит лишнюю сложность.');
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
  add('Векторный поиск', o.vector ? (large ? 'Qdrant' : 'pgvector') : 'Пока не требуется', o.vector ? 'Нужен только если продукт действительно ищет похожие объекты или эмбеддинги.' : 'Обычная реляционная БД покрывает текущие запросы.');
  add('Брокер событий', o.events ? (busy ? 'Kafka' : 'RabbitMQ') : 'Пока не требуется', o.events ? 'Развязывает отправителей и потребителей событий; Kafka уместна при потоках и нескольких потребителях.' : 'Если асинхронного обмена нет, брокер не нужен.');
  return { industry, options: o, items, sources: industry.evidence };
}

function exportText(result) {
  const lines = [`Направление: ${result.industry.name}`, `Примеры компаний: ${result.industry.companies.map(([, name]) => name).join(', ')}`, 'Это учебный сценарий с ML, не карта инфраструктуры перечисленных компаний.', ''];
  for (const item of result.items) {
    const tag = item.status === 'confirmed' ? 'публично упомянуто' : item.status === 'deferred' ? 'не требуется сейчас' : 'гипотеза';
    lines.push(`${item.layer}: ${item.tech} [${tag}] — ${item.why}${item.source ? ` Источник: ${SOURCES[item.source].url}` : ''}`);
  }
  return lines.join('\n');
}

if (typeof module !== 'undefined' && module.exports) module.exports = { SOURCES, INDUSTRIES, CASE_TECH, buildStack, exportText };

if (typeof document !== 'undefined' && document.getElementById('industry')) {
  const $ = id => document.getElementById(id);
  const industrySelect = $('industry');
  for (const industry of INDUSTRIES) industrySelect.add(new Option(industry.name, industry.id));
  function renderSources(result) {
    const list = $('sources-list');
    list.replaceChildren();
    for (const id of result.sources) {
      const named = result.industry.companies.some(([company]) => company === id) || id === 'mvideoData';
      appendSource(list, id, named ? 'Публикация команды из списка · описывает конкретный контур' : 'Отраслевой аналог · не подтверждает стек компаний из списка');
    }
  }
  function appendSource(list, id, relation) {
    const source = SOURCES[id];
    const row = document.createElement('div'); row.className = 'source-item';
    const link = document.createElement('a'); link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = `${source.title} ↗`;
    const note = document.createElement('p'); note.textContent = `${relation} · ${source.year}. ${source.note}`;
    row.append(link, note); list.append(row);
  }
  function render() {
    const result = buildStack(industrySelect.value);
    $('company-examples').textContent = result.industry.companies.map(([, name]) => name).join(' · ');
    $('summary').textContent = `${result.industry.name} · ${result.industry.story} ML-модели включены в сценарий.`;
    const container = $('stack'); container.replaceChildren();
    for (const item of result.items) {
      const card = document.createElement('article'); card.className = 'stack-card' + (item.status === 'deferred' ? ' off' : '');
      const layer = document.createElement('div'); layer.className = 'layer'; layer.textContent = item.layer;
      const heading = document.createElement('h3'); heading.textContent = item.tech;
      const reason = document.createElement('p'); reason.className = 'reason'; reason.textContent = item.why;
      const badge = document.createElement('span'); badge.className = `badge ${item.status}`;
      badge.textContent = item.status === 'confirmed' ? '● Есть в публичном кейсе' : item.status === 'deferred' ? '— Пока не требуется' : '◇ Гипотеза';
      card.append(layer, heading, reason, badge);
      if (item.source) {
        const source = SOURCES[item.source];
        const link = document.createElement('a'); link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Источник ↗'; link.title = source.note; card.append(link);
      }
      container.append(card);
    }
    renderSources(result);
  }
  industrySelect.value = 'logistics'; render();
  industrySelect.addEventListener('change', render);
  $('copy').addEventListener('click', async () => {
    const value = exportText(buildStack(industrySelect.value));
    try { await navigator.clipboard.writeText(value); $('copy').textContent = 'Скопировано ✓'; }
    catch (_) { const area = document.createElement('textarea'); area.value = value; document.body.append(area); area.select(); document.execCommand('copy'); area.remove(); $('copy').textContent = 'Скопировано ✓'; }
    setTimeout(() => { $('copy').textContent = 'Скопировать стек'; }, 2200);
  });
}
