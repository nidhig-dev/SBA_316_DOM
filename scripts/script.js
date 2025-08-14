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
