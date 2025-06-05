
Вітаю!
Мене зовуть Олександр і я з задоволенням презентую вам свій перший пет проект, який повноцінно задеплоєний на VPS по доменному імені inventory.in.ua з працюючими SSL сертифікатами.
Суть проекта - демонстраційний веб додаток, призначений для інвентарізації приходів товару на склад, з потенційною можливістю додавати, редактувати та видаляти товари з бази даних. (ці функції поки що не реалізовані в проекті, але на їх реалізацію піде не багато часу)
Додаток також дозовляє продивлятися списки замовлень та товарів, відфільтровувати товари по типу а також відслідковувати які товари належать до того чи іншого замовлення.
На даному етапі в додатку реалізована імітація видалення товарів чи замовлень, шляхом демонстрації спливаючих повідомлень про видалення обʼєкта.
Це зроблено для того, щоб демонстраційна база даних не була видалена під час тестувань.
Додаток реалізований на англійській мові (при бажанні можливо реалізувати українську версію)
Структура додатку - 4 сторінки (головна, сторінка списку замовлень, сторінка груп та сторінка товарів)
На сторінці груп, замовлення та товари скомпоновані по принципу їх належності один одному.

В лівому вертикальному участку сайта розміщене меню навігації з посиланнями на сторінки додатку.
У верхньому сайдбарі - логотип та лічильник Web socket з відображенням поточної дати та часу.
Додаток написаний та задеплоєний з використанням таких технологій як React, Redux, JS, HTML, CSS, Bootstrap, Node.js, SQL, Docker, Nginx, Certbot, Websocket.

Покрокова інструкція по розгортанню цього проекту на вашому VPS з використанням Docker та DockerHub:

1. Склонуйте цей репозиторій до себе на локальний ПК
2. Скачайте також програму Docker desktop та запустіть її
3. Зареєструйте доменне імʼя та арендуйте VPS, на якому плануєте розмістити цей проект
4. На VPS встановіть операційну систему (наприклад ubuntu), та програму Docker
5. Створіть два образи фронтенд та бекенд на своєму локальному ПК, та розмістіть їх на Docker Hub, ось що для цього потрібно зробити:
   - Для цього вам знадобиться зареєструвати свій акаунт на докер хабі
   - у файлах docker-compose.prod.yml та docker-compose.prod.vps.yml зробіть заміну у всіх місцях де є inventory.in.ua на назву свого домену. Також таку ж заміну зробіть у файлі .env, та бажано перевірити по всьому проекту згадування старого домену та замінити його на ваш новий.
   - у файлах docker-compose.prod.yml та docker-compose.prod.vps.yml в сервісі certbot в рядку - DEFAULT_EMAIL=(вкажіть свою робочу електронну пошту). А в сервісах frontend та backend впишіть назву своїх образів, які ви будете створювати. При чому пишіть їх в такому форматі: image: (ваш логін на докерхабі)/inventory-frontend:1.0.0 (числа потрібні для визначення конкретної версії образу, який вам потрібно зібрати в контейнер на своєму VPS)
   - у файлі .env можете замінити значення записів DB_PASSWORD=(своє значення)DB_ROOT_PASSWORD=(своє значення)
   - відкрийте термінал (бажано в програмі VS Code) та перейдіть в ньому у корінь проекту, де лежить файл docker-compose.prod.yml (програма Docker має бути запущена на вашому ПК)
     Виконайте команду в терміналі: docker login (авторизація у вашому докерхабі)
     Виконайте команду в терміналі: docker-compose -f docker-compose.prod.yml build backend frontend (створяться образи бекенду та фронтенду)
     Коли образи будуть готові, відправте їх на ваш докерхаб цими командами:
     docker push (ваш логін на докерхабі)/inventory-backend:1.0.0 та docker push (ваш логін на докерхабі)/inventory-frontend:1.0.0 (версії образів підставляйте ті, що відповідають вашій ситуації) Після цього змонтовані образи будуть розміщені на докерхабі та будуть доступні для подальшого використання на вашому VPS
6. Подальші кроки по розгортанню на стороні VPS:
   - зайдіть через термінал на свій VPS по SSH протоколу командою ssh root@(ip vps)
   - переконайтеся що ваш домен привʼязаний до айпі вашого VPS (це робиться в сервісі реєстрації доменів)
   - в терміналі в корені VPS вкажіть команду: sudo mkdir -p /opt/inventory (це створить папку проекту, inventory можете замінити на вашу назву)
   - скопіюйте в корінь папки проекту /opt/inventory файли .env та docker-compose-prod.vps.yml
   - файл docker-compose.prod.vps.yml перейменуйте на docker-compose.prod.yml
   - переконайтесь що у ваших файлах docker-compose.prod.yml та .env всюди прописаний ваш домен замість inventory.in.ua
   - перейдіть в корінь свого VPS та встановіть програму Docker (команда curl -fsSL https://get.docker.com | sudo sh)
   - після успішного встановлення Docker, запустіть створення контейнерів командами:
     cd /opt/inventory
     docker-compose -f docker-compose.prod.yml pull
     docker-compose -f docker-compose.prod.yml up -d --remove-orphans
   - після цих команд, перевірте статус запущених контейнерів:
     docker-compose -f docker-compose.prod.yml ps
     (має бути 5 контейнерів - база, сертбот, nginx, frontend, backend - у всіх має бути статус healthy або started)
7. Після запуску всіх контейнерів, перейдіть в свій браузер та введіть адресу свого доменного імені, сайт повинен запрацювати по вашому адресу.

У випадку якщо виникнуть якісь помилки, можете звернутися до одного з чатів ШІ (рекомендую Gemini), або пишіть мені на пошту: alexandr.melnichenko@gmail.com, але з допомогою ШІ вам вдасться вирішити проблему значно швидше.

Також в цьому репозиторії лежить файл inventory_project_db_schema.mwb - це файл схеми бази даних, який дозволяє проаналізувати структуру DB.

---

Hello! My name is Oleksandr and I am pleased to present you my first pet project, which is fully deployed on a VPS under the domain name inventory.in.ua with working SSL certificates.
The essence of the project is a demonstration web application designed to inventory goods arriving at the warehouse, with the potential ability to add, edit and delete goods from the database. (These functions are not yet implemented in the project, but their implementation will not take much time)
The application also allows you to view lists of orders and goods, filter goods by type and track which goods belong to a particular order.
At this stage, the application has implemented a simulation of deleting goods or orders by displaying pop-up messages about deleting an object.
This is done so that the demonstration database is not deleted during testing.
The application is implemented in English (if desired, it is possible to implement a Ukrainian version)
The structure of the application - 4 pages (main page, order list page, group page and product page)
On the group page, orders and products are arranged according to the principle of their belonging to each other.
In the left vertical section of the site there is a navigation menu with links to the application pages.
In the upper sidebar - a logo and a Web socket counter with the current date and time.
The application is written and deployed using technologies such as React, Redux, JS, HTML, CSS, Bootstrap, Node.js, SQL, Docker, Nginx, Certbot, Websocket.

Step-by-step instructions for deploying this project on your VPS using Docker and DockerHub:

1. Clone this repository to your local PC
2. Also download the Docker desktop program and run it
3. Register a domain name and rent a VPS on which you plan to host this project
4. Install an operating system (for example, Ubuntu) and the Docker program on the VPS
5. Create two frontend and backend images on your local PC, and host them on Docker Hub, here's what you need to do:

- To do this, you will need to register your account on Docker Hub
- in the docker-compose.prod.yml and docker-compose.prod.vps.yml files, replace all places where inventory.in.ua is with the name of your domain. Also, make the same replacement in the .env file, and it is advisable to check the entire project for mentions of the old domain and replace it with your new one.
- in the docker-compose.prod.yml and docker-compose.prod.vps.yml files in the certbot service in the line - DEFAULT_EMAIL=(specify your work email). And in the frontend and backend services, enter the name of your images that you will create. In this case, write them in this format: image: (your login on dockerhub)/inventory-frontend:1.0.0 (the numbers are needed to determine the specific version of the image that you need to compile into a container on your VPS)
- in the .env file, you can replace the values ​​of the entries DB_PASSWORD=(your value)DB_ROOT_PASSWORD=(your value)
- open a terminal (preferably in the VS Code program) and go to the root of the project, where the docker-compose.prod.yml file is located (the Docker program must be running on your PC)

1. Run the command in the terminal: docker login (authorize in your dockerhub)
2. Run the command in the terminal: docker-compose -f docker-compose.prod.yml build backend frontend (backend and frontend images will be created)
3. When the images are ready, send them to your dockerhub with these commands:
   docker push (your login on dockerhub)/inventory-backend:1.0.0 and docker push (your login on dockerhub)/inventory-frontend:1.0.0 (replace the image versions with those that correspond to your situation) After that, the mounted images will be placed on dockerhub and will be available for further use on your VPS
4. Further steps for deployment on the VPS side:

- log in to your VPS via the terminal via SSH with the command ssh root@(ip vps)
- make sure that your domain is bound to the IP of your VPS (this is done in the domain registration service)
- in the terminal in the root of the VPS, enter the command: sudo mkdir -p /opt/inventory (this will create a project folder, you can replace inventory with your name)
- copy the .env and docker-compose-prod.vps.yml files to the root of the project folder /opt/inventory
- rename the docker-compose.prod.vps.yml file to docker-compose.prod.yml
- make sure that your domain is written everywhere in your docker-compose.prod.yml and .env files instead of inventory.in.ua
- go to the root of your VPS and install the Docker program (command curl -fsSL https://get.docker.com | sudo sh)
- after successful installation of Docker, start creating containers with the commands:
  cd /opt/inventory
  docker-compose -f docker-compose.prod.yml pull
  docker-compose -f docker-compose.prod.yml up -d --remove-orphans
- after these commands, check the status of the running containers:
  docker-compose -f docker-compose.prod.yml ps
  (there should be 5 containers - base, certbot, nginx, frontend, backend - all should have the status healthy or started)

7. After launching all containers, go to your browser and enter the address of your domain name, the site should work at your address.

In case of any errors, you can contact one of the AI ​​chats (I recommend Gemini), or write to me by email: alexandr.melnichenko@gmail.com, but with the help of AI you will be able to solve the problem much faster.

Also in this repository is the file inventory_project_db_schema.mwb - this is a database schema file that allows you to analyze the DB structure.

