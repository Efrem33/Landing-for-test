
window.addEventListener('DOMContentLoaded', () => {

  const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        calculator = require('./modules/calculator'),
        cardsClasses = require('./modules/cardsClasses'),
        forms = require('./modules/forms'),
        slider = require('./modules/slider'),
        timer = require('./modules/timer');

  tabs();
  modal();
  calculator();
  cardsClasses();
  forms();
  slider();
  timer();
});

