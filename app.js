const textInput = document.querySelector('form');
const wacka = document.querySelector('.inputsauda');
const FilterTasks = document.querySelector('.filter');
const ClearTasks = document.querySelector('.clear');
const unorderedList = document.querySelector('.list');

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded',getItemsFromLocalStorage);
    textInput.addEventListener('submit',addTask);
    unorderedList.addEventListener('click',removeTask);
    ClearTasks.addEventListener('click',clearAllTasks);
    FilterTasks.addEventListener('keyup',searchTasks);
}

function getItemsFromLocalStorage(){
    let todolist;
    if(localStorage.getItem('todolist')===null){
        todolist=[];
    } else {
        todolist=JSON.parse(localStorage.getItem('todolist'))
    }
    todolist.forEach(function(item){
        const containerOne = document.createElement('li');
        containerOne.className='pseudo';
        const textNode = document.createTextNode(item);
        containerOne.appendChild(textNode);
        containerTwo = unorderedList.appendChild(containerOne);
        containerThree=document.createElement('a');
        
        containerThree.innerHTML='<a href="#" class="linkerr"><input type="button" class="pseudo2" value="Delete" style="float: right ; color:slateblue ; background-color: turquoise"></a><hr>'
        
        containerTwo.appendChild(containerThree);
    });
    
}

function addTask(e){
    if(wacka.value==='')
    {
        alert('Add something First!!!')
    }
    else {
    const containerOne = document.createElement('li');
    containerOne.className='pseudo';
    const textNode = document.createTextNode(wacka.value);
    containerOne.appendChild(textNode);
    containerTwo = unorderedList.appendChild(containerOne);
   containerThree=document.createElement('a');
   
   containerThree.innerHTML='<a href="#" class="linkerr"><input type="button" class="pseudo2" value="Delete" style="float: right ; color:slateblue ; background-color: turquoise"></a><hr>'
   
   containerTwo.appendChild(containerThree);
   saveToLocalStorage(wacka.value);
    e.preventDefault();    
        }
    }

function saveToLocalStorage(todo){
    if(localStorage.getItem('todolist')===null){
        todolist=[];
    } else {
        todolist=JSON.parse(localStorage.getItem('todolist'))
    }
    todolist.push(todo);
    localStorage.setItem('todolist',JSON.stringify(todolist));

}

function removeTask(e){
    if(e.target.parentElement.classList.contains('linkerr')){
        if(confirm('Are you sure'))
        {
            e.target.parentElement.parentElement.parentElement.remove();
            removeFromLocalStorage(e.target.parentElement.parentElement.parentElement);
        }
    }    
}

function removeFromLocalStorage(itemToBeRemoved){
    if(localStorage.getItem('todolist')===null){
        todolist=[];
    } else {
        todolist=JSON.parse(localStorage.getItem('todolist'))
    }
    todolist.forEach(function(item,index){
        if(itemToBeRemoved.textContent==item){
            todolist.splice(index,1);
        }
    });
    localStorage.setItem('todolist',JSON.stringify(todolist));
}

function clearAllTasks(e){
    document.querySelector('.second').innerHTML='';
    localStorage.clear();
    document.location.reload(true);
    
}

function searchTasks(e){
    const text= e.target.value.toLowerCase();
    document.querySelectorAll('.pseudo').forEach(function (task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }        
    });
}
