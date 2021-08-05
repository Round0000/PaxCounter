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

let session = {};

const updateUI = () => {
    currentCountDisplay.innerText = session.currentCount;
    remainingPaxDisplay.innerText = session.remainingPax;
    console.log(session);

    if (session.currentCount >= 40) {
        currentCountDisplay.classList.add('almostFull');
    } else if (document.querySelector('.almostFull')) {
        currentCountDisplay.classList.remove('almostFull');
    }
};

detailsForm.addEventListener('submit', e => {
    e.preventDefault();

    session.totalPax = e.target.paxQuantity.value;
    totalPaxDisplay.innerText = session.totalPax;
    session.totalBus = e.target.busQuantity.value;
    totalBusDisplay.innerText = session.totalBus;
    session.remainingPax = session.totalPax;
    session.currentCount = 0;

    equalSplitDisplay.innerText = Math.round(session.totalPax / session.totalBus);

    session.ongoing = true;

    updateUI();

    sessionUI.classList.remove("d-none");
    detailsForm.reset();
    detailsForm.classList.add("d-none");
});

buttonPlus.addEventListener('click', e => {
    if (session.remainingPax > 0) {
        session.currentCount += 1;
        session.remainingPax = session.totalPax - session.currentCount;
        updateUI();
    }
});

buttonMinus.addEventListener('click', e => {
    if (session.currentCount > 0) {
        session.currentCount -= 1;
        session.remainingPax = session.totalPax - session.currentCount;
        updateUI();
    };
});

window.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight' && session.ongoing && session.remainingPax > 0) {
        session.currentCount += 1;
        session.remainingPax = session.totalPax - session.currentCount;
        updateUI();
    }
    if (event.code === 'ArrowLeft' && session.ongoing && session.currentCount > 0) {
        session.currentCount -= 1;
        session.remainingPax = session.totalPax - session.currentCount;
        updateUI();
      }
  });

buttonReset.addEventListener('click', e => {
    if (window.confirm('Are you sure you want to reset ?')) {
        session = {};
        sessionUI.classList.add("d-none");
        detailsForm.classList.remove("d-none");
    };
});