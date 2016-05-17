export default class TodoDomList {
    constructor() {
        this.domMap = new WeakMap();
        this.todoList = document.getElementById('todoList');
    }
    
    add(todoItem) {
        let element = document.createElement('li');
        element.innerHTML =
        `
            <input type="checkbox" id="chbSelection"></input>
            <span id="spanTodo">${todoItem.todo}</span>
            <span id="spanDate">${todoItem.date}</span>
        `;
               
        this.todoList.appendChild(element);
        this.domMap.set(element, todoItem);
    }
    
    remove(element) {
        if (this.domMap.has(element)) {
            let todoItem = this.domMap.get(element);

            this.domMap.delete(element);            
            this.todoList.removeChild(element);
            
            return todoItem;    
        }
    }
    
    showThese(todoItems) {
        window.requestAnimationFrame(() => {
           while(this.todoList.firstChild) {
               this.todoList.removeChild(this.todoList.firstChild);
           }
           
           if (todoItems instanceof Array) {
                for(let todoItem of todoItems) {
                    this.add(todoItem);
                }               
           }
           else {
               this.add(todoItems);
           }
        });
    }    
}