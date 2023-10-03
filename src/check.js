function showSelfCheck() {
  console.log(
    "Стартовая страница приложения (вёрстка адаптивная - проверяется на ширине от 1920рх до 360рх) + 20"
  );
  console.log(
    "Страница викторины (вёрстка адаптивная - проверяется на ширине от 1920рх до 360рх) +30"
  );
  console.log(
    "Страница с результатами (вёрстка адаптивная - проверяется на ширине от 1920рх до 360рх) +10"
  );
  console.log("\n");
  console.log("Аудиоплеер:");
  console.log("стандартный HTML5 +10");
  console.log("\n");

  console.log("Верхняя панель страницы викторины:");

  console.log("правильное отображение счета игры +10");
  console.log("текущий вопрос выделяется стилем +10");

  console.log("\n");
  console.log("Блок с вопросом:");

  console.log(
    "подстановка дефолтного изображения и замена названия птицы на символы (***), пока игрок не выберет правильный ответ +10"
  );
  console.log(
    "при выборе правильного ответа в блоке с вопросом отображается изображение и название загаданной птицы +10"
  );
  console.log("\n");
  console.log("Блок с вариантами ответов (названия птиц):");

  console.log(
    "цветовая индикация правильного/неправильного ответа в виде индикаторов разного цвета рядом с названием птицы: +10"
  );
  console.log("\n");
  console.log("звуковая индикация правильного/неправильного ответа:");
  console.log(
    "при выборе правильного или неправильного ответа издаются разные звуковые сигналы: +10"
  );
  console.log(
    "при выборе неправильного ответа проигрывание аудиоплеера не должно останавливаться: +10"
  );
  console.log(
    "при выборе правильно ответа проигрывание аудиоплеера должно остановиться: +10"
  );
  console.log("\n");
  console.log(
    "при клике по названию птицы в блоке с описанием птицы отображается информацию о ней: +10"
  );
  console.log(
    "если правильный ответ уже дан, возможность просматривать описания птиц при клике по вариантам ответов остаётся, цвет индикаторов при этом не изменяется: +10"
  );

  console.log("\n");
  console.log("Блок с описанием птицы:");

  console.log(
    "пока игрок не кликнул по названию птицы из списка, в блоке выводится короткий текст с предложением послушать плеер и выбрать название птицы, чей голос прозвучал +10"
  );

  console.log(
    "при клике по названию птицы из списка, в блоке с описанием птицы появляется актуальная информация о ней +20"
  );

  console.log("Информация о птице включает:");

  console.log("изображение");

  console.log("название (на русском и на латыни)");

  console.log("аудиоплеер с записью голоса");

  console.log("дополнительное описание птицы.");
  console.log("\n");
  console.log("Кнопка перехода к следующему вопросу:");

  console.log(
    "пока не выбран правильный ответ, кнопка не активна, нет возможности перейти к следующему заданию. Активное и неактивное состояние кнопки визуально отличаются, например, активная кнопка имеет зеленый, не активная - серый цвет +10"
  );
  console.log(
    "после правильного ответа на последний вопрос игрок переходит к странице с результатами викторины +10"
  );
  console.log(
    "страница с результатами содержит количество набранных баллов и кнопку с предложением сыграть ещё раз (или уведомление об окончании игры, если набрано максимальное количество баллов) +10"
  );
  console.log("\n");
  console.log("Результат: 230");
}

export default showSelfCheck;
