const sequence = {}
var seqList = []
const count  = 0
const sleepTime = 300
const intervalTime = 500
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function randomiseSequence(n) {
    let seq = []
    for (let i = 0; i < 30; i++) {
	let alphIndex = Math.floor(Math.random() * 26)
	seq.push(alphabet[alphIndex])
    }
    return seq
}
function getRandomNumberRange(min, max) {
    let output = 1
    if (max > 0) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return output
}
function getRandomNumber(bound) {
    let output = 1
    if (bound > 0) {
	    bound = Math.floor(bound)
	    output = Math.random(Math.random() * bound)
    }
    return output
}


function generateInitialSequence() {
    // at least 3 letters, places twice so list cant be more than 24 chars
    // We will have 3 random letters that will be duped
    // n steps apart
    // at a random point we can initialise the n counter
    // where we throw in a letter then after n we throw in another
    let rseq = []
    for (let r = 0; r < 24; r ++) {
	let alphIndex = Math.floor(Math.random() * 26)
	rseq.push(alphabet[alphIndex])
    }
    console.log(`generated seq of length ${rseq.length}`)
    return rseq
}

function cleanseSequence(n, seq) {
    for (let i = seq.length; i >= n; i--) {
        while (seq[i-n] == seq[i]) {
            console.log(`found same item ${i} ${seq[i]} at ${i-n} ${seq[i-n]}, changing`)
            let r = getRandomNumberRange(0, 25)
            console.log(`will change to ${alphabet[r]}`)
            seq[i] = alphabet[r]
        }
    }
    return seq
}

function generateNbacks(n, rseq) {
    // because we need to insert n steps apart, we check from n -> end of list size
    let takenSlots = []
    let place = 0
    let letter = 0
    let counter = 0
    for (let i = 0; i < 3; i++) {
        console.log(rseq)
        place = getRandomNumberRange(n, 23+counter-n)
        letter = getRandomNumberRange(0, 25)
        while (takenSlots.includes(place) || takenSlots.includes(place+n)) {
            console.log(`place is ${place} and n-bump is ${[place+n]}, finding another spot`)
            place = getRandomNumberRange(n, 23+counter-n)
        }
        for (let x = place; x <= place+n; x++) {
            takenSlots.push(x)
        }
        counter = counter + 2
        console.log(place)
        console.log(letter)
        console.log(alphabet[letter])
        rseq.splice(place, 0, alphabet[letter])
        console.log(place+n)
        rseq.splice(place+n, 0, alphabet[letter])
        console.log(rseq)
    }
    // console.log(rseq)
    // let place = getRandomNumberRange(n, 24)
    // let letter = getRandomNumberRange(0, 25)
    // console.log(place)
    // console.log(letter)
    // console.log(alphabet[25])
    // rseq.splice(place, 0, alphabet[letter])
    // rseq.splice(place-n-1, 0, alphabet[letter])
    
    // place = getRandomNumberRange(n, 24)
    // letter = getRandomNumberRange(0, 25)
    // console.log(place)
    // console.log(letter)
    // console.log(alphabet[25])
    // rseq.splice(place, 0, alphabet[letter])
    // rseq.splice(place-n-1, 0, alphabet[letter])



    // rseq.splice(getRandomNumberRange(n, 26), 0, alphabet[getRandomNumberRange(0,25)])
    // let n3 = rseq.splice(getRandomNumberRange(n, 28), 0, alphabet[getRandomNumberRange(0,25)])
    // console.log(rseq)
    return rseq
}

async function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < 3; i++) {
        let row = document.createElement("div")
        row.className = "letter-row-".concat(i.toString())
        
        for (let j = 0; j < 3; j++) {
            let box = document.createElement("div")
            box.className = "letter-box-".concat(j.toString())
            row.appendChild(box)
        }

        board.appendChild(row)
    }
    return
}

async function animation() {
    const blackB = {
	border: "2px solid gray"
    }
    const redB = {
	border: "2px solid red"
    }
    let coords = seqList[count]
    let className = "letter-row-".concat(coords[0].toString())
    console.log(className)
    let divBox = document.getElementsByClassName(className)[0].children[coords[1]]
    console.log(divBox)
    Object.assign(divBox.style,redB)
    await sleep(sleepTime);
    Object.assign(divBox.style,blackB)
    console.log(coords[0], coords[1]);
}

function resetSquares() {
    const blackB = {
	border: "2px solid gray"
    }
    for (let i = 0; i < 3; i ++) {
	for (let j = 0; j < 3; j++) {
	    let className = "letter-row-".concat(i.toString())
	    console.log(className)
	    let divBox = document.getElementsByClassName(className)[0].children[j]
	    console.log(divBox)
	    Object.assign(divBox.style,blackB)
	}
    }
}

function randomiseTiles(seq) {
    for (let i = 0; i < 30; i++) {
	let coords = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]
	seq.push(coords)
    }
    return seq
}

async function wrapper() {
    await initBoard()
    let n = 2
    let seq = generateInitialSequence()
    console.log(seq)
    let cleanSeq = cleanseSequence(n, seq)
    console.log(cleanSeq)
    let Fullseq = generateNbacks(n, cleanSeq)
    seqList = randomiseTiles(seqList)
    let animationInterval;
    document.getElementsByClassName("initiate")[0].children[0].addEventListener("click", function() {
	setTimeout(function (){
	    if (animationInterval != null) {
		clearInterval(animationInterval)
	    }
	    console.log("stopping interval")
	    resetSquares()
	    seqList = []
	    seqList = randomiseTiles(seqList)
	    count = 0
	    animationInterval = setInterval( function () {
		animation()
		count ++; 
		if (count >= 30){
		    clearInterval(animationInterval)
		}
	    }, intervalTime)
	}, 0)
    })
}

wrapper()
