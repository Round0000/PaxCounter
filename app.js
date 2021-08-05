const buttonPlus = document.querySelector('button.plus');
const buttonMinus = document.querySelector('button.minus');
const buttonReset = document.querySelector('button.reset');
const currentCountDisplay = document.querySelector('.currentCount');
const totalPaxDisplay = document.querySelector('.totalPax');
const totalBusDisplay = document.querySelector('.totalBus');
const equalSplitDisplay = document.querySelector('.equalSplit');
const remainingPaxDisplay = document.querySelector('.remainingPax');
const detailsForm = document.querySelector('.detailsForm');
const sessionUI = document.querySelector('.sessionUI');

let currentSession = {};

const updateUI = () => {
    currentCountDisplay.innerText = currentSession.currentCount;
    remainingPaxDisplay.innerText = currentSession.remainingPax;
    console.log(currentSession);

    if (currentSession.currentCount >= 40) {
        currentCountDisplay.classList.add('almostFull');
    } else if (document.querySelector('.almostFull')) {
        currentCountDisplay.classList.remove('almostFull');
    }
};

detailsForm.addEventListener('submit', e => {
    e.preventDefault();

    currentSession.totalPax = e.target.paxQuantity.value;
    totalPaxDisplay.innerText = currentSession.totalPax;
    currentSession.totalBus = e.target.busQuantity.value;
    totalBusDisplay.innerText = currentSession.totalBus;
    currentSession.remainingPax = currentSession.totalPax;
    currentSession.currentCount = 0;

    equalSplitDisplay.innerText = Math.round(currentSession.totalPax / currentSession.totalBus);

    currentSession.ongoing = true;

    updateUI();

    sessionUI.classList.remove("d-none");
    detailsForm.reset();
    detailsForm.classList.add("d-none");
});

buttonPlus.addEventListener('click', e => {
    if (currentSession.remainingPax > 0) {
        currentSession.currentCount += 1;
        currentSession.remainingPax = currentSession.totalPax - currentSession.currentCount;
        updateUI();
    }
});

buttonMinus.addEventListener('click', e => {
    if (currentSession.currentCount > 0) {
        currentSession.currentCount -= 1;
        currentSession.remainingPax = currentSession.totalPax - currentSession.currentCount;
        updateUI();
    };
});

window.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight' && currentSession.ongoing && currentSession.remainingPax > 0) {
        currentSession.currentCount += 1;
        currentSession.remainingPax = currentSession.totalPax - currentSession.currentCount;
        updateUI();
    }
    if (event.code === 'ArrowLeft' && currentSession.ongoing && currentSession.currentCount > 0) {
        currentSession.currentCount -= 1;
        currentSession.remainingPax = currentSession.totalPax - currentSession.currentCount;
        updateUI();
      }
  });

buttonReset.addEventListener('click', e => {
    if (window.confirm('Are you sure you want to reset ?')) {
        currentSession = {};
        sessionUI.classList.add("d-none");
        detailsForm.classList.remove("d-none");
    };
});