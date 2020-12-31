let myLibrary = []

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function () {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read

}

function addBooktoLibrary(Book){
    myLibrary.push(Book)

}

function displayBooks(myLibrary){
    // Will display whatever is in the array when pages first loads. When user adds a new directory in the app, it will only update that new row



    numOfDisplayedRows = (document.querySelector("#booktable").getElementsByTagName("tr").length) - 2
    for (book of myLibrary){
        //skip rows already displayed

        if (myLibrary.indexOf(book) >= 0 &&  myLibrary.indexOf(book) <= numOfDisplayedRows){
            continue
        }


        booktable = document.getElementById("booktable").getElementsByTagName("tbody")[0]

        newRow = document.createElement("tr")
        newRow.id = myLibrary.indexOf(book).toString()
    
        newTitle = document.createElement("td")
        newAuthor = document.createElement("td")
        newPages = document.createElement("td")
        newReadStatus = document.createElement("td")
        newButton = document.createElement("td")

        readstatuscheckbox = document.createElement("input")
        readstatuscheckbox.type = 'checkbox'
        readstatuscheckbox.classList.add("checkboxReadStatus")
        if (book.read){
            readstatuscheckbox.checked = "true"
        }
        newReadStatus.classList.add("checkboxReadStatusDiv")

        
        removeButton = document.createElement("button")
        

        newTitle.classList.add("tableborder")
        newAuthor.classList.add("tableborder")
        newPages.classList.add("tableborder")
        newButton.classList.add("removeButtonDiv")
        removeButton.classList.add("removeButton")

    
        newTitle.innerHTML = book.title
        newAuthor.innerHTML = book.author
        newPages.innerHTML = book.pages
        removeButton.innerHTML = "-"

        newReadStatus.appendChild(readstatuscheckbox)
        newButton.appendChild(removeButton)
    
        newRow.appendChild(newTitle)
        newRow.appendChild(newAuthor)
        newRow.appendChild(newPages)
        newRow.appendChild(newReadStatus)
        newRow.appendChild(newButton)
        
    
        booktable.appendChild(newRow)



    }

}

function toggleRemoveBookButton() {
    let removeRowButton = document.querySelectorAll(".removeButtonDiv")
    if (removeRowButton){
        for (row of removeRowButton){
            if (row.style.display === "none" || row.style.display === ""){
                row.style.display = "block";
            }
            else{
                row.style.display = "none"
            }
            
        }
    }
}

function updateBookTableRowIds(){
    let booktable = document.querySelector("#booktable")
    rowsHtmlCollection = booktable.getElementsByTagName("tr")
    
    //convert html collection to array
    rowsArray = [].slice.call(rowsHtmlCollection);
    rowsArray.splice(0,1)

    for (row of rowsArray){
        row.id = rowsArray.indexOf(row)

    }



}


// main

let modal = document.querySelector(".modal");

let addBookButton = document.querySelector("#addBook")
let removeBookButton = document.querySelector("#removeBook")
let span = document.getElementsByClassName("close")[0];
let form = document.querySelector("#bookForm");
let submitButton = document.querySelector("#bookSubmitButton");

if (localStorage.getItem("books") != null && localStorage.getItem("books") != ""){
    myLibrary = JSON.parse(localStorage.getItem("books"))

}

displayBooks(myLibrary)





// events

addBookButton.onclick = function() {
    modal.style.display = "block";
}

submitButton.onclick = function(event) {
    event.preventDefault()
    newBook = new Book(form.bookTitle.value, form.bookAuthor.value, form.bookPages.value, form.readStatus.checked)

    
    addBooktoLibrary(newBook)
    localStorage.setItem("books", JSON.stringify(myLibrary))

    displayBooks(myLibrary)

}


removeBookButton.onclick = function(){
    toggleRemoveBookButton()
}

document.addEventListener("click", function(e){
    if (e.target.parentElement && e.target.parentElement.className == 'removeButtonDiv'){
          
        myLibrary.splice(e.target.parentElement.parentElement.id, 1)
        console.log(e.target.parentElement.parentElement.id)
        console.log(myLibrary)
        e.target.parentElement.parentElement.remove()
        updateBookTableRowIds()
        localStorage.setItem("books", JSON.stringify(myLibrary))

     }

     if  (e.target.className ==="checkboxReadStatus"){
         if (e.target.checked === true){
            myLibrary[e.target.parentElement.parentElement.id].read = "true"

         }
         else {
            myLibrary[e.target.parentElement.parentElement.id].read = "false"
            console.log(e.target.parentElement.parentElement.id)

         }
         
     }
})


span.onclick = function() {
modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        console.log(event.target)
      modal.style.display = "none";
    }
  }




