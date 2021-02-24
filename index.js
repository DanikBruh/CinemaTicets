// sessionStorage.user = JSON.stringify({name: "John"});

// // немного позже
// let user = JSON.parse( sessionStorage.user );
// alert( user.name ); // John


// Класс День Фильмов, содержащий в себе дату дня и массив всех фильмов на день
class CinemaDay {
  constructor(movies, date) {
    this.movies = movies;
    this.date = date;
  }
}
// Класс Фильм
class Movie {
  constructor(name, cover, rating, genres, age, duration, sessionTickets) {
    this.name = name;
    this.cover = cover;
    this.rating = rating;
    this.genres = genres;
    this.age = age;
    this.duration = duration;
    this.sessionTickets = sessionTickets;
  }
}
// Класс Сеанс, содержит цены билетов один сеанс
class Session {
  constructor(session, adult, child, student, vip, ) {
    this.session = session;
    this.adult = adult;
    this.child = child;
    this.student = student;
    this.vip = vip;
  }
}


var movies = new Array();
let sessions = [new Session('10:00', 1300, 800, 1000, 4000), new Session('12:00', 1400, 900, 1100, 4200), new Session('14:00', 1500, 1000, 1200, 5000),
new Session('16:00', 1500, 1000, 1200, 5000), new Session('18:00', 1500, 1000, 1200, 5000), new Session('20:00', 1600, 1100, 1300, 5000)];
movies.push(new Movie('Начало', 'https://upload.wikimedia.org/wikipedia/ru/b/bc/Poster_Inception_film_2010.jpg', 5, ['фантастика', 'боевик', 'триллер'], 12, 148, sessions));
movies.push(new Movie('Отель «Гранд Будапешт»', 'https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/ea08a062-81a9-46e9-a475-e49388216eea/300x450', 5, ['комедия', 'приключения', 'детектив', 'криминал'], 16, 100, sessions));
movies.push(new Movie('Однажды в… Голливуде', 'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/70580cf5-3287-42d6-8a76-2c715e2f6172/300x450', 4, ['комедия', 'драма'], 18, 161, sessions));
movies.push(new Movie('Первому игроку приготовиться', 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/5ae82f4b-fd6a-46b5-b5ba-897106eb1eae/300x450', 4, ['фантастика', 'боевик', 'приключения'], 12, 140, sessions));
movies.push(new Movie('Аватар', 'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4adf61aa-3cb7-4381-9245-523971e5b4c8/300x450', 4, ['фантастика', 'боевик', 'драма', 'приключения'], 12, 162, sessions));
movies.push(new Movie('Властелин колец: Братство кольца', 'https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/1d36b3f8-3379-4801-9606-c330eed60a01/300x450', 5, ['фэнтэзи', 'приключения', 'драма'], 12, 178, sessions));
var cinemaWeek = [];
cinemaWeek.push(new CinemaDay(movies, new Date(2021, 1, 24)));
cinemaWeek.push(new CinemaDay(movies, new Date(2021, 1, 25)));
cinemaWeek.push(new CinemaDay(movies, new Date(2021, 1, 26)));


let filmsList = document.getElementsByClassName('films-list')[0];
// Получение модального окна
let modal = document.getElementById("myModal");
let modalTable = document.querySelector(".modal-body table tbody");
// Получение <span> элемента для закрытия модального окна
let span = document.getElementsByClassName("close")[0];

// После загрузки страницы
window.onload = function () {
  // Очистка памяти
  localStorage.clear();
  // Заполнение localStorage данными
  for (i = 0; i < cinemaWeek.length; i++) {
    localStorage.setItem(`cinemaDay${i + 1}`, JSON.stringify(cinemaWeek[i]));
  }
}

// Добавление фильмов объекта cinemaDay с localStorage к узлу node
function addMoviesToThePage(node, cinemaDay) {
  for (let i = 0; i < cinemaDay.movies.length; i++) {
    let detail = document.createElement('details'); // <details>
    let summary = document.createElement('summary'); // <summary>
    summary.innerHTML = cinemaDay.movies[i].name;

    let div_film_inner = document.createElement('div'); // <div class="film-inner">
    div_film_inner.className = 'film-inner';

    let film_cover = document.createElement('img'); // <img class="film-cover">
    film_cover.className = 'film-cover';
    film_cover.src = cinemaDay.movies[i].cover;


    let div_film_info = document.createElement('div'); // <div class="film-info">
    div_film_info.className = 'film-info';

    let p_rating = document.createElement('p'); // <p>Рэйтинг:
    p_rating.innerHTML = 'Рэйтинг: ';
    for (j = 0; j < 5; j++) {
      let span_rating = document.createElement('span');
      span_rating.className = 'fa fa-star';
      if (j < cinemaDay.movies[i].rating) span_rating.classList.add('checked');
      p_rating.appendChild(span_rating);
    }
    div_film_info.appendChild(p_rating);

    let p_genres = document.createElement('p'); // <p>Жанр:
    p_genres.innerHTML = `Жанр: ${cinemaDay.movies[i].genres}`;

    let p_age = document.createElement('p'); // <p>Возраст:
    p_age.innerHTML = `Возраст: ${cinemaDay.movies[i].age}+`;

    let p_duration = document.createElement('p'); // <p>Длительность:
    let film_duration = cinemaDay.movies[i].duration;

    p_duration.innerHTML = `Длительность: ${film_duration} мин. / 0${Math.floor(film_duration / 60)}:${Math.floor(film_duration % 60)} ч.`;
    let input_buy_ticket = document.createElement('input'); // <input type="submit" class="buy-ticket-btn">
    input_buy_ticket.type = 'submit';
    input_buy_ticket.value = 'Показать сеансы';
    input_buy_ticket.className = 'buy-ticket-btn';

    div_film_info.appendChild(p_genres);
    div_film_info.appendChild(p_age);
    div_film_info.appendChild(p_duration);
    div_film_info.appendChild(input_buy_ticket);
    div_film_inner.appendChild(film_cover);
    div_film_inner.appendChild(div_film_info);
    detail.appendChild(summary);
    detail.appendChild(div_film_inner);
    node.appendChild(detail);
  }
}

// Показывает все данные, содержащиеся в localStorage
function showLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    alert(`${key}: ${localStorage.getItem(key)}`);
  }
}

// Добавляет сеансы выбранного фильма в модальное окно
function AddSessions(modalTable, sessions) {
  for (columns = 0; columns < sessions.length; columns++) {
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerText = sessions[columns].session;
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerText = sessions[columns].adult + ' ₸';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerText = sessions[columns].child + ' ₸';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerText = sessions[columns].student + ' ₸';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerText = sessions[columns].student + ' ₸';
    tr.appendChild(th);
    th = document.createElement('th');
    let but = document.createElement('button');
    but.className = 'buy-ticket-btn';
    but.innerHTML = 'Купить билет';
    th.appendChild(but);
    tr.appendChild(th);
    modalTable.appendChild(tr);
  }
}

// Удаляет все дочерние элементы узла кроме первого
function deleteTableNodes(node) {
  if (node) {
    while (node.childElementCount > 1) {
      node.removeChild(node.lastChild);
    }
  }
}

// Удаляет все дочерние элементы узла
function deleteChildNotes(node){
  if (node) {
    while (node.childElementCount) {
      node.removeChild(node.lastChild);
    }
  }
}

// Добавление события для кнопок для отображение сеансов фильма
function addButtonEvents(modal, modalTable, btns, cinemaDay) {
  for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      let node = document.querySelector('table tbody');
      deleteTableNodes(node);
      AddSessions(modalTable, cinemaDay.movies[i].sessionTickets);
      modal.style.display = "block";
    }
  }
}

// Закрытие модального окна при нажатии на крестик
span.onclick = function () {
  modal.style.display = "none";
}

// Закрытие модального окна при нажатии на любое другое место экрана
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Смена темы страницы в черную
blackButton.onclick = function () {
  document.getElementsByTagName('body')[0].style.backgroundColor = 'black';
  document.getElementsByTagName('body')[0].style.color = 'white';
  logo_img.src = "https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kif+IqxJInhnNwXs1M3EMoAJtliEugPZt9f09";
  document.getElementById('filters').style.backgroundColor = 'rgb(66,66,66)';
  document.getElementById('filters').style.borderColor = 'red';
  modalTable.style.color = 'black';
}
// Смена темы страницы в белую
whiteButton.onclick = function () {
  document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
  document.getElementsByTagName('body')[0].style.color = 'black';
  logo_img.src = "https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kif+IqxFInRvIwXs1M3EMoAJtliEugPZt...fg+ ";
  document.getElementById('filters').style.backgroundColor = 'lightgray';
  document.getElementById('filters').style.borderColor = 'black';
  modalTable.style.color = 'black';
}

let searchButton = document.getElementById('filters-button');
let searching_date = document.getElementById('date');
let date_header = document.getElementById('films-on-date');

// При нажатии на кнопку "Искать". Ищет день с кино на заданную дату
searchButton.onclick = function () {
  let date = new Date(searching_date.value);
  for (i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let cinemaDay = JSON.parse(localStorage.getItem(key));
    let ddate = new Date(cinemaDay.date);

    // Выводит День Фильмов на заданную дату
    if (ddate.getFullYear() == date.getFullYear() && ddate.getMonth() == date.getMonth() && ddate.getDate() == date.getDate()) {
      // Удаление всех фильмов на странице, если они есть
      deleteChildNotes(filmsList);
      date_header.innerHTML = `Фильмы на дату: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

      // Добавление фильмов с localStorage
      addMoviesToThePage(filmsList, cinemaDay);
      // Получение всех кнопок, для отображения сеансов
      let btns = document.querySelectorAll("input.buy-ticket-btn");
      // Добавление событий для кнопок для отображение сеансов фильма
      addButtonEvents(modal, modalTable, btns, cinemaDay);
    }
  }
}