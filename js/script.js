/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => { // навешивается оброботчик событий 
        event.preventDefault();

        let newFilm = addInput.value; // проверят значение инпута 
        const favorite = checkbox.checked; // галочка

        if (newFilm) { // здесь сейчас значение true 

            if (newFilm.length > 21) {   // условие количество введенных символов
                newFilm = `${newFilm.substring(0, 22)}...`;  // интерполяция 
            }

            if (favorite) { // значение true 
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm); // добавляем новый элекмент в наше свойство обьекта 
            sortArr(movieDB.movies); // сортируем по алфавиту 
    
            createMovieList(movieDB.movies, movieList); // обновляем 
        }

        event.target.reset(); // удаляем значение в строке ввода 

    });

    const deleteAdv = (arr) => { // создание функции которая удаляет рекламму 
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => { // функция в которую можно записывать различные изменения 
        genre.textContent = 'драма'; // обращаюсь к атрибуту изменяем его 

        poster.style.backgroundImage = 'url("img/bg.jpg")'; // обращаясь к атрибуду с помощью свойста встроеного в js style изменяем фон 
    };

    const sortArr = (arr) => { // создается функция сортировки 
        arr.sort();
    };

    function createMovieList(films, parent) { // функция которая добавляет новое значение свойства обьекта 
        parent.innerHTML = "";
        sortArr(films);
    
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => { // функия с помощью котороый на корзинку мы навесили обработчик события 
            // клик 
            btn.addEventListener('click', () => {
                btn.parentElement.remove(); // удаление элемнта 
                movieDB.movies.splice(i, 1); //метод splice() позволяет изменить содержимое массива за счёт удаления существующих элементов, и/или добавления новых элементов в массив

                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(adv); // вызов функции которая удаляет все содеримое рекламы справа 
    makeChanges(); // выхов ффункции где запиманы различные изменения 
    createMovieList(movieDB.movies, movieList); // функция которая добавляет новое значение свойства обьекта 

});