import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = 0;

const inputRef = document.querySelector('#datetime-picker');

const buttonRef = document.querySelector('button');
buttonRef.disabled = true;

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] > Date.now()) {
          userSelectedDate = selectedDates[0];
          buttonRef.disabled = false;
      }
      else {
          iziToast.show({
              onClosed(){},
              message: "Please choose a date in the future",
              color: 'red',
              position: 'topRight',
              timeout: 5000,              
          })
          buttonRef.disabled = true;
      }      
  },
};

flatpickr('#datetime-picker', options)

buttonRef.addEventListener('click', () => {
    const intervalId = setInterval(() => {
      
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    const time = convertMs(diff);
        
    daysRef.textContent = time.days.toString().padStart(2, '0');
    hoursRef.textContent = time.hours.toString().padStart(2, '0');
    minutesRef.textContent = time.minutes.toString().padStart(2, '0');
    secondsRef.textContent = time.seconds.toString().padStart(2, '0');
        
    inputRef.disabled = true;
    buttonRef.disabled = true;
        
    if (diff < 1000) clearInterval(intervalId);
        
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

