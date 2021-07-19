'use strict';

const colors = ['#f0c5c2', '#f29e99', '#ed7b74', '#eb453b', '#e81d10', '#ad133a',
'#e88151', '#e06b34', '#e35310', '#e3b510', '#d6b640', '#f0d90a', '#c9c914', 
'#a8c914', '#90c914', '#52910a', '#2c910a', '#33e32d', '#2de348', '#2de36d', 
'#2de388', '#2de39d', '#14ba7a', '#14ba93', '#14baa9', '#14a7ba', '#1472ba', 
'#145cba', '#1432ba', '#0c0861', '#452894', '#43158a', '#5b158a', '#6b158a',
'#c91ee3','#dc1ee3', '#e31ed3', '#e31eb8', '#730d5c', '#ad1375', '#ad1351', ];

const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

startBtn.addEventListener('click', onStartBtnClick);
timeList.addEventListener('click', onTimeListClick);
board.addEventListener('click', onBoardClick);

function onStartBtnClick (event) {
    event.preventDefault();
    screens[0].classList.add('up');
};

function onTimeListClick (event) {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    };
};

function onBoardClick (event) {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
};

function startGame () {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
};

function decreaseTime () {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if(current < 10) {
            current = `0${current}`
        };

        setTime(current);
    };
};

function setTime (value) {
    timeEl.innerHTML = `00:${value}`;
};

function finishGame () {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
};

function createRandomCircle () {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = color;
    board.append(circle);
};

function getRandomNumber (min, max) {
   return Math.round(Math.random() * (max - min) + min);
};

function getRandomColor () {
    return colors[Math.floor(Math.random() * colors.length)];
};