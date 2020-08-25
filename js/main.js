const container = $(".contain") ;
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = $("#count") ;
const total = $("#total") ;
const movieSelect = document.getElementById('movie');

populateUI () ;

let ticketPrice = +movieSelect.value;
//    Save Selected Inex
function setMovieData(movieIndex , moviePrice){
    localStorage.setItem('selectedMovieIndex' , movieIndex ) ;
}
//Update total and count
function updateSelectedCount(){
    const selectedSeats = $(".row .seat.selected") ;

    const seatsIndex = [...selectedSeats].map( seat => {
        return [...seats].indexOf(seat) ;
    } ) ;

    localStorage.setItem( 'selectedSeats' , JSON.stringify(seatsIndex) ) ;

    const selectedSeatsCount = selectedSeats.length ;
    count.text(selectedSeatsCount)
    total.text(selectedSeatsCount * ticketPrice) ;
}

// Get data from local Storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex') ;

  if (selectedMovieIndex !== null){
      movieSelect.selectedIndex = selectedMovieIndex ;
  }
}

// Movie Select change
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  });

container.on("click" , (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected') ;
        updateSelectedCount() ;
    }
}) ;

// initial count and total set
updateSelectedCount() ;