# Проверка компаний для ML-конструктора

Повторная проверка: **13 октября 2026 года**. Прошли все 23 компании. Страница показывает учебный ML-сценарий, дополненный сведениями из конкретных публичных систем. Отсутствие подтверждения не означает отсутствия технологии.

Теперь доказательство хранится у **каждого инструмента**, а не у всей карточки. SQL Server и MongoDB могут одновременно быть источниками данных, но это не означает, что ML-команда читает их напрямую: обычно данные попадают в реплики, DWH и витрины.

- **Кейс**: публикация компании, профиль компании или кейс исполнителя. Ограничен проектом и датой.
- **Упоминание**: вакансия, объявление о найме, самоописание сотрудника или старое свидетельство. Не равно подтверждённой текущей эксплуатации.
- **Trial**: статус в техрадаре; не выдаётся за общекорпоративный production-стандарт.
- **Предположение**: выбранный для учебного примера инструмент без подтверждения у компании.
- **По задаче**: добавлять лишь при соответствующей потребности. Это относится к неподтверждённым Spark, Kafka, Redis, Evidently и векторному поиску.

## Результаты повторной проверки

| Компания | Что уточнено | Ограничение и источник |
| --- | --- | --- |
| СДЭК | PostgreSQL; Greenplum и ClickHouse; Airflow, Kafka, Superset. KeyDB, RabbitMQ, GitLab, Kubernetes в инженерном стеке. | [Платформа данных](https://habr.com/ru/companies/cdek_blog/articles/881618/), [материал CDEK Digital](https://hh.ru/article/31776). ML registry не установлен. |
| Onlinetrade | Достаточного первичного описания SQL/ML-стека не найдено. | Всё в конструкторе — учебные предположения. Стек интегратора, который подключается к Onlinetrade, не присваиваем заказчику. |
| Газпром | Postgres Pro Standard в документообороте «Газпром инвест». | [Кейс вендора](https://postgrespro.ru/cases/oil/gazprom-invest-directum). Только дочернее общество; не переносим стек Газпромбанка или «Газпром нефти» на ПАО. |
| Лукойл | PostgreSQL, 1С и NiFi в отдельном проекте учёта грузов. | [Кейс исполнителя](https://web.ruward.ru/cases/8910/). В конструкторе используем БД и учётный источник; корпоративная ML-платформа не установлена. |
| Роснефть | PostgreSQL назван в старой презентации вендора. | [2016, Postgres Professional](https://postgrespro.ru/media/2016/07/20/postgrespro_ibm.pdf). Историческое упоминание; обучение студентов PostgreSQL не доказывает современный production. |
| Норникель | Kolmogorov: JupyterLab, MLflow, Airflow, Kubernetes, Grafana. | [Внедрение 24.03.2025](https://datasapience.ru/nornickel-with-glowbyte-implemented-a-corporate-ml-platform-based-on-kolmogorov). Новое подтверждение: прежнее «конкретных MLOps-инструментов нет» устарело. SQL-БД не названы. |
| Спортмастер | Oracle и SQL Server как источники; Hadoop/Hive, Spark, Airflow, Kafka, ClickHouse. | [Публикация SM Lab](https://habr.com/ru/amp/publications/721334/). Дополнительно [web-команды](https://habr.com/ru/amp/publications/786340/) — Redis, Docker, Kubernetes, GitLab, Prometheus/Grafana. |
| Детский мир | Spark, Kafka, Airflow, ClickHouse, Superset, Kubernetes в вакансии платформы данных. | [Текст вакансии](https://finder.work/vacancies/36787220). Статус «Упоминание»; не утверждаем состав ML registry. |
| Лента | Geo ML: Postgres, PySpark, JupyterHub, Airflow, MLflow, GitLab, Kubernetes, Grafana. | [Вакансия команды](https://h.careers/job/47202bbe-5fd1-415b-85bc-1930259489bc). [ClickHouse в логировании](https://habr.com/ru/companies/lentatech/articles/1012076/) не подтверждает его роль в обучающем DWH. |
| Бристоль | Python, FastAPI, PostgreSQL явно названы стеком backend-команды. | [Архив вакансии работодателя](https://dreamjob.ru/employers/58994/vakansii/122924610). Применение API для ML — предположение. |
| Золотое яблоко | SQL Server в сопровождении; PostgreSQL Trial; MongoDB Adopt. В аналитике упоминаются ClickHouse и BigQuery. | [DBA-вакансия](https://career.habr.com/vacancies/1000168814), [техрадар](https://techradar.goldapple.ru/), [найм в продуктовую аналитику](https://ru.linkedin.com/posts/иван-пичурин-316b15217_золотоеяблоко-goldapple-вакансия-activity-7315238099880456192-v7jV). FastAPI, S3, Jenkins и Artifactory также в радаре. |
| DNS | PostgreSQL и SQL Server, 1С; Kafka и RabbitMQ. | [Официальные вакансии](https://www.dns-tech.ru/vacancies). Две SQL-БД не сведены к одной. MLflow и Airflow не объявляем подтверждёнными. |
| М.Видео | PostgreSQL; Greenplum/ClickHouse; в DS-вакансии CatBoost, PyTorch, MLflow, Airflow, Spark, S3, Kafka, Docker, Kubernetes. | [Система DQ](https://habr.com/ru/companies/mvideo/articles/825314/), [DWH-команда](https://h.careers/job/58e3a62a-7084-4fda-aeed-7fa345455726), [DS-вакансия](https://h.careers/job/479c8cb2-9d9e-4e35-b72b-9c0e445b12d8). Не переносим планы из одного объявления на реализованную платформу. |
| Читай-город | PostgreSQL, Percona MySQL, ClickHouse, Redis, Kafka/RabbitMQ, GitLab CI/CD, Docker, Kubernetes, Prometheus/Grafana. | [Объявление Читай Технологии](https://t.me/s/devops_jobs_feed/15304). Упоминание web-стека, не описание ML-платформы. |
| Домклик | Greenplum, PostgreSQL, Redis; dbt/Python; Airflow для batch и Kubeflow для обучения; Elasticsearch для эмбеддингов. | [Кейс Feature Platform](https://habr.com/ru/companies/domclick/articles/902926/). Не подставляем Qdrant и Spark только по отрасли. MLflow остаётся предположением: перечень навыков в иной вакансии не заменяет кейс. |
| Туту | PostgreSQL и MariaDB вместе с MongoDB; OpenShift/Kubernetes, Docker. Kafka и ClickHouse в аналитике отелей. | [Официальный профиль](https://habr.com/ru/companies/tuturu/profile/), [аналитический поток](https://habr.com/ru/companies/tuturu/articles/883462/). MLOps-инструменты не подтверждены. |
| Модульбанк | PostgreSQL, Docker, RabbitMQ в описании работы backend-разработчика. | [Первичное свидетельство сотрудника](https://career.habr.com/strkmp). Отмечено как упоминание; не официальная архитектура банка. |
| Ингосстрах | Data Ocean Nova и Kolmogorov AI/Continuity для жизненного цикла моделей. | [Кейс внедрения 14.05.2026](https://datasapience.ru/ingosstrakh-data-sapience-glowbyte). Не раскрывает внутренние SQL-СУБД и не доказывает MLflow/Airflow. |
| ПИК | Airflow, Python/SQL, Docker, GitLab CI названы в найме ПИК Digital. | [Объявление руководителя](https://t.me/s/datajobschannel/1776?q=%23ELT). PostgreSQL/Vertica из соседнего объявления pik.pro не выдаём за установленный общий стек. |
| Самолёт | MinIO, ClickHouse, Spark, Airflow, MLflow, GitLab, Kubernetes, Qdrant, Kafka; PostgreSQL и JupyterHub, VictoriaMetrics/Grafana в вакансии инфраструктуры. | [Статья CDO](https://habr.com/ru/companies/samolet/articles/912782/), [вакансия](https://getmatch.ru/vacancies/21050-rukovoditel-soprovozhdeniia-infrastruktury-dannykh). |
| Аэрофлот | PostgreSQL, ClickHouse, Redis, FastAPI, Kafka/RabbitMQ, Jenkins, Docker, Kubernetes, Prometheus/Grafana. | [Кейс РАМАКС](https://www.ramax.ru/kejsy/mobilnoe-prilozhenie-i-sayt-pao-aeroflot/). Относится к сайту и приложению. Использование в ML не установлено. |
| Победа | MS SQL Server и 1С в управленческом учёте. | [Карточка внедрения](https://eawards.1c.ru/projects/integraciya-i-avtomatizaciya-upravlencheskogo-ucheta-dlya-aviakompanii-pobeda-315217/). Не переносим стек Аэрофлота на дочернюю авиакомпанию. |
| РЖД | PostgreSQL, Greenplum, Spark, Airflow, Kafka, Prometheus/Grafana. | [Проект ИТ-мониторинга](https://globalcio.ru/projects/54640/). Конкретный проект, не все системы РЖД. |

## Что означает несколько инструментов

SQL и документная БД — разные типы источников. DWH и быстрая аналитическая БД могут работать рядом. JupyterLab и pandas решают разные задачи. Airflow и Kubeflow у Домклика разделяют batch-процессы и обучение. Prometheus и Grafana отвечают за сбор и показ метрик.

Это не инструкция устанавливать каждый продукт одновременно. Два инструмента с одинаковой ролью без подтверждённого разделения не добавляем. При отсутствии доказательств выбираем минимальный учебный пример и явно маркируем его.

SQL Server у «Золотого яблока» имеет Hold в радаре, но DBA-вакансия описывает его сопровождение. Противоречия нет: статус выбора для новых проектов и эксплуатация существующих систем — разные факты. PostgreSQL Trial также не означает ни отсутствия SQL, ни универсального применения PostgreSQL.

## Что не принимаем за доказательство

SEO-статьи о собеседованиях без ссылок, списки всех продуктов подрядчика, совпадения в общей выдаче вакансий, обучение студентов и планы внедрения не подтверждают текущую эксплуатацию. Вакансии и свидетельства сотрудников полезны, но имеют отдельный статус. Где первичный корпоративный материал недоступен, сохранённый текст вакансии обозначен как таковой.

Точные данные и ограничения каждого инструмента находятся в `catalog.js`; правило минимального предполагаемого ML-сценария — в `engine.js`.
