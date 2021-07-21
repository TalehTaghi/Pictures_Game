let arrayOfImages = ["asset/img/ant.jpg", "asset/img/dog.jpg", "asset/img/snake.jpg", "asset/img/horse.jpeg", "asset/img/parrot.jpg", "asset/img/giraffe.jpg", "asset/img/lion.jpg", "asset/img/tarantula.jpg"];
arrayOfImages = arrayOfImages.concat(arrayOfImages);
let randomArray = new Array();
let openedPictures = new Array();
let btn = document.getElementById("btn");
let countTime;
let time;
let td;
let opened = 0;
let found = 0;

function RandomArray() {
    let arr = arrayOfImages.slice();
    let rand;

    for (let i = 0; i < arrayOfImages.length; i++) {
        rand = Math.floor(Math.random() * arr.length);
        randomArray[i] = arr[rand];
        arr.splice(rand, 1);
    }
}

function Timer() {
    time = 0;

    btn.innerText = `Your time: ${time} seconds`;
    btn.style.display = "block";
    btn.style.cursor = "auto";
    btn.style.backgroundColor = "green";

    countTime = setInterval(() => {
        time++;
        btn.innerText = `Your time: ${time} seconds`;

        if (time <= 12) {
            btn.style.backgroundColor = "green";
        }
        else if (time > 12 && time <= 16) {
            btn.style.backgroundColor = "yellowgreen";
        }
        else if (time > 16 && time <= 20) {
            btn.style.backgroundColor = "#ff6600";
        }
        else if (time > 20 && time <= 24) {
            btn.style.backgroundColor = "#ff1a40";
        }
        else {
            btn.style.backgroundColor = "red";
        }
    }, 1000);
}

function Table() {
    btn.removeAttribute("onclick");
    btn.style.display = "none";

    let tr = '';
    for (let i = 0; i < 4; i++) {
        tr += `<tr>`;
        for (let j = 0; j < 4; j++) {
            tr += `<td id=${4 * i + j}></td>`;
        }
        tr += `</tr>`;
    }

    td = document.getElementsByTagName("td");
    document.getElementById("tbl").innerHTML = tr;

    RandomArray();
    for (let i = 0; i < td.length; i++) {
        td[i].style.backgroundImage = `url(${randomArray[i]})`;
    }

    setTimeout(() => {
        for (let i = 0; i < td.length; i++) {
            td[i].style.backgroundImage = "url('asset/img/cardBack.jpg')";
            td[i].setAttribute("onclick", "OpenPicture(this)");
        }
        Timer();
    }, 2000);
}

function OpenPicture(cell) {
    cell.style.backgroundImage = `url(${randomArray[cell.id]})`;
    cell.removeAttribute("onclick");
    openedPictures.push(cell);
    opened++;

    if (opened == 2) {
        if (openedPictures[0].style.backgroundImage != openedPictures[1].style.backgroundImage) {
            for (let i = 0; i < td.length; i++) {
                td[i].removeAttribute("onclick");
            }

            setTimeout(ClosePictures, 500);
        }
        else {
            found++;
            opened = 0;
            openedPictures = [];

            if (found == 8) {
                Finish();
            }
        }
    }
}

function ClosePictures() {
    for (let pic of openedPictures) {
        pic.style.backgroundImage = "url('asset/img/cardBack.jpg')";
    }

    for (let i = 0; i < td.length; i++) {
        if (td[i].style.backgroundImage == 'url("asset/img/cardBack.jpg")') {
            td[i].setAttribute("onclick", "OpenPicture(this)");
        }
    }

    openedPictures = [];
    opened = 0;
}

function Finish() {
    clearInterval(countTime);
    found = 0;

    let inner = '';
    inner += `Time: ${time} seconds<br />Rating: `;

    if (time <= 12) {
        inner += `5`;
    }
    else if (time > 12 && time <= 16) {
        inner += `4`;
    }
    else if (time > 16 && time <= 20) {
        inner += `3`;
    }
    else if (time > 20 && time <= 24) {
        inner += `2`;
    }
    else {
        inner += `1`;
    }

    inner += `<i class="fas fa-star"></i> <i class="fas fa-redo-alt" onclick='Table()'></i>`;
    btn.innerHTML = inner;
}