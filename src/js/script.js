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
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(settings.templateOf.book).innerHTML),
  };

  function render() {
    for(let book of dataSource.books){

      const generatedHTML = templates.books(book);

      const booksList = utils.createDOMFromHTML(generatedHTML);

      const booksListContainer = document.querySelector(settings.containterOf.bookList);
    
      booksListContainer.appendChild(booksList);
    }
  }

  render();
}