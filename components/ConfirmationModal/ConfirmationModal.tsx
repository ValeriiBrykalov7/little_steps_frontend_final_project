//app/components/Sidebar/ConfirmationModal.tsx

/* Універсальний компонент, реалізований як модальне вікно, 
що приймає пропси для налаштування контенту та його поведінки.

Пропси:
title (string): Текст запитання (напр., "Ви впевнені, що хочете вийти?").
confirmButtonText (string): Текст на кнопці підтвердження (напр., "Так", "Видалити").
cancelButtonText (string): Текст на кнопці скасування (напр., "Ні", "Скасувати").
onConfirm (function): Колбек-функція, що виконується при кліку на кнопку підтвердження.
onCancel (function): Колбек-функція, що виконується при кліку на кнопку скасування.

Взаємодія з користувачем:
Клік по кнопці підтвердження викликає onConfirm.
Клік по кнопці скасування, бекдропу або натискання Escape закриває модальне вікно. */

type Props = {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};
