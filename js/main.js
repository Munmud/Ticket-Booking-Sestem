const container = $(".contain") ;
const seats = $(".row .seat:not(.occupied)") ;
const count = $("#count") ;
const total = $("#total") ;
const movieSelect = $("#movie") ;

let ticketPrice = +movieSelect.val() ;
   ;
//Update total and count
function updatedSelectedCount(){
    const selectedSeats = $(".row .seat.selected") ;
    const selectedSeatsCount = selectedSeats.length ;
    count.text(selectedSeatsCount)
    total.text(selectedSeatsCount * ticketPrice) ;
}
// Seat click event
movieSelect.on("change" , e =>{
    ticketPrice = +e.target.value ;
    updatedSelectedCount() ;
}) ;
container.on("click" , (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected') ;
        updatedSelectedCount() ;
    }
}) ;