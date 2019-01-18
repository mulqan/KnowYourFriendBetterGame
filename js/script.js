// Author : Muhammad Mulqan
// Tgl    :17 Januari 2018


// Mendapatkan element dengan id board
var board = document.getElementById('board');

// generate random integer antara nilai min dan max
function randomInt(min , max) {
  var random_number = Math.random() * (max-min) + min;
  return Math.floor(random_number);
}

// Untuk mengacak array
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

// fungsi memulai atau merestart game
function startGame() {
  // variabel menyimpan nomor gambar2 yang akan ditampilkan
  var box = [];

  // jumlah kotak dalam papan permainan (board)
  var num = 60;

  // memberikan nilai variable box array berupa integer random
  // setiap integer random yang digenerate disuatu index harus memiliki nilai yang sama di index lainnya
  // cth nilai box yag dihailkan [4,4,15,15,8,8,12,12,21,21,...,..,...]
  for (var i = 0; i < num; i+=2) {
    var imageIndex = randomInt(1,22);
    box[i] = imageIndex;
    box[i+1] = imageIndex;
  }

  // Mengacak array
  // cth array awal [4,4,15,15,8,8,12,12,21,21,...,..,...]
  // cth setelah diacak [8,15,21,4,12,8,21,15,4,12,...,....]
  shuffle(box);

  // mengkosongkan semua html yang berada di dalam element variabel board
  board.innerHTML = '';
  // loop setiap array yang sudah digenerate dan diacak dan mencetaknya di dalam element variabel board
  for (var i = 0; i < box.length; i++) {
    var templateKotak = "<div class='kotak' id='kotak-" + i + "' data-id='" + box[i] + "'><img src='img/" + box[i] + ".jpg' ></div>";
    board.innerHTML += templateKotak;
  }

  // variabel menentukan apakah ada gambar yang sedang muncul
  var flipping = false;
  // variabel menentukan apakah kondisi permainan membolehkan kotak diklik untuk memunculkan gambar
  var disabled = false;
  // mendapatkan semua element dengan class 'kotak'
  var kotak = document.getElementsByClassName('kotak');
  // firstImg -> menyimpan element kotak pertama yang ditekan
  // secondImg -> menyimpan element kotak kedua yang ditekan
  var firstImg, secondImg, x;

  // memberikan event listener jika di klik ke setiap element dengan class 'kotak'
  for (var i = 0; i < kotak.length; i++) {
    // event listener klik pada class kotak berdasarkan index
    kotak[i].addEventListener('click', function() {
      // jika posisi permainan tidak membolehkan pemain untuk mengeklik kotak
      // maka fungsi langsung return null
      if (disabled) return;

      //class 'show' ditambahkan ke element ini (element dengan class 'kotak' pada index i)
      this.classList.add('show');

      // jika tidak ada gambar yang muncul
      if (!flipping) {
        // firstImg sama dengan gelemen ini
        firstImg = this;
        // memberikan nilai true kepada flipping, yg artinya sudah ada gambar yg muncul
        flipping = true;
        return;
      }

      // jika sedang ada gambar yang muncul (sudah ada gambar pertama yg diklik)
      // maka gambar kedua adalah elemen ini
      secondImg = this;

      //jika id elemen firstImg dan secondImg tidak sama
      if (firstImg.id != secondImg.id) {
        // pada kondisi ini permainan dalam kondisi disabled
        disabled = true;
        // eksekusi fungsi anonymous dengan waktu jeda 1 detik
        setTimeout(function(){
          // jika properti data-id elemen firstImg dan secondImg tidak sama
          if (firstImg.dataset.id != secondImg.dataset.id) {
            // hapus class show (kembali menghilang gambar pada elemen firstImg dan secondImg)
            firstImg.classList.remove('show');
            secondImg.classList.remove('show');
          } else {
            // jika sama data-id elemen firstImg dan secondImg
            // maka kedua elemen tersebut diberikan class 'solved'
            firstImg.classList.add('solved');
            secondImg.classList.add('solved');
          }
          // pada kondisi ini permainan kembali seperti semula (disabled menjadi false)
          disabled = false;
        }, 1000 );

        // tidak ada gambar yang muncul kerena sudah dihilangkan class 'show' jika tdk sama gambarnya
        // dan jika sama maka akan ditambahkan class 'solved'
        // oleh karena itu variabel flipping kembali menjadi false
        flipping = false;
      }

      // kepeluan debugging, boleh dihapus jika sudah paham
      // tekan ctrl + shift + i, lalu pilih tab console
      console.log({
        'firstImg' : firstImg,
        'secondImg' : secondImg,
        'cocok' : firstImg && secondImg ? firstImg.dataset.id == secondImg.dataset.id : undefined,
        'flipping' : flipping,
        'disabled' : disabled,
      });

    });
  }

}

// event listener untuk tombol dgn id restart
document.getElementById('restart').addEventListener('click', function(){
  startGame();
});

startGame();
