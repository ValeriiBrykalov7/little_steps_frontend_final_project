# 🌱 Little Steps

## 📝 Про проєкт

Little Steps — це веб-застосунок для підтримки вагітних жінок, який допомагає
відстежувати перебіг вагітності, щоденні завдання та особисті записи. Проєкт
реалізований у рамках навчання Fullstack Development та працює у зв’язці з
окремим backend API. Користувач може отримувати персоналізовану інформацію,
вести щоденник, відстежувати свій стан і керувати задачами через зручний
інтерфейс.

---

📝 Функціональність 🔐 <br><br>

**Авторизація та реєстрація** <br>
• створення акаунту <br>
• вхід у систему <br>
• онбординг користувача <br><br>

**🏠 Dashboard (Мій день)** <br>
• персоналізоване привітання <br>
• інформація про термін вагітності <br>
• поради для мами <br>
• список завдань <br>
• блок самопочуття <br><br>

**🧭 Подорож вагітності (Journey)** <br>
• інтерактивний вибір тижня <br>
• інформація про розвиток дитини <br>
• рекомендації для мами <br><br>

**📖 Щоденник (Diary)** <br>
• створення записів <br>
• редагування та видалення <br>
• перегляд історії <br><br>

**👤 Профіль користувача** <br>
• редагування даних <br>
• завантаження аватара <br><br>

**✅ Робота із завданнями** <br>
• створення, редагування, видалення <br>
• відмітка виконання <br><br>

**🔒 Захищені маршрути** <br>
• доступ до функціоналу тільки для авторизованих користувачів <br><br>

**💬 Повідомлення та обробка помилок** <br>
• toast-повідомлення <br>
• валідація форм <br>

---

⚙️ Реалізація згідно ТЗ <br><br>

• ✅ Next.js 15 (App Router) <br>
• ✅ Публічні та приватні маршрути <br>
• ✅ Захист сторінок на рівні компонентів <br>
• ✅ CSS Modules (стилізація) <br>
• ✅ State management — Zustand <br>
• ✅ Data fetching — TanStack Query <br>
• ✅ Форми — Formik + Yup <br>
• ✅ Loader під час запитів <br>
• ✅ Обробка помилок (toast + UI повідомлення) <br>
• ✅ Адаптивність (mobile-first) <br>
---

🛠️ Технології та інструменти <br><br>

🌐 **Frontend** <br>
• ⚛️ React / Next.js — побудова інтерфейсу <br>
• 🎨 CSS / Styled Components / Modules — стилізація <br>
• ⚡ JavaScript (ES6+) — логіка застосунку <br><br>

⚙️ **Backend** <br>
• 🔗 REST API (окремий репозиторій) <br>
👉 Backend: 🔗 https://github.com/ValeriiBrykalov7/little_steps_final_project <br><br>

📚 **Бібліотеки** <br>
• 🌐 Axios — HTTP-запити <br>
• 🔔 React Hot Toast / інші нотифікації — повідомлення <br>
• 📊 State management (Context / Zustand / Redux) — керування станом <br>
• 🧭 React Router / Next Router — маршрутизація <br>

---

📱 Адаптивність та доступність <br><br>

📐 **Адаптивність** <br>
Інтерфейс оптимізований під різні пристрої: <br>
• 📏 Mobile: від 320px <br>
• 📏 Tablet: від 768px <br>
• 📏 Desktop: від 1440px <br><br>

♿ **Доступність** <br>
• семантична HTML-структура <br>
• базова підтримка screen readers <br>
• доступні інтерактивні елементи <br>
---

👩‍💻 **Команда** <br><br>

🦸‍♂️ **Team Lead** — Valerii Brykalov <br>
📋 **Scrum Master** — Tetiana Kolomeichuk <br><br>

💻 **Frontend Developers** <br>
• Valerii Brykalov <br>
• Tetiana Kolomeichuk <br>
• Ivanna Shchokalo <br>
• Hanna Muzychuk <br>
• Nebelskiy Max <br>
• Vitalii <br>
• Andriy Baranovich <br>
• Bogdan Ostapenko <br>
• Alinka <br>
• Andrii Storozhenko <br>
• Nazar Ismailov <br>
• Anna Anishchenko <br>
• Dima <br>
• Oleksandra Hotsyn <br>

**\*\*\*\***\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\***\*\*\*\*** ⚙️ Environment
Variables Створіть файл .env.local: NEXT_PUBLIC_API_URL=your_backend_url

---

📁 Структура проєкту src/ ├── app/ ├── components/ ├── hooks/ ├── lib/
├──services/

---

🚀 Як запустити проєкт

1. Встановіть Node.js (LTS версію)
2. Клонувати репозиторій: git clone
   https://github.com/ValeriiBrykalov7/little_steps_frontend_final_project
3. Перейдіть у папку проєкту: cd little_steps_frontend_final_project
4. Встановіть залежності: npm install
5. Запустіть проєкт: npm run dev
6. Відкрийте у браузері: http://localhost:3000

---

🔗 Вихідні матеріали 🎨 Макет (Figma) —
https://www.figma.com/design/rzAjaFuJOnFWqpsqBBcpAD/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0?node-id=5999-10563&p=f&t=VarqyxPWYX9F750x-0
⚙️ Backend API — https://github.com/ValeriiBrykalov7/little_steps_final_project

---

📄 Ліцензія MIT — вільне використання зі збереженням авторського права

---

⚠️ Примітка Для повноцінної роботи необхідно запустити backend частину або
використати задеплоєний API.
