var board = document.getElementById('board');

function randomInt(min , max) {
  var random_number = Math.random() * (max-min) + min;
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


function startGame() {
  var box = [];
  var num = 60;
  for (var i = 0; i < num; i+=2) {
    var imageIndex = randomInt(1,22);
    box[i] = imageIndex;
    box[i+1] = imageIndex;
  }

  shuffle(box);

  board.innerHTML = '';
  for (var i = 0; i < box.length; i++) {
    var templateKotak = "<div class='kotak' id='kotak-" + box[i] + "' data-id='" + i + "'><img src='img/" + box[i] + ".jpg' ></div>";
    board.innerHTML += templateKotak;
  }

  var flipping = false;
  var disabled = false;
  var kotak = document.getElementsByClassName('kotak');
  var firstImg, secondImg, x;

  for (var i = 0; i < kotak.length; i++) {
    kotak[i].addEventListener('click', function() {
      if (disabled) {
        return;
      }
      this.classList.add('show');
      self = this;
      if (flipping) {
        secondImg = self;
        if (firstImg.dataset.id != secondImg.dataset.id) {
          disabled = true;
          setTimeout(function(){
            if (firstImg.id != secondImg.id) {
              firstImg.classList.remove('show');
              secondImg.classList.remove('show');
            } else {
              firstImg.classList.add('solved');
              secondImg.classList.add('solved');
            }
            disabled = false;
            console.log(firstImg.id, secondImg.id);
          }, 1000 );
          flipping = false;
        }
      } else {
        firstImg = self;
        flipping = true;
      }
      console.log(flipping);
    });
  }

}

document.getElementById('restart').addEventListener('click', function(){
  startGame();
});

startGame();
