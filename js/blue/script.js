let score = 0
const skorElement = document.querySelector('#skor')
var board = document.getElementById('board');

function randomInt(min, max) {
  var random_number = Math.random() * (max - min) + min;
  return Math.floor(random_number);
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function openAll() {
  var kotak = document.getElementsByClassName("kotak");
  for (var i = 0; i < kotak.length; i++) {
    kotak[i].className += " show"
  }
}

// fungsi memulai atau merestart game
function startGame() {
  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

  if (navigator.vibrate) {
    window.navigator.vibrate(500);
  }

  skorElement.innerHTML = ` ${score}`
  var box = [];
  var num = 54;

  for (var i = 0; i < num; i += 2) {
    var imageIndex = randomInt(1, 22);
    box[i] = imageIndex;
    box[i + 1] = imageIndex;
  }

  shuffle(box);

  board.innerHTML = '';
  for (var i = 0; i < box.length; i++) {
    var templateKotak = "<div class='kotak' id='kotak-" + i + "' data-id='" + box[i] + "'><span class='text'>" + box[i] + "</span></div>";
    board.innerHTML += templateKotak;
  }

  var flipping = false;
  var disabled = false;
  var kotak = document.getElementsByClassName('kotak');
  var firstImg, secondImg, x;

  for (var i = 0; i < kotak.length; i++) {
    kotak[i].addEventListener('click', function () {
      if (disabled) return;

      this.classList.add('show');

      if (!flipping) {
        firstImg = this;
        flipping = true;
        return;
      }

      secondImg = this;

      if (firstImg.id != secondImg.id) {
        disabled = true;
        setTimeout(function () {
          if (firstImg.dataset.id != secondImg.dataset.id) {
            firstImg.classList.remove('show');
            secondImg.classList.remove('show');
          } else {
            firstImg.classList.add('solved');
            secondImg.classList.add('solved');

            score += 10
            skorElement.innerHTML = ` ${score}`
          }
          disabled = false;
        }, 500);

        flipping = false;
      }

      console.log({
        'firstImg': firstImg,
        'secondImg': secondImg,
        'cocok': firstImg && secondImg ? firstImg.dataset.id == secondImg.dataset.id : undefined,
        'flipping': flipping,
        'disabled': disabled,
      });

    });
  }

}

document.getElementById('restart').addEventListener('click', function () {
  score = 0
  startGame();
});

startGame();
