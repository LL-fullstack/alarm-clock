'use strict';

let alarmCode;

function refreshClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    hours = formatNumberToTwoDigits(hours);
    minutes = formatNumberToTwoDigits(minutes);

    document.getElementById('clock').innerText = `${hours}:${minutes}`;
    setTimeout(refreshClock, 1000);
}

document.getElementById('setAlarmButton').addEventListener('click', function(event) {
    const hours = document.getElementById('clockHours').value;
    const minutes = document.getElementById('clockMinutes').value;
    setAlarm(hours, minutes);
});

function setAlarm(hours, minutes) {
    const alarmTime = new Date();
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);

    const now = new Date();
    let timeToAlarm = alarmTime.getTime() - now.getTime();

    if (timeToAlarm < 0) {
        timeToAlarm = timeToAlarm + 24*60*60*1000;
    }

    const displayHours = formatNumberToTwoDigits(hours);
    const displayMinutes = formatNumberToTwoDigits(minutes);

    document.getElementById('alarmSetting').innerHTML = `<i class="fa-solid fa-bell"></i>&emsp;${displayHours}:${displayMinutes}`;
    clearTimeout(alarmCode);
    alarmCode = setTimeout(() => {
        document.getElementById('ringTone').play();
    }, timeToAlarm);
}

function formatNumberToTwoDigits(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}

refreshClock();

