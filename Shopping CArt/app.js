
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
 databaseURL: "https://realshoppingapp-63a1f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)//it connects our project with firebase
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")//settings for reference
const shoppingListEl = document.getElementById("shopping-list")

let inputFieldEl = document.getElementById("input-field")
let addbuttonEl = document.getElementById("add-button")




addbuttonEl.addEventListener("click",function(){
 let inputValue = inputFieldEl.value
 push(shoppingListInDB, inputValue)//ulozime data pomocou push. Add to a list of data in the database

 clearInputFieldEl()
 

})


onValue(shoppingListInDB, function(snapshot){//musime specifikovat refenrence najprv(shoppingListInDB) aby to rpesne vedelo odkial musime fetch items. 

 
 if(snapshot.exists()){// pouzivam vstavanu metodu pre firebase EXIST() aby mi zistilo ci mam v nakupnom kosiku nieco dane. TEda ci je v mojej databaze nieco alebo nie. Ak ano tak sa mi executne kod nizise::::
  let itemsArray = Object.entries(snapshot.val())
 clearShoppingListEL()// vymaze mi shoppingListEl.innerHTML aby mi to nerobilo bug

 for(let i = 0; i < itemsArray.length; i++){//dám to do loopu pretoze chcem aby mi to vypisovalo vsetko co tam mam ulozene v databaze
  let currentItem = itemsArray[i]// array s 2 vecmi vo vnutri 
  let currentItemID = currentItem[0]// ID z array
  let currentItemValue = currentItem[1]//Hodnota z array
    

  appendItemToShoppingListEl(currentItem)//zobrazia sa mi cely array ktory mam ulozene v databaze a krasen sa mi vypise. A v mojej funkcii mam nastavene ze sa mi zobrazia iba hodnoty VALUE(itemValue)
  
 }
 }else{// A ak nie tak mi shoppingListEl.innerHTML vpise ze tam nic nemam ::::::: 
  shoppingListEl.innerHTML =  "No items here... yet."
 }


 


})

function clearShoppingListEL(){
 shoppingListEl.innerHTML = ""
}

function clearInputFieldEl(){//nastavi mi hodnotu input fieldu na empty
 inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item){//zobrazi mi nove li items 
 //shoppingListEl.innerHTML += `<li>${itemValue}</li>`

 let itemID= item[0]
 let itemValue = item[1]
 let newEl = document.createElement("li")

 newEl.textContent = itemValue//text value = hodnota ktoru som napisal do inputu. Nie ID ktore mam v databaze 

 newEl.addEventListener("dblclick", function(){
  let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)//vzdy musi byt database v ref pretoze s nou budeme pracovat. Ako druhe mam umiestnenie v databaze do ktoreho sa chcem dostat a itemID mi sluzi na konkretnu zakliknutu polozku a ako sa ku nej dostanem v databaze na to sluzi `shoppingList/${itemID}`
  remove(exactLocationOfItemInDB)
 })

 shoppingListEl.append(newEl)// v mojom ul shopping lsit sa mi objavia li ktore som si vytvril vyssie a budu jeho (ul) child
}


 
