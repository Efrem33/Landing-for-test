
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

  tabs();
  modal('[data-modal]', '.modal', modalTimerId);
  calculator();
  cardsClasses();
  forms();
  slider();
  timer();
});

