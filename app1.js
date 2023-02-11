const output = document.querySelector('.output');

const reloadButton = document.createElement('button');
reloadButton.textContent = 'Oh no! Come back, people!';
reloadButton.addEventListener('click', reloader);
document.body.append(reloadButton);

const nameInput = document.createElement('input');
const addPeople = document.createElement('button');
const divAdd = document.createElement('div');
divAdd.append(nameInput);
divAdd.append(addPeople);
addPeople.textContent = 'Add a silly person!';
nameInput.setAttribute('placeholder', 'name');
document.body.append(divAdd);

addPeople.addEventListener('click', addToList);

let myList = [];
let localData = localStorage.getItem('myList');

window.addEventListener('DOMContentLoaded', () => {
    
    if(localData){
        myList = JSON.parse(localStorage.getItem('myList'));
        maker();
    }else{
        reloader();
    }
});

function addToList(){
    let newName = '';
    nameInput.value.length > 0 ? newName = nameInput.value : newName = 'This'
    const newPerson = {
        "name" : newName,
        "silly" : true
    }

    const newPersonIndex = myList.length;
    myList.push(newPerson);
    savetoStorage();
    makeList(newPerson, newPersonIndex);
}

function reloader(){
    fetch('list.json').then(rep => rep.json()).then((data) => {
        myList = data;
        maker();
        savetoStorage();
    });
}

function maker(){
    output.innerHTML = '';
    myList.forEach((element, index) => {
        makeList(element, index);
    });
}

function makeList(item, index){
    const div = document.createElement('div');
    div.classList.add('box');
    output.append(div);

    if(item.silly){
        div.innerHTML = `${item.name} is silly.`;
        div.classList.add('isSilly');
    }else{
        div.innerHTML = `${item.name} is not silly.`;
        div.classList.add('notSilly');
    }

    const span = document.createElement('span');
    span.textContent = 'gtfo';
    div.append(span);
    span.addEventListener('click', (element) =>{
        element.stopPropagation();
        div.remove();
        myList.splice(index, 1)
        savetoStorage();
    });

    div.addEventListener('click', (element) => {
        div.classList.toggle('isSilly');
        div.classList.toggle('notSilly');

        if(div.classList.contains('isSilly')){
            myList[index].silly = true;
            div.innerHTML = `${item.name} is silly.`;
            div.append(span);
        }else{
            myList[index].silly = false;
            div.innerHTML = `${item.name} is not silly.`;
            div.append(span);
        }
        savetoStorage();
    });

}

function savetoStorage(){
    localStorage.setItem('myList', JSON.stringify(myList));
}
