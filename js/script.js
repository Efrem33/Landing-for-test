"use strict";
//TABS
window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent () {
    tabsContent.forEach(item => {
      item.style.display = 'none'; 
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent (i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if(target && target.classList.contains('tabheader__item')){
      tabs.forEach((item, i) => {
        if(target == item){
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); 

  //Timer
  const dadline = "2023-02-05";

  function getTimeRemaining(endTime){
    const t = Date.parse(endTime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60 ),
          seconds = Math.floor((t / 1000) % 60 );

    return {
      "total": t,
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds
    };
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

  setClock('.timer', dadline);


  //Modal

  const modalOpenBtn = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal'); 


  function showModal() {
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  modalOpenBtn.forEach(item => {
    item.addEventListener('click', function(){
      showModal();
    });
  });

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener('click', (e) => {
    if(e.target === modal){
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.code === 'Escape'&& modal.style.display == 'block'){
      closeModal();
    }
  });

  //const modalTimerId = setTimeout(showModal, 6000);

  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
      showModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);

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

  new MenuCard(
    'img/tabs/vegy.jpg', 
    'vegy', 
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    6,
    '.menu .container'

  ).render();
    
  new MenuCard(
    'img/tabs/elite.jpg', 
    'elite', 
    'Меню “Премиум"', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    9,
    '.menu .container',
    'menu__item'
    ).render();
    
  new MenuCard(
    'img/tabs/post.jpg', 
    'post', 
    'Меню "Постное"', 
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    3,
    '.menu .container',
    'menu__item'
    ).render();

  //Forms

  const forms  = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка...',
    success: 'Cпасибо! Скоро мы с вами свяжемся.',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);
  
      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');
      const formData  = new FormData(form);
      const object = {};
      formData.forEach(function(value, key){
        object[key] = value;
      });
      const json = JSON.stringify(object);
      request.send(json);

      request.addEventListener('load', ()=>{
        if(request.status === 200){
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);

        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});

