//RxJS is included via a script tag, so the RxJS functions will be available on the global rxjs object.
//included RxJS in HTML.

const startButton = document.getElementById('start-btn');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timerDisplay = document.getElementById('timer-display');

// Pad a number with a leading zero if it is less than 10
function pad(number) {
  return number < 10 ? '0' + number : number;
}

// Calculate the time left until the end time
function calculateTimeLeft(endTime) {
  const now = new Date().getTime();
  const timeLeft = endTime - now;

  if (timeLeft <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, timeLeft: 0 };
  }

  return {
    hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeLeft / 1000 / 60) % 60),
    seconds: Math.floor((timeLeft / 1000) % 60),
    timeLeft
  };
}

let countdownSubscription; //Keep track of the subscription to unsubscribe from it later
let endTime;

// Subscribe to the start button click event
rxjs.fromEvent(startButton, 'click').subscribe(() => {
  // Calculate the end time in milliseconds
  const totalTimeInSeconds =
    Number(hoursInput.value) * 60 * 60 +
    Number(minutesInput.value) * 60 +
    Number(secondsInput.value);

  endTime = new Date().getTime() + totalTimeInSeconds * 1000;

  if (countdownSubscription) {
    countdownSubscription.unsubscribe(); //Unsubscribe from the previous subscription if it exists
  }

  // Create an observable that emits the time left every second
  countdownSubscription = rxjs.interval(1000).pipe(
    rxjs.operators.map(() => calculateTimeLeft(endTime)),
    rxjs.operators.takeWhile(time => time.timeLeft > 0, true) //Include the last emission when the timeLeft is 0
  ).subscribe({
    next: ({ hours, minutes, seconds }) => {
      timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    },
    complete: () => {
      timerDisplay.textContent = "00:00:00";
      alert("TIME IS UP"); 
    }
  });
});
