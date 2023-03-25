/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
  //Calcuator
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio ;

  if(localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'femail';
    localStorage.setItem('sex', 'femail');
  }
  
  if(localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activCass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activCass);

      if(elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activCass);
      }

      if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activCass);
      }
    });
  }


  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    if(!sex || !height || !weight || !age || !ratio){
      result.textContent = '________';
      return;
    }

    if(sex === 'femail'){
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  function getStaticInformation(selector, activCass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        const target = e.target;
  
        if(target.getAttribute('data-ratio')) {
          ratio = +target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +target.getAttribute('data-ratio'));
        } else {
          sex = target.getAttribute('id');
          localStorage.setItem('sex', target.getAttribute('id'));
        }
  
        elements.forEach(elem => {
          elem.classList.remove(activCass);
        });
  
        target.classList.add(activCass);
        
        calcTotal();
      }); 
    });

  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDinamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if(input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }
      
      switch(input.getAttribute('id')) {
        case 'height': 
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
    
  }

  getDinamicInformation('#age');
  getDinamicInformation('#weight');
  getDinamicInformation('#height');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cardsClasses.js":
/*!************************************!*\
  !*** ./js/modules/cardsClasses.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_sefrvices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/sefrvices */ "./js/services/sefrvices.js");


function cardsClasses(){
  //Классы для карточек
  class MenuCard {
    constructor (src, alt, title, descr, price, parentSelector, ...classes){
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descrpition = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 70;
      this.changeToRubl();
    }

    changeToRubl() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if(this.classes.length === 0){
        this.element = 'menu__item';
        element.classList.add(this.element);

      }else{
        this.classes.forEach(className => element.classList.add(className));

      }
      
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descrpition}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  (0,_services_sefrvices__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  // axios.get('http://localhost:3000/menu')
  //   .then( data => {
  //     data.data.forEach(({img, altimg, title, descr, price}) => {
  //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //     });
  //   });
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cardsClasses);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_sefrvices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/sefrvices */ "./js/services/sefrvices.js");



function forms (formSelector, modalTimerId){
   //Forms

   const forms  = document.querySelectorAll(formSelector);

   const message = {
     loading: 'img/form/spinner.svg',
     success: 'Cпасибо! Скоро мы с вами свяжемся.',
     failure: 'Что-то пошло не так...',
   };
   
   forms.forEach(item => {
     bindPostData(item);
   });
 
   function bindPostData(form){
     form.addEventListener('submit', (e) => {
       e.preventDefault();
       const statusMessage = document.createElement("img");
       statusMessage.src = message.loading;
       statusMessage.style.cssText = `
         display: block;
         margin: 0 auto;
       `;
       form.insertAdjacentElement('afterend', statusMessage);
       
       const formData  = new FormData(form);
 
       const json = JSON.stringify(Object.fromEntries(formData.entries()));
 
       (0,_services_sefrvices__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
       .then(data => {
         console.log(data);
         showThanksModal(message.success);
         statusMessage.remove();
       }).catch(() => {
         showThanksModal(message.failure);
       }).finally(() => {
         form.reset();
       });
     });
   }
 
   function showThanksModal(message) {
     const prevModalDialog = document.querySelector('.modal__dialog');
 
     prevModalDialog.style.display = 'none';
     document.body.style.overflow = '';
     (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);
 
     const thanksModal = document.createElement('div');
     thanksModal.classList.add('modal__dialog');
     thanksModal.innerHTML = `
       <div class="modal__content">
         <div class="modal__close" data-close>x</div>
         <div class="modal__title">${message}</div>
       </div>
     `;
 
     document.querySelector('.modal').append(thanksModal);
     setTimeout(() => {
       thanksModal.remove();
       prevModalDialog.style.display = "block";
       document.body.style.overflow = 'hidden';
       (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
     }, 4000);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });

function showModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "block";
  document.body.style.overflow = 'hidden';
  console.log(modalSelector);

  if(modalTimerId){
    clearInterval(modalSelector);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId){

  const modalOpenBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector); 

  modalOpenBtn.forEach(item => {
    item.addEventListener('click', ()=>showModal(modalSelector, modalTimerId));
  });


  modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-close') == ''){
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.code === 'Escape'&& modal.style.display == 'block'){
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
      showModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({

  contaiter, 
  slide, 
  nextArrow, 
  prevArrow, 
  totalCounter, 
  currentCounter, 
  wrapper, 
  field

}) {
  
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(contaiter),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if(slides.length < 10){
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  }else{
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];

  indicators.classList.add('carusel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if(i == 0){
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function setActivDots(arr) {
    arr.forEach(dot => dot.style.opacity = '.5');
    arr[slideIndex - 1].style.opacity = 1;
  }

  function deleteLeters(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    if(offset == deleteLeters(width) * (slides.length - 1)){
      offset = 0;
    } else {
      offset += deleteLeters(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length){
      slideIndex = 1;
    } else {
      slideIndex++; 
    }
    
    if(slides.length < 10){
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    } 

    setActivDots(dots);
  });

  prev.addEventListener('click', () => {
    if(offset == 0){
      offset = deleteLeters(width) * (slides.length - 1);
    } else {
      offset -= deleteLeters(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    
    if(slideIndex == 1){
      slideIndex = slides.length;
    } else {
      slideIndex--; 
    }
        
    if(slides.length < 10){
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    } 
    
    setActivDots(dots);
  });

  dots.forEach(dot  => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteLeters(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      
      
      if(slides.length < 10){
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      } 

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsCntentSelector, tabsParentSelector, activeClass) {
  //TABS
  const tabs = document.querySelectorAll(tabsSelector),
  tabsContent = document.querySelectorAll(tabsCntentSelector),
  tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent () {
    tabsContent.forEach(item => {
    item.style.display = 'none'; 
    });

    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent (i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
  const target = e.target;

    if(target && target.classList.contains(tabsSelector.slice(1))){
      tabs.forEach((item, i) => {
        if(target == item){
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, dadline){

  function getTimeRemaining(endTime){
    const t = Date.parse(endTime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60 ),
          seconds = Math.floor((t / 1000) % 60 );

    if(t <= 0){
      return {
        "total": 0,
        "days": 0,
        "hours": 0,
        "minutes": 0,
        "seconds": 0
      };
    } else {
      return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
      };
    }

  }

  function getZero(num){
    if(num >= 0 && num < 10 ){
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endTime){
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds"),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock(){
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if(t.total <= 0){
        clearInterval(timeInterval);
      }

    }
  }

  setClock(id, dadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/sefrvices.js":
/*!**********************************!*\
  !*** ./js/services/sefrvices.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json();
};


const getResource = async (url) => {
  const res = await fetch(url);

  if(!res.ok){
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cardsClasses__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cardsClasses */ "./js/modules/cardsClasses.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout( () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimerId), 50000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cardsClasses__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    contaiter: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', "2023-05-20");
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map