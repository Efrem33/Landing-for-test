require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import  tabs  from './modules/tabs';
import  modal  from './modules/modal';
import  calculator  from './modules/calculator';
import  cardsClasses  from './modules/cardsClasses';
import  forms  from './modules/forms';
import  slider  from './modules/slider';
import  timer  from './modules/timer';
import { showModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout( () => showModal('.modal', modalTimerId), 50000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerId);
  calculator();
  cardsClasses();
  forms('form', modalTimerId);
  slider({
    contaiter: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
  timer('.timer', "2023-05-20");
});

