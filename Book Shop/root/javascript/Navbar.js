// wait until DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  //select burgericon
  const burgerIcon = document.querySelector('.burger-icon');
  //select naviagation 
  const navigation = document.querySelector('.navigation');

  //add eventlistner to burger icon
  burgerIcon.addEventListener('click', function() {
    navigation.classList.toggle('active'); //active on click
  });
});

