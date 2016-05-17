import DataStore from './dataStore';
import TodoItem from './todoItem';
import TodoDomList from './todoDomList';

const applicationMessages = {
    fillInMessage: 'please fill in this field',
    required: '* required'
};

class Application {   
    constructor() {
        this.store = new DataStore();
        this.todoDom = new TodoDomList();
        this.setupEvents();
    }

    setupEvents() {
        document.getElementById('btnAdd').addEventListener('click', this.btnAddClicked.bind(this));
        document.getElementById('btnDelete').addEventListener('click', this.btnDeleteClicked.bind(this));
        document.getElementById('btnDone').addEventListener('click', this.btnDoneClicked.bind(this));
        
        document.getElementById('edtTodo').addEventListener('change', this.validateTodo.bind(this));        
        document.getElementById('edtDate').addEventListener('change', this.validateDate.bind(this)); 
        document.getElementById('edtFilter').addEventListener('change', this.filter.bind(this));
        
        this.printValidationMessage('groupTodo');       
        this.printValidationMessage('groupDate');
    }
    
    validateTodo() {       
        this.printValidationMessage('groupTodo');
    }
    
    validateDate() {              
        this.printValidationMessage('groupDate');
    }

    printValidationMessage(groupId) {
        const groupTodo = document.getElementById(groupId);

        let input = groupTodo.querySelector('input');
        let span = groupTodo.querySelector('span');

        if (input.value.length === 0) {
            this.setRequiredMessage(span.id, applicationMessages.fillInMessage);
        }
        else {
            this.setRequiredMessage(span.id, applicationMessages.required, false);            
        }        
    }
    
    filter() {
        let filterText = this.filterText;
        
        if (filterText.length === 0) {
            this.todoDom.showThese(this.store.store);
        }
        else {
            let filterResults = this.store.filter(filterText);
            this.todoDom.showThese(filterResults);            
        }
    }
   
    btnAddClicked() {
        let todoText = this.todoText;
        let dateText = this.dateText;

        if (todoText.length === 0) {
            this.setRequiredMessage('spanTodoMessage', applicationMessages.fillInMessage);
            return;
        }

        if (dateText.length === 0) {
            this.setRequiredMessage('spanDateMessage', applicationMessages.fillInMessage);
            return;
        }
        
        let todoItem = new TodoItem(todoText, dateText);
        this.store.add(todoItem);
        this.todoDom.add(todoItem);
        
        let todoElement = document.getElementById('edtTodo')
        todoElement.focus();
        todoElement.value = "";
    }    

    btnDeleteClicked() {
        let todoList = document.getElementById('todoList');
        
        this.getSelectedItems(todoList).then((selectedListItems) => {
            window.requestAnimationFrame(() => {
                for(let listItem of selectedListItems) {
                    let todoItem = this.todoDom.remove(listItem);
                    this.store.remove(todoItem);
                }
            });
        });
    }
    
    btnDoneClicked() {
        let todoList = document.getElementById('todoList');
         
        this.getSelectedItems(todoList).then((selectedListItems) => {
            window.requestAnimationFrame(() => {
                for(let listItem of selectedListItems) {
                    listItem.className = 'done';
                }
            });                    
        });        
    }
    
    getSelectedItems(todoList) {
        return new Promise((resolve) => {
            const selectedListItems = [];
            
            window.requestAnimationFrame(() => {
                let checkedItems = todoList.querySelectorAll('input:checked');

                for (let i = 0; i < checkedItems.length; i++) {
                    selectedListItems.push(checkedItems[i].parentElement);                                
                }            
            });

            resolve(selectedListItems);            
        });
    }

    setRequiredMessage(elementName, message, isError = true) {
        let spanTodoMessage = document.getElementById(elementName);
        spanTodoMessage.textContent = message;
        spanTodoMessage.className = isError ? 'error' : '';
    }

    get todoText() {
        return document.getElementById('edtTodo').value;
    }

    get dateText() {
        return document.getElementById('edtDate').value;
    }
    
    get filterText() {
        return document.getElementById('edtFilter').value;
    }
}

new Application();


