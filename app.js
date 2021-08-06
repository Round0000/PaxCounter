const buttonPlus = document.querySelector('button.plus');
const buttonMinus = document.querySelector('button.minus');
const buttonSendbus = document.querySelector('button.sendbus');
const buttonReset = document.querySelector('button.reset');
const totalPaxDisplay = document.querySelector('.totalPax');
const totalBusDisplay = document.querySelector('.totalBus');
const equalSplitDisplay = document.querySelector('.equalSplit');
const remainingPaxDisplay = document.querySelector('.remainingPax');
const currentCountDisplay = document.querySelector('.currentCount');
const detailsForm = document.querySelector('.detailsForm');
const sessionUI = document.querySelector('.sessionUI');
const timestampsDisplay = document.querySelector('.timestamps');

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
        session.remainingPax -= 1;
        updateUI();
    }
});

buttonMinus.addEventListener('click', e => {
    if (session.currentCount > 0) {
        session.currentCount -= 1;
        session.remainingPax += 1;
        updateUI();
    };
});

window.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight' && session.ongoing && session.remainingPax > 0) {
        session.currentCount += 1;
        session.remainingPax -= 1;
        updateUI();
    };
    if (event.code === 'ArrowLeft' && session.ongoing && session.currentCount > 0) {
        session.currentCount -= 1;
        session.remainingPax += 1;
        updateUI();
    };
});

buttonSendbus.addEventListener('click', e => {
    if (window.confirm('Confirm the bus departure ?')) {
        session.currentCount = 0;

        let time = new Date(Date.now());
        session.busDepartures = [];
        session.busDepartures.push(time.getHours() + ":" + time.getMinutes());
        
        let newTimestamp = document.createElement('P');
        newTimestamp.innerHTML = `Bus parti à : <span class="timestamp">${session.busDepartures[session.busDepartures.length - 1]}</span>`;
        timestampsDisplay.appendChild(newTimestamp);
        updateUI();
    };
});

buttonReset.addEventListener('click', e => {
    if (window.confirm('Are you sure you want to reset ?')) {
        session = {};
        sessionUI.classList.add("d-none");
        detailsForm.classList.remove("d-none");
    };
});