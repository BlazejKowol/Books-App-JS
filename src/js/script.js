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
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = ratingBgc * 10;

      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;

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
      filterBooks();
    });
  }

  function filterBooks() {
    for(const book of dataSource.books) {
      let shouldBeHidden = false;
      const bookImage = document.querySelector('.book__Image[data-id="' + book.id + '"]');
      for(const filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
    
      if(shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
      console.log(bookImage);
    }
  }

  function determineRatingBgc(rating) {
    let ratingBgc = '';
    if(rating < 6) {
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return ratingBgc;
  }

  determineRatingBgc();
  render();
  initActions();
  filterBooks();
}