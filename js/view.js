window.onload = () => {
    
    let data = JSON.parse(localStorage.getItem("booksData"));
    if (!data) {
        data =  booksArr;
        localStorage.setItem("booksData", JSON.stringify(data));
    }

    addPaging (data);
    renderBooksTable(data);
    addNextAndBackButtons(data);   
};

let currentPage;
let totalPages;
const booksPerPage = 5;

function renderBooksTable(data)
{
    const booksPerPage = 5;
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const tableBody = document.getElementById("booksTable");
    tableBody.innerHTML = "";
    const tableTitle=createTableTitle();
    tableBody.appendChild(tableTitle);
    data.slice(startIndex, endIndex).forEach(book => {
        const newRow = createRow(book);
        tableBody.appendChild(newRow);
    });
}

function renderBooksTableInDelete(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    const data = JSON.parse(localStorage.getItem("booksData"));
    addPaging(data);
    renderBooksTable(data);
}

function renderBookDetailsWindow(formDiv){
    const newBookWindow=document.getElementById("divToDisplayWindow");
    newBookWindow.innerHTML='';
    newBookWindow.appendChild(formDiv);
}

function clearDivToDisplayWindow(){
    const newBookWindow=document.getElementById("divToDisplayWindow");
    newBookWindow.innerHTML='';
}

function renderBookDetailsContainer(bookDetailsDiv)
{
    const bookDetailsContainer = document.getElementById('divToDisplayWindow');
    bookDetailsContainer.innerHTML = '';
    bookDetailsContainer.appendChild(bookDetailsDiv);
}
    

