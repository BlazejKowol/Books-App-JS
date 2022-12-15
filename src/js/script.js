/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const settings = {
    templateOf: {
      book: '#template-book',
    },
    containterOf: {
      bookList: '.books-list', 
      bookImage: '.book__image',
      bookId: 'data-id',
    },

    books: {
      image: '.books-list .book__image',
    },
    filters: '.filters',
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(settings.templateOf.book).innerHTML),
  };

  const classNames = {
    bookFavorite: 'favorite',
  };

  function render() {
    for(let book of dataSource.books){

      const generatedHTML = templates.books(book);

      const booksList = utils.createDOMFromHTML(generatedHTML);

      const booksListContainer = document.querySelector(settings.containterOf.bookList);
    
      booksListContainer.appendChild(booksList);
    }
  }

  const favoriteBooks = [];
  const filters = [];

  function initActions() {

    const books = document.querySelector(settings.containterOf.bookList);

    books.addEventListener('dblclick', function(event){
      event.preventDefault();
      const bookId = event.target.offsetParent.getAttribute(settings.containterOf.bookId);
      if(!favoriteBooks.includes(bookId)) {
        event.target.offsetParent.classList.add(classNames.bookFavorite);
        favoriteBooks.push(bookId);
      } else {
        event.target.offsetParent.classList.remove(classNames.bookFavorite);
        favoriteBooks.pop(bookId);
      }
    });

    const filtersSection = document.querySelector(settings.filters);

    filtersSection.addEventListener('click', function(event){
      if(event.target.tagName == 'INPUT' && 
         event.target.type == 'checkbox' && 
         event.target.name == 'filter'){
        console.log(event.target.value);
        if(event.target.checked == true) {
          filters.push(event.target.value);
        } else {
          filters.indexOf(event.target.value);
          filters.splice(event.target.value, 1);
        }
        console.log('filters', filters);
      }
      books.filterBooks();
    });
  }

  filterBooks() {
    for(const book of dataSource.books) {
      let shouldBeHidden = false;
      for(const filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookImage = document.querySelector('.book__Image[data-id="' + book.id + '"]');

      if(shouldBeHidden) {
        shouldBeHidden == true;
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
      console.log(bookImage);
    }
  }

  render();
  initActions();
}