document.addEventListener('DOMContentLoaded', function () {
  const whatsappNumber = '5521964305535';
  const whatsappMessage = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos da MARF.');
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const waButtons = document.querySelectorAll('[data-wa]');
  waButtons.forEach(button => {
    button.setAttribute('href', whatsappURL);
    button.setAttribute('target', '_blank');
    button.setAttribute('rel', 'noopener');
  });

  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.setAttribute('href', whatsappURL);
  }
});
