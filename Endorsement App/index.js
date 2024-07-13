import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsement--app-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListDb = ref(database, "endorsementList")
// const db =getFirestore()
// const docRef = doc(db,"enorsementList","O1hh4xfCq1IX--c8cAv")
// const docSnap = await getDoc(endorsementListDb);

const textareEl = document.getElementById("textarea-el")
const publishBtn = document.getElementById("publish-btn")
const ulEl = document.getElementById("ul-el")
// const fromInput = document.getElementById("from-el")
// const toInput = document.getElementById("to-el")

publishBtn.addEventListener("click", function() {
    let textValue = textareEl.value
    // let fromValue =fromInput.value
    // let toVlaue = toInput.value

    // let messageObject= {
    //     from: fromValue,
    //     message: textValue,
    //     to: toVlaue 
    // }
    
    push(endorsementListDb,textValue)
   
    
    clearTextBox()
    clearFromInput()
    clearToInput()
})

onValue(endorsementListDb, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val())
    
        clearulEl()
        
        for (let i = 0; i < endorsementArray.length; i++) {
            let currentEndorsement = endorsementArray[i]
            let currentEndorsementID = endorsementArray[0]
            let currentEndorsementValue = endorsementArray[1]
            
            appendTextToEndorsement(currentEndorsement )
        }    
    } else {
        ulEl.innerHTML = "No Endorsements......... yet!"
    }
})

function clearFromInput(){
    fromInput.value = ""
}
function clearToInput(){
    toInput.value=""
}

function clearTextBox(){
    textareEl.value = ""
}
function clearulEl() {
    ulEl.innerHTML = ""
}


function appendTextToEndorsement(endorsement){
        let endorsementID = endorsement[0];
        let endorsementValue = endorsement[1];

        let newEl = document.createElement("li");
            newEl.textContent = endorsementValue;


            newEl.addEventListener("dblclick", function() {
                let location = ref(database, `endorsementList/${endorsementID}`)
                remove(location)
            })

           ulEl.append(newEl)

}













