let form = document.getElementById('AddItem');
let textbox=form.elements["textbox"];
textbox.focus();
form.addEventListener("submit", handleAddItems)
// let textbox = document.getElementById('textbox');
let btnAdd = document.querySelector('#btn');
// btnAdd.addEventListener('click', handleAddItems);
let arrGroceries = [
    { ItemName: 'Tomatoes', qty: 1,Variety:'Roma' },
    { ItemName: 'Onion', qty: 1, Variety: 'white' },
    { ItemName: 'Lettuce', qty: 1, Variety: 'IceBerg' },
    { ItemName: 'Apple', qty: 1, Variety:'Gala' },
    { ItemName: 'Banana', qty: 1, Variety:'Organic' }
];

// Creating a crossed off from array list using document fragment
let divList = document.getElementById('crossList');
let h2 = document.createElement('h2');
h2.textContent = 'Crossed off';
h2.style.paddingLeft = '43px';
h2.style.backgroundColor = 'rgba(0, 128, 0, 0.74)';
divList.appendChild(h2);

let p=document.createElement('p');
p.innerHTML ='<span>Click on crossed off item to add it back</span>';
p.style.paddingLeft='43px';
divList.appendChild(p);
// for each element in the array, call the document fragment function
let loadUl = document.createElement('ul');
loadUl.setAttribute('id', 'crossUl');
loadUl.classList.toggle('strikethrough');
divList.appendChild(loadUl);
arrGroceries.forEach(Item => {

    loadUl.appendChild(loadGroceryList(Item));
    divList.style.margin = '3px';
});

// This function loads the items that have been crossed off using document fragment

function loadGroceryList(Item) {
    
    let frag = document.createDocumentFragment();    
    let li = document.createElement('li');
    li.setAttribute("class", "deleted");
    let liText = document.createTextNode('' + Item.ItemName);
    li.appendChild(liText);   
    frag.appendChild(li); 
    // Adding event listener to already existing crossed off list 
    li.addEventListener('click', handleAddCrossItem);      
    return (frag);
}
// This function uses event delegation to strike through every item
function handleCrossOff(event) {
    this.classList.toggle("strikethrough");
}


// This Function adds the item at the click of OK button or Enter
function handleAddItems(event) {
    // Prevent default functions like form refresh
    event.preventDefault();
    // Making the ok button change color
    btnAdd.style.opacity='0.5';
    setTimeout(() => {
        //restore it back to opacity 1 after 2 seconds
        btnAdd.style.opacity = "1";   
    }, 2000); // 2000 ms = 2 seconds

    // if text box is empty or null or trailing spaces, then pop a window alert
    if (textbox.value && textbox.value !== " " && textbox.value == textbox.value.trim()) 
     {
        let li = document.createElement('li');
        let delBtn = document.createElement("button");
        delBtn.setAttribute('type', 'submit');
        delBtn.setAttribute('name', 'delbtn');
        delBtn.textContent = 'delete';
        delBtn.style.padding = '3px';
        delBtn.style.margin = '5px 10px';
        delBtn.style.borderRadius = '5px'
        delBtn.style.width = '60px';
        delBtn.style.height = '30px';
        delBtn.style.fontSize = '15px';
        delBtn.addEventListener('click', handleDeleteItem);
        let addedListul = document.querySelector('#addedList');
        let addedListli = addedListul.getElementsByTagName('li');
        let duplicateItem = false;
        // setting dynamic id of buttons
        delBtn.setAttribute('id', `delbtn${addedListli.length + 1}`)
        for (let i = 0; i < addedListli.length; i++) {
            //Comparing the list by making it Case insensitive  
            if ((addedListli[i].firstChild.textContent.trim()).toUpperCase() == (textbox.value).toUpperCase()) {
                window.alert("This item already exists!");
                duplicateItem = true;
            }

        }
        // If item is not duplicate, add it, else skip it
        if (duplicateItem == false) {
            // Avoiding overwriting the list
            li.appendChild(document.createTextNode(' ' + textbox.value));
            li.appendChild(delBtn);
            li.style.display='grid';
            li.style.gridTemplateColumns='auto 1250px'; /* text takes space, button stays small */
            li.style.alignItems= 'center';
            li.style.gap='20px';/*space between button and text */
            li.style.padding= '6px';

            addedListul.appendChild(li);            
        }
        textbox.value = '';
        textbox.focus;
        return;
    }
    else {
        window.alert("Please enter an item without trailing spaces!");
        return;
    }
}
// This function will delete the item from active list when delete button is clicked
// and add it to the crossed offf list
function handleDeleteItem(event) {
    event.preventDefault();
    
    //getting the list against the delete button. 'closest' will give the clciked li.
    let li = event.target.closest('li');
    if (window.confirm("Are you sure you want to delete this item?")) {
        // checking if delete button was clicked
        if (event.target.tagName === 'BUTTON') {
            //get the content of list without the text of delete button
            let itemText = li.firstChild.textContent.trim();
            let divList = document.getElementById('crossList');
            let ul = divList.querySelector('#crossUl')
            let crossListLi = ul.querySelectorAll('li');
            let duplicateChk = false;
            crossListLi.forEach(compLi => {
                //checking for duplicate entry against the crossed off list
                if (compLi.firstChild.textContent.toUpperCase() == itemText.toUpperCase()) {
                    duplicateChk = true;
                }

            });
            // if not a duplicate entry then add the item to crossed off list
            if (duplicateChk == false) {
                let newli = document.createElement('li');
                let liText = document.createTextNode('' + itemText);
                newli.appendChild(liText);
                ul.appendChild(newli);
                newli.setAttribute("class", "deleted");
                // strike it like other items in crossed off list
                ul.classList.add('strikethrough');
                divList.appendChild(ul);
            }
            // add event listener to the items
            let newdiv = document.getElementById('crossList');
            let newliItem = newdiv.querySelectorAll('li');
            newliItem.forEach(eachli => {
                eachli.addEventListener('click', handleAddCrossItem);
            });
            // Now remove the item from the active list
            li.remove();
            textbox.focus();
        }
    }
    return;
}
// This function is called when I click on an item in crossed list. This removes the item from crossed list and adds it to active list
function handleAddCrossItem(event) {
    
    let li = document.createElement('li');
    // Creating a delete button to be added with the item to be added to active list
    let delBtn = document.createElement("button");
    delBtn.setAttribute('type', 'submit');
    delBtn.setAttribute('name', 'delbtn');

    delBtn.textContent = 'delete';
    delBtn.style.padding = '3px';
    delBtn.style.margin = '5px 10px';
    delBtn.style.borderRadius = '5px'
    delBtn.style.width = '60px';
    delBtn.style.height = '30px';
    delBtn.style.fontSize = '15px';
    // Adding event listener on new delete button 
    delBtn.addEventListener('click', handleDeleteItem);
    // getting the active list and adding it to a variable for crossed list
    let crossedListul = document.getElementById('addedList');
    let crossedListli = crossedListul.getElementsByTagName('li');
    let duplicateItem = false;
    delBtn.setAttribute('id', `delbtn${crossedListli.length + 1}`)
    for (let i = 0; i < crossedListli.length; i++) {
        //Making the list item Case insensitive and checking for duplicates  
        if ((crossedListli[i].firstChild.textContent.trim()).toUpperCase() == (event.target.textContent).toUpperCase()) {
            window.alert("This item already exists!");
            duplicateItem = true;
        }
    }
    // If item is not duplicate, add it, else skip adding the item
    if (duplicateItem == false) {
        li.appendChild(document.createTextNode(' ' + event.target.textContent));
        li.appendChild(delBtn);
        crossedListul.appendChild(li);
    }
    // Remove the clicked list item
    event.target.remove();
    textbox.focus();
    return;
}

