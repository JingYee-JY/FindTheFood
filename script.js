const startButton = document.querySelector(".startButton")
const questionNumber = document.querySelector(".number")
const food = document.querySelector(".food")
const foodName = document.querySelector(".name")
const popUp = document.querySelector(".popUp")
const pop = document.querySelector(".pop")
const picture = document.querySelector(".picture")
const text = document.querySelector(".text")
const start = document.querySelector(".start")
const game = document.querySelector(".game")
const final = document.querySelector(".final")

const clickSound = document.getElementById("click")
const correct = document.getElementById("correct")
const clap = document.getElementById("clap")
const wrong = document.getElementById("wrong")

let current;
let totalQuestion;
let answer;
let tempoQuestionArray = [];

let foods = [
    {name: "Ang Ku Kueh", number: "1", image:"./img/AngKuKueh.png"},
    {name: "Chicken Rice", number: "2", image:"./img/ChickenRice.png"},
    {name: "Chwee Kueh", number: "3", image:"./img/ChweeKueh.png"},
    {name: "Curry Puffs", number: "4", image:"./img/CurryPuffs.png"},
    {name: "Huat Kueh", number: "5", image:"./img/HuatKueh.png"},
    {name: "Ice Kachang", number: "6", image:"./img/IceKachang.png"},
    {name: "Nasi Lemak", number: "7", image:"./img/NasiLemak.png"},
    {name: "Otah", number: "8", image:"./img/Otah.png"},
    {name: "Satay", number: "9", image:"./img/Satay.png"},
    {name: "Haw Flakes", number: "10", image:"./img/HawFlakes.png"},
    {name:"Iced Gem Biscuits", number: "11", image:"./img/IcedGemBiscuits.png"},
    {name:"Pandan Cake", number: "12", image:"./img/PandanCake.png"},
    {name:"Chicken Feet", number: "13", image:"./img/ChickenFeet.png"},
    {name:"Laksa", number: "14", image:"./img/Laksa.png"},
    {name:"Ice Cream Sandwich", number: "15", image:"./img/IceCreamSandwich.png"}
]

Start()
Question()

function Start(){
    current = 0
    totalQuestion = Math.floor(Math.random() * 10) + 5;
}

function Question(){
    if(current == totalQuestion){
        clap.currentTime = 0
        clap.play()
        game.classList.add("hide")
        final.classList.remove("hide");
        return
    }
    
    if(tempoQuestionArray.length == 0){
        for(let x = 0; x < foods.length; x++){
            tempoQuestionArray.push(foods[x])
        }
    }

    current += 1;
    choice = 0
    questionNumber.innerHTML = current + "/" + totalQuestion;

    qIndex = Math.floor(Math.random() * tempoQuestionArray.length);
    food.src = tempoQuestionArray[qIndex].image
    foodName.innerHTML = `Find ${tempoQuestionArray[qIndex].name}`
    answer = tempoQuestionArray[qIndex].number

    tempoQuestionArray.splice(qIndex , 1)

    let tempoArray = [];

    for(let x=0; x < foods.length; x++){
        tempoArray.push(foods[x])
    }

    console.log(tempoArray)
    for(let x=0; x < foods.length; x++){
        let currentClass = "btn" + (x + 1)
        let currentBtn = document.querySelector(`.${currentClass}`)
        
        let randomFood = Math.floor(Math.random() * tempoArray.length);
        console.log(randomFood)

        currentBtn.setAttribute("data", tempoArray[randomFood].number)
        currentBtn.src = tempoArray[randomFood].image
        tempoArray.splice(randomFood, 1)
        console.log(tempoArray)
    }
}

startButton.addEventListener("click", () =>{
    playClickSound()
    let delay = setTimeout(() => {
        start.classList.add("hide")
        game.classList.remove("hide")
    }, 200);
})

for(let x=1; x < 16; x++){
    let currentClass = "btn" + x
    let currentBtn = document.querySelector(`.${currentClass}`)

    currentBtn.addEventListener("click", () => {
        playClickSound()
        let currentdate = currentBtn.getAttribute("data")
        console.log(currentBtn, currentdate, answer)
        popUp.classList.remove("hide")
        if(currentdate == answer){
            correct.currentTime = 0
            correct.play()
            picture.src = "./img/right.png"
            pop.style.backgroundColor = "#44CB39"
            text.innerHTML = "That's right!"
            let delay = setTimeout(()=>{
                popUp.classList.add("hide")
                Question()
            },2000)
            return
        }
        else{
            wrong.currentTime = 0
            wrong.play()
            picture.src = "./img/wrong.png"
            pop.style.backgroundColor = "#C54C4C"
            text.innerHTML = "That's not right!"
            let delay = setTimeout(()=>{
                popUp.classList.add("hide")
            },2000)
        }
    })
}

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });

