let textbox = document.getElementById('textbox');
let btnAdd = document.querySelector('#btn');
btnAdd.addEventListener('click', handleAddItems);
let arrGroceries = [
    { ItemName: 'Tomatoes' },
    { ItemName: 'Onion' },
    { ItemName: 'Lettuce' },
    { ItemName: 'Apple' },
];

// Creating a crossed off from array list using document fragment
let divList = document.getElementById('crossList');
let h2 = document.createElement('h2');
h2.textContent = 'Crossed off';
h2.style.paddingLeft = '43px';
h2.style.backgroundColor = 'rgba(0, 128, 0, 0.74)';
divList.appendChild(h2);
// for each element in the array, call the document fragment function
let loadUl=document.createElement('ul');
loadUl.setAttribute('id','crossUl');
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
   // let div = document.getElementById('crossList')
    // let ul = div.querySelector('ul');

    let li = document.createElement('li');
    let liText = document.createTextNode('' + Item.ItemName);
    li.appendChild(liText);
    // ul.appendChild(li);
    // get the ul list before adding listener to it

    // document.getElementById('crossList').firstChild.addEventListener('click', handleCrossOff);
    // ul.classList.toggle('strikethrough');
    frag.appendChild(li);
    // frag.appendChild(ul)
    // let hr = document.createElement('hr');
    // hr.style.backgroundColor = 'rgba(105, 105, 105, 0.22)';
    // hr.style.border = 'none';
    // hr.style.height = '1px';
    // frag.appendChild(hr);

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
    // if text box is empty then pop a window alert
    if (textbox.value) {
        console.log(textbox.value);
        // let ul = document.querySelector('ul');
        // console.log(ul)
        let li = document.createElement('li');
        // let checkbox = document.createElement('input')
        // checkbox.setAttribute('type','checkbox');
        // checkbox.setAttribute('name','checkbox');
        // li.appendChild(checkbox);
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
            // let hr = document.createElement('hr');
            // hr.style.backgroundColor = 'rgba(105, 105, 105, 0.22)';
            // hr.style.border = 'none';
            // hr.style.height = '1px';
            // addedListul.appendChild(hr);


        }
        textbox.value = '';
        textbox.focus;
        return;
    }
    else {
        window.alert("enter a list item");
        return;
    }
}
