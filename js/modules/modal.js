
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

export default modal;
export {showModal};
export {closeModal};