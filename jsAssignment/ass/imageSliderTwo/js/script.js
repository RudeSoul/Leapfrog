var carouselContainer = document.getElementById('main');
var slider = document.getElementById('slider');

var sliderSize = document.querySelectorAll('#slider img');
var carouselSlide = document.querySelector('.carousel-image-wrapper')

var imageDetails = document.getElementsByTagName('img');

var dots = document.getElementsByClassName("dot");

var a = 0;

var valueOfDots = function (n) { 
  this.n = n;
  
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[this.n].className += " active";
  carouselSlide.style.transition = "transform 1s ease-in-out";
  carouselSlide.style.transform = 'translateX(' + (-400 * n) + 'px)';

};



var sliderStyle = function () {

  carouselContainer.style.width = '28%';
  carouselContainer.style.margin = 'auto';
  carouselContainer.style.border = '5px solid black';
  carouselContainer.style.marginTop = '10%';
  carouselContainer.style.position = 'relative';
  carouselContainer.style.overflow = 'hidden';

  slider.style.display = 'flex';
  slider.style.width = '100%';
  slider.style.height = '200px';

  prevBtn.style.position = 'absolute';
  prevBtn.style.top = '40%';
  prevBtn.style.zIndex = '10';
  prevBtn.style.left = '2%';
  prevBtn.style.fontSize = '20px';
  prevBtn.style.color = 'white';
  prevBtn.style.cursor = 'pointer';
  nextBtn.style.position = 'absolute';
  nextBtn.style.top = '40%';
  nextBtn.style.zIndex = '10';
  nextBtn.style.right = '2%';
  nextBtn.style.fontSize = '20px';
  nextBtn.style.color = 'white';
  nextBtn.style.cursor = 'pointer';

  nextBtn.addEventListener('mouseover', function () {
    nextBtn.style.color = 'black';
    nextBtn.style.border = '2px solid brown';
  });
  nextBtn.addEventListener('mouseout', function () {
    nextBtn.style.color = 'white';
    nextBtn.style.border = '0px solid brown';
  });
  prevBtn.addEventListener('mouseover', function () {
    prevBtn.style.color = 'black';
    prevBtn.style.border = '2px solid brown';
  });
  prevBtn.addEventListener('mouseout', function () {
    prevBtn.style.color = 'white';
    prevBtn.style.border = '0px solid brown';
  });

  return;

};

var navigationDots = function (counter) { 
  
  this.counter = counter; 
  // this.clickDot = clickDot;

  
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[this.counter].className += " active";
  
  console.log('here',this.counter);
  
  // carouselSlide.style.transform = 'translateX(' + (-400 * this.counter) + 'px)';

};

function Carousel() {

  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  
  var counter = 0;
  var size = sliderSize[0].clientWidth;
  var sizeOfSlide = 1;
  var slidingSpeed = 1;

  sliderStyle();

  nextBtn.addEventListener('click', function () {
    if (counter >= sliderSize.length-1 ) {
      counter = 0;
      sizeOfSlide = 0;
    }
    else
      counter++;
    
    setInterval(function () {
    if (sizeOfSlide <= size * counter) {
        slidingSpeed = 1;
      }
      else{
        return;
      }  
      sizeOfSlide = sizeOfSlide + slidingSpeed;
      carouselSlide.style.transform = 'translateX(' + (-sizeOfSlide) + 'px)';
      
    }, 5 * counter);

    navigationDots(counter);

  });

  prevBtn.addEventListener('click', function () {
    carouselSlide.style.transition = "transform 1s ease-in-out";

    navigationDots(counter);
    if (counter <= 0) {
      carouselSlide.style.transform = 'translateX(' + (-0) + 'px)';
      counter = sliderSize.length;
      
    }
    else {
      carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    counter--;
  });
  
  navigationDots(a);
  
  setTimeout(function () {
    if (counter >= sliderSize.length - 1) {
      counter = 0;
      sizeOfSlide = 0;
    }
    else
      counter++;

    setInterval(function () {
      if (sizeOfSlide <= size * counter) {
        slidingSpeed = 1;
      }
      else {
        return;
      }
      sizeOfSlide = sizeOfSlide + slidingSpeed;
      carouselSlide.style.transform = 'translateX(' + (-sizeOfSlide) + 'px)';

    }, 5 * counter);

    navigationDots(counter);
  },2000)
}

var anotherCarousel = new Carousel();                                                               
