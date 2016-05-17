export default class DataStore {
    constructor() {
        this.store = [];
    }
    
    add(todoItem) {
        this.store.push(todoItem);
    }
    
    remove(todoItem) {
        let index = this.store.indexOf(todoItem);
        
        if (index !== -1) {
            this.store.splice(index, 1);            
        }
    }
    
    filter(filterText) {
       return this.store.filter(function(todoItem) {
          return todoItem.todo.toLowerCase().indexOf(filterText.toLowerCase()) > -1 || todoItem.date.toLowerCase().indexOf(filterText.toLowerCase()) > -1; 
       });
    }
}