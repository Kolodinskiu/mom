function showData() {
    const date = new Date();
  
    setTime(date);
  
    // В 12 ночи дату нужно будет обновить. Как это сделать? Решение — поместить вызов функции setDate() внутрь наших часов — функции showData(). Благодаря рекурсивному setTimeout функция showData() обновляется каждую секунду, соответственно, каждую секунду будет обновляться и setDate()
    setDate(date);
  
    // Обновление приветствия происходит так же, как обновление даты - вызов функции setGreeting() помещаем внутрь функции showData()
    setGreeting(date);
  
    // рекурсивный setTimeout позволяет задать задержку при выполнении более точно, чем setInterval
    setTimeout(showData, ONE_SECOND_IN_MILLISECONDS);
  }
  
  /* ************ */
  showData();