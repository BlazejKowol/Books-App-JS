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

  function initActions() {
    
    const books = document.querySelectorAll(settings.books.image);
    
    for(let book of books){
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = book.getAttribute(settings.containterOf.bookId);
        if(!favoriteBooks.includes(bookId)){
          book.classList.add(classNames.bookFavorite);
          favoriteBooks.push(bookId);
        } else {
          book.classList.remove(classNames.bookFavorite);
          favoriteBooks.pop(bookId);
        }
      });
    }
  }

  render();
  initActions();
}