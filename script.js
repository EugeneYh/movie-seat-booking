
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count'); 
const total = document.getElementById('total'); 
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//Save movie index and price 
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update count and total price
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('seatsIndex', JSON.stringify(selectedSeatsIndex));

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}

//Populate UI from the local storage data

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('seatsIndex'));
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    movieSelect.selectedIndex = selectedMovieIndex;
    
}

//Movie select event 
movieSelect.addEventListener('change', e => {
    e.preventDefault();
    ticketPrice = + e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


// Seat click event
container.addEventListener('click', e => {
    e.preventDefault();

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

//Initial count and total set
updateSelectedCount();