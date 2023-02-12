function modal(){
  //Modal

  const modalOpenBtn = document.querySelectorAll('[data-modal]'),
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


  modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-close') == ''){
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.code === 'Escape'&& modal.style.display == 'block'){
      closeModal();
    }
  });

  const modalTimerId = setTimeout(showModal, 50000);

  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
      showModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal();