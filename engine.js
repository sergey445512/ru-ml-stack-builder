const STATUS_LABELS = {confirmed:'Опубликованный кейс',mentioned:'Публичное упоминание',trial:'Trial в техрадаре',proposed:'Предположение',optional:'По задаче'};

function buildStack(industryId, companyId) {
  const industry = INDUSTRIES.find(item => item.id === industryId) || INDUSTRIES[0];
  const company = industry.companies.find(([id]) => id === companyId) || industry.companies[0];
  const profile = COMPANY_PROFILES[company[0]];
  const industrial = industry.id === 'industrial';
  const defaults = {
    sql:[h('PostgreSQL','Учебный выбор SQL-БД. Наличие этой СУБД у компании не установлено.')],
    nosql:[o('Не добавляем','Нет подтверждённого дополнительного источника, требующего отдельной технологии.')],
    dwh:[h(industrial || industry.id === 'finance' ? 'Greenplum' : 'ClickHouse','Предполагаемая аналитическая БД для выборок и витрин; реальное DWH нужно уточнить.')],
    storage:[h(industrial || industry.id === 'development' ? 'MinIO (S3)' : 'S3','Хранить версии обучающих данных и модели; это пример архитектуры.')],
    prep:[h('JupyterLab','Среда исследования данных.'),h('pandas / SQL','Подготовка табличных выборок.')],
    train:[h('CatBoost','Baseline для табличной задачи; не утверждение о моделях компании.')],
    features:[h('SQL-витрины','Общий код расчёта признаков для обучения и batch-скоринга.')],
    distributed:[o('Spark / PySpark','Добавить, если выборки или расчёты уже не помещаются на одной машине.')],
    pipeline:[h('Airflow','Загрузка данных, переобучение и batch-скоринг по расписанию.')],
    experiments:[h('MLflow','Пример средства учёта экспериментов и версий моделей.')],
    api:[h('FastAPI','Пример API для онлайн-предсказаний.')],
    cache:[o('Redis','Кэш или онлайн-признаки, если этого требует задержка ответа.')],
    broker:[o('Kafka','Добавить для потокового обновления данных; для регулярных SQL-выгрузок не обязателен.')],
    git:[h('GitLab'),h('GitLab CI/CD','Проверка и выпуск кода, DAG-ов и совместимых моделей.')],
    containers:[h('Docker'),h('GitLab Registry','Хранение собранных образов, не файлов моделей.')],
    runtime:[h('Kubernetes','Предположение об общей платформе компании, не обязательный минимум для ML.')],
    monitor:[h('Prometheus'),h('Grafana')],
    quality:[h('Метрики по меткам','Проверки качества и срезов после получения истинных ответов.'),o('Evidently','Если нужны готовые отчёты по данным и дрейфу.')],
    bi:[o('Superset','Если бизнесу нужны интерактивные отчёты поверх витрин.')],
    vector:[o(industry.defaults.vector ? 'Qdrant' : 'Не добавляем','Векторный поиск нужен только для отдельной задачи с эмбеддингами.')]
  };
  if (industrial || industry.id === 'ecommerce') defaults.train.push(o('PyTorch','Только если есть нейросетевая задача: изображения, текст или сложное ранжирование.'));
  const items = LAYERS.map(([id,layer,why]) => ({id,layer,why,tools:(profile.tools[id] || defaults[id]).map(tool=>({...tool}))}));
  const containers = items.find(item=>item.id==='containers');
  if (containers.tools.length === 1 && containers.tools[0].tech === 'Docker') containers.tools.push(h('OCI registry','Реестр для версий образов нужен при релизе; конкретный продукт компании не установлен.'));
  const sources = [...new Set(items.flatMap(item=>item.tools.map(tool=>tool.source)).filter(Boolean))];
  return {industry, company, profile, items, sources};
}

function exportText(result) {
  const lines = [`${result.company[1]} · ${result.industry.name}`, 'Примерный стек для ML-инженера. Проверено 13.10.2026.', result.profile.note, 'Опубликовано означает конкретный контур/дату, а не полный стек компании. Вакансии и Trial не доказывают повсеместное использование.', ''];
  for (const item of result.items) {
    lines.push(`${item.layer}:`, item.why);
    for (const tool of item.tools) lines.push(`  ${tool.tech} [${STATUS_LABELS[tool.status]}]${tool.note ? ` — ${tool.note}` : ''}${tool.source ? `\n  ${SOURCES[tool.source].title}: ${SOURCES[tool.source].url}\n  ${SOURCES[tool.source].note}` : ''}`);
    lines.push('');
  }
  return lines.join('\n');
}

if (typeof document !== 'undefined' && document.getElementById('industry')) {
  const $ = id => document.getElementById(id);
  const industrySelect = $('industry'), companySelect = $('company');
  let current;
  for (const industry of INDUSTRIES) industrySelect.add(new Option(industry.name, industry.id));
  function fillCompanies() {
    const industry = INDUSTRIES.find(item=>item.id===industrySelect.value);
    companySelect.replaceChildren();
    for (const [id,name] of industry.companies) companySelect.add(new Option(name,id));
  }
  function appendSource(list,id) {
    const source=SOURCES[id];
    const row=document.createElement('div');row.className='source-item';
    const link=document.createElement('a');link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=`${source.title} ↗`;
    const note=document.createElement('p');note.textContent=`${source.year}. ${source.note}`;
    row.append(link,note);list.append(row);
  }
  function openDetails(item) {
    $('sources-title').textContent=item.layer;
    $('sources-context').textContent=`${current.company[1]} · ${item.why}`;
    const list=$('sources-list');list.replaceChildren();
    for (const tool of item.tools) {
      const row=document.createElement('div');row.className='tool-detail';
      const title=document.createElement('strong');title.textContent=tool.tech;
      const status=document.createElement('span');status.className=`detail-status ${tool.status}`;status.textContent=STATUS_LABELS[tool.status];
      const note=document.createElement('p');note.textContent=tool.note || (tool.source ? 'Указано в источнике ниже; область применения ограничена описанным проектом.' : 'Учебное предположение; не подтверждено для выбранной компании.');
      row.append(title,status,note);if(tool.source) appendSource(row,tool.source);list.append(row);
    }
    $('sources-dialog').showModal();
  }
  function render() {
    current=buildStack(industrySelect.value,companySelect.value);
    $('summary').textContent=`${current.company[1]} · стек для ML-инженера`;
    $('company-context').textContent=current.profile.note;
    const container=$('stack');container.replaceChildren();
    for (const item of current.items) {
      const card=document.createElement('article');card.className='stack-card';card.dataset.layer=item.id;
      const layer=document.createElement('div');layer.className='layer';layer.textContent=item.layer;
      const toolsRow=document.createElement('div');toolsRow.className='tools-row';
      for (const tool of item.tools) {
        const button=document.createElement('button');button.type='button';button.className=`tool-chip ${tool.status}`;button.title=`${STATUS_LABELS[tool.status]}${tool.note ? ': '+tool.note : ''}. Нажмите для подробностей.`;
        button.setAttribute('aria-label',`${tool.tech}: ${STATUS_LABELS[tool.status]}. Подробнее`);
        const dot=document.createElement('i');dot.className=`status-dot ${tool.status}`;dot.setAttribute('aria-hidden','true');
        button.append(dot,document.createTextNode(tool.tech));button.addEventListener('click',()=>openDetails(item));toolsRow.append(button);
      }
      const reason=document.createElement('p');reason.className='reason';reason.textContent=item.why;reason.title=item.why;
      card.append(layer,toolsRow,reason);container.append(card);
    }
  }
  industrySelect.addEventListener('change',()=>{fillCompanies();render();});
  companySelect.addEventListener('change',render);
  $('sources-open').addEventListener('click',()=>{
    $('sources-title').textContent='Источники';$('sources-context').textContent=`${current.company[1]} · проверено 13.10.2026. ${current.profile.note}`;
    const list=$('sources-list');list.replaceChildren();
    for(const id of current.sources)appendSource(list,id);
    if(!current.sources.length)list.textContent='Подходящие подтверждения инструментов не найдены. Все инструменты — предположения для учебного ML-сценария.';
    $('sources-dialog').showModal();
  });
  $('sources-close').addEventListener('click',()=>$('sources-dialog').close());
  $('sources-dialog').addEventListener('click',event=>{if(event.target===$('sources-dialog')){const box=event.target.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)event.target.close();}});
  $('copy').addEventListener('click',async()=>{
    const value=exportText(current);
    try {await navigator.clipboard.writeText(value);}
    catch(_){const area=document.createElement('textarea');area.value=value;document.body.append(area);area.select();const copied=document.execCommand('copy');area.remove();if(!copied){$('copy').textContent='Не удалось скопировать';return;}}
    $('copy').textContent='Скопировано ✓';setTimeout(()=>{$('copy').textContent='Скопировать';},2200);
  });
  fillCompanies();render();
}
