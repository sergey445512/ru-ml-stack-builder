# Проверка списка компаний

Проверено 13 октября 2026 года. Таблица пользователя использована как список гипотез для поиска. Здесь «найдено» означает только технологию, прямо названную в указанном контуре или вакансии, а не полный текущий стек компании. Отсутствие строки с технологиями не означает, что компания их не использует.

| Направление | Компания | Что удалось проверить | Источник |
| --- | --- | --- | --- |
| Логистика | СДЭК | PostgreSQL, Greenplum, ClickHouse, Airflow, Kafka и Superset в истории платформы данных; поэтому Airflow нельзя относить к гипотезам. | [Статья команды](https://habr.com/ru/companies/cdek_blog/articles/881618/) |
| Логистика | Onlinetrade | Конкретные инструменты в этой подборке не подтверждены. | — |
| Нефть и промышленность | Газпром | Не переносим сведения о «Газпром нефти» или Газпромбанке на головную компанию. | — |
| Нефть и промышленность | Лукойл | Конкретные инструменты для общего стека не подтверждены. | — |
| Нефть и промышленность | Роснефть | Конкретные инструменты для общего стека не подтверждены. | — |
| Нефть и промышленность | Норникель | Подтверждены собственная ML-среда и корпоративный MLOps-процесс, но не конкретные Airflow или MLflow. | [Годовой отчёт](https://ar2024.nornickel.ru/ru/business-overview/innovation-technologies.html) |
| Ритейл | Спортмастер | Представитель SportmasterLab назвал Redis, Kafka, Kubernetes, Docker, GitLab, Prometheus и Grafana для веб-команд. Поэтому Kubernetes не стоит считать гипотезой для этого опубликованного контура. | [Интервью](https://habr.com/ru/amp/publications/786340/) |
| Ритейл | Детский мир | В опубликованной вакансии команды платформы данных перечислены Spark, Kafka, Airflow, ClickHouse, Superset и Kubernetes. | [Копия вакансии работодателя](https://finder.work/vacancies/36787220) |
| Ритейл | Лента | Kafka, ClickHouse и Grafana встречаются в описании платформы логирования; это не доказательство ClickHouse в бизнес-DWH. | [Статья Lenta Tech](https://habr.com/ru/companies/lentatech/articles/1012076/) |
| Ритейл | Бристоль | Конкретные инструменты для общего стека не подтверждены. | — |
| E-commerce | Золотое яблоко | Собственный технологический радар относит Kafka, Redis, MongoDB, Kubernetes, Docker, GitLab, Prometheus и Grafana к Adopt. PostgreSQL там отмечен как Trial. | [Технологический радар](https://techradar.goldapple.ru/) |
| E-commerce | DNS | На сайте DNS Технологии в вакансиях отдельных команд указаны Postgres, MSSQL, Kafka и RabbitMQ. | [Вакансии компании](https://www.dns-tech.ru/vacancies) |
| E-commerce | М.Видео | Статья команды описывает PostgreSQL и Airflow в системе качества данных. В вакансии М.ТЕХ Greenplum, ClickHouse и Airflow названы текущим стеком; Trino и Iceberg — планами, а не текущим использованием. | [Статья команды](https://habr.com/ru/companies/mvideo/articles/825314/), [копия вакансии](https://h.careers/job/58e3a62a-7084-4fda-aeed-7fa345455726) |
| E-commerce | Читай-город | Конкретные инструменты не подтверждены. | — |
| Сервисы | Домклик | В статье о Feature Platform описаны Greenplum, Airflow и PostgreSQL; отдельная историческая публикация посвящена Kubernetes. | [Feature Platform](https://habr.com/ru/companies/domclick/articles/902926/), [Kubernetes](https://habr.com/ru/companies/domclick/articles/501122/) |
| Сервисы | Туту | В контуре аналитики отелей описана цепочка MongoDB → Kafka → Redpanda Connect → ClickHouse. | [Статья команды](https://habr.com/ru/companies/tuturu/articles/883462/) |
| Финансы | Модульбанк | Конкретные инструменты для Data/ML-стека не подтверждены. | — |
| Финансы | Ингосстрах | Описан собственный конвейер обучения и предсказания; статья не подтверждает использование MLflow или Airflow. | [Статья команды](https://habr.com/ru/companies/ingos_it/articles/901782/) |
| Девелоперы | ПИК | Конкретные инструменты не подтверждены. | — |
| Девелоперы | Самолёт | CDO описывает MinIO, Airflow, Spark, Kafka, ClickHouse, MLflow, Qdrant, GitLab и Kubernetes в платформе данных. | [Статья команды](https://habr.com/ru/companies/samolet/articles/912782/) |
| Транспорт | Аэрофлот | Конкретные инструменты не подтверждены. | — |
| Транспорт | Победа | Конкретные инструменты не подтверждены. | — |
| Транспорт | РЖД | Для конкретного проекта ИТ-мониторинга перечислены Kafka, Airflow, Spark, PostgreSQL, Greenplum, Grafana и Prometheus. | [Карточка проекта](https://globalcio.ru/projects/54640/) |

Когда прямых материалов недостаточно, конструктор дополнительно показывает отдельно подписанные публикации отраслевых аналогов: [Северсталь](https://habr.com/ru/companies/severstal/articles/923512/), [Магнит](https://habr.com/ru/companies/magnit/articles/864472/), [Ozon Tech](https://habr.com/ru/companies/ozontech/articles/708274/), [Авито](https://habr.com/ru/companies/avito/articles/854732/), [Т-Банк](https://habr.com/ru/companies/tbank/articles/926886/). Их стек не приписывается компаниям из таблицы.
