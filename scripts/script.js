let textbox = document.getElementById('textbox');
let btnAdd = document.querySelector('#btn');
btnAdd.addEventListener('click', handleAddItems);
let arrGroceries = [
    { ItemName: 'Tomatoes' },
    { ItemName: 'Onion' },
    { ItemName: 'Lettuce' },
    { ItemName: 'Apple' },
    { ItemName: 'Banana'}
];

// Creating a crossed off from array list using document fragment
let divList = document.getElementById('crossList');
let h2 = document.createElement('h2');
h2.textContent = 'Crossed off';
h2.style.paddingLeft = '43px';
h2.style.backgroundColor = 'rgba(0, 128, 0, 0.74)';
divList.appendChild(h2);
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
    console.log(Item);
    let frag = document.createDocumentFragment();    
    let li = document.createElement('li');
    let liText = document.createTextNode('' + Item.ItemName);
    li.appendChild(liText);   
    frag.appendChild(li);    
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
    if (!textbox.checkValidity()) {
        textbox.reportValidity();
        return;
    }
    // if text box is empty then pop a window alert
    if (textbox.value && textbox.value !== " ") {
        console.log(textbox.value);
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
        // border - radius: 5px;
        let addedListul = document.querySelector('#addedList');
        //console.log("added list ul is", addedListul);
        let addedListli = addedListul.getElementsByTagName('li');
        console.log("added list li is", addedListli);
        let duplicateItem = false;
        delBtn.setAttribute('id', `delbtn${addedListli.length + 1}`)
        for (let i = 0; i < addedListli.length; i++) {
            console.log("list content is ", (addedListli[i].firstChild).textContent);
            console.log("I want to add", textbox.value);
            //Making the list Case insensitive  
            if ((addedListli[i].firstChild.textContent.trim()).toUpperCase() == (textbox.value).toUpperCase()) {
                console.log("setting duplicate item to false")
                window.alert("This item already exists!");
                duplicateItem = true;
            }

        }
        // If item is not duplicate, add it, else skip it
        if (duplicateItem == false) {
            li.appendChild(document.createTextNode(' ' + textbox.value));
            li.appendChild(delBtn);
            addedListul.appendChild(li);            
        }
        textbox.value = '';
        textbox.focus;
        return;
    }
    else {
        window.alert("Please enter a item to add!");
        return;
    }
}
function handleDeleteItem(event) {
    event.preventDefault();
    let li = event.target.closest('li');
    console.log("in delete li is", li)
    if (window.confirm("Are you sure you want to delete this item?")) {
        if (event.target.tagName === 'BUTTON') {
            //get the content of list without the text of delete button
            let itemText = li.firstChild.textContent.trim();
            let divList = document.getElementById('crossList');
            let ul = divList.querySelector('#crossUl')
            let crossListLi = ul.querySelectorAll('li');
            let duplicateChk = false;
            crossListLi.forEach(compLi => {
                //checking for duplicate entry
                console.log("Cross off list is", compLi.firstChild.textContent.toUpperCase());
                console.log("item to be deleted is", itemText.toUpperCase());
                if (compLi.firstChild.textContent.toUpperCase() == itemText.toUpperCase()) {
                    console.log("There is a dupliacte entry")
                    duplicateChk = true;
                }

            });
            if (duplicateChk == false) {
                let newli = document.createElement('li');
                let liText = document.createTextNode('' + itemText);
                newli.appendChild(liText);
                ul.appendChild(newli);
                ul.classList.add('strikethrough');
                divList.appendChild(ul);
            }
            let newdiv = document.getElementById('crossList');
            let newliItem = newdiv.querySelectorAll('li');
            console.log("new li is ", newliItem);
            newliItem.forEach(eachli => {
                eachli.addEventListener('click', handleAddCrossItem);
            });
            li.remove();
        }
    }
    return;
}

function handleAddCrossItem(event) {
    console.log("this is where i clicked", event.target.textContent);

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

    let crossedListul = document.getElementById('addedList');
    console.log("added list ul is", crossedListul);
    let crossedListli = crossedListul.getElementsByTagName('li');
    console.log("added list li is", crossedListli);
    let duplicateItem = false;
    delBtn.setAttribute('id', `delbtn${crossedListli.length + 1}`)
    for (let i = 0; i < crossedListli.length; i++) {
        console.log("list content is ", (crossedListli[i].firstChild).textContent);
        console.log("I want to add", event.target.textContent);
        //Making the list Case insensitive  
        if ((crossedListli[i].firstChild.textContent.trim()).toUpperCase() == (event.target.textContent).toUpperCase()) {
            console.log("setting duplicate item to false")
            window.alert("This item already exists!");
            duplicateItem = true;
        }


    }
    // If item is not duplicate, add it, else skip it
    if (duplicateItem == false) {
        li.appendChild(document.createTextNode(' ' + event.target.textContent));
        li.appendChild(delBtn);
        crossedListul.appendChild(li);
    }
    event.target.remove();
    textbox.focus();
    return;
}

