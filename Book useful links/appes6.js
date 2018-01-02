class Book {
    constructor(title,url,comment){
        this.title = title;
        this.url = url;
        this. comment = comment;
    }
}
class UI{
    addLinkToList(book) {
        const list = document.getElementById('book-list');
        //Create tr element
        const row = document.createElement('tr');
        console.log(row);
        // insert cols 
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.url}</td>
            <td>${book.comment}</td>
            <td><a href="#" class="delete">&#9747;</a></td> `;

        list.appendChild(row);
    }
    showAlert(message, className) {
        const newdiv = document.createElement('div');
        newdiv.className = `alert ${className}`;
        // Add text node
        newdiv.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get Form
        const form = document.querySelector('#book-form');
        // Insert Alert
        container.insertBefore(newdiv, form);
    
        // Timeout 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    
    }

    deleteBook(target) {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('url').value = '';
        document.getElementById('comment').value = '';
    }
}

/**
 * LocalStorage class
 */
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null){
             books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static  displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => {
            const ui = new UI;
            
            // add book to UI
             ui.addLinkToList(book);
        });
    }
    static addLink(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static  removeBook(comment) {
        // console.log(comment);
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.comment === comment){
               books.splice(index, 1);
            }
            localStorage.setItem('books', JSON.stringify(books));
           
        });
    }
}

// Dom Load Event 
document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Event Listener for add link
document.getElementById('book-form').addEventListener('submit', (e) => {
    // Get Fields
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const comment = document.getElementById('comment').value;

    // console.log(title, url, comment);
   
    const book = new Book(title,url,comment);   // Instatiate Book object
  
    // Instatiate UI object
    const ui = new UI();
    // console.log(ui);

    //Validate
    if(title === '' || url === '' || comment === ''){
    // Error alert
      const alertmessage = 'Please fill in all fields';
      ui.showAlert(alertmessage, 'error');

    }else{
         // Add Link to list
        ui.addLinkToList(book);

        // add to local storage
        Store.addLink(book);

        // Show success
        ui.showAlert('the link added','success');
    
        //clear fields
        ui.clearFields(book);
    
    }
    e.preventDefault();
});

// Event Listeners for delete
document.getElementById('book-list').addEventListener('click',(e) => {
    // Instatiate UI object
    const ui = new UI();
    ui.deleteBook(e.target);

    // remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show message delete
    ui.showAlert('link removed','success');

e.preventDefault();
});
 