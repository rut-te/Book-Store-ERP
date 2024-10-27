const loadDataBtn = document.getElementById("loadData");
loadDataBtn.addEventListener("click", () => {
    loadData();
});

const addNewBook = document.getElementById("newBook");
addNewBook.addEventListener("click", () => {
    createForm();
});

function createTableTitle() {
    const newRow = document.createElement("tr");
    for (let i = 1; i <= 4; i++) {
        const newCell = document.createElement("td");
        newCell.className="tableTitle";
        if (i === 1) {
            newCell.textContent = `id`;
        }
        if (i === 2) {
            newCell.innerHTML = `title`;
            newCell.innerHTML += `<button onclick="sortByTitle()">🔻</button>`;

        }
        if (i === 3) {
            newCell.innerHTML = `price`;
            newCell.innerHTML += `<button onclick="sortByPrice()">🔻</button>`;
        }
        if (i === 4) {
            newCell.innerHTML = `action`;

        }
        newRow.appendChild(newCell);
    }
    return newRow;
}

function createRow(book) {
    const newRow = document.createElement("tr");
    for (let i = 1; i <= 4; i++) {
        const newCell = document.createElement("td");
        if (i === 1) {
            newCell.textContent = `${book.id}`;
        }
        if (i === 2) {
            newCell.textContent = `${book.title}`;
        }
        if (i === 3) {
            newCell.textContent = `${book.price}`;
        }
        if (i === 4) {
            newCell.innerHTML = `<button onclick="readBook(${book.id})">Read</button>`;
            newCell.innerHTML += `<button onclick="updateBook(${book.id})">Update</button>`;
            newCell.innerHTML += `<button onclick="deleteBook(${book.id},this)">Delete</button>`;
        }
        newRow.appendChild(newCell);
    }
    return newRow;
}

function addPaging() {
    const data = JSON.parse(localStorage.getItem("booksData"));
    currentPage = 1;
    totalPages = Math.ceil(data.length / booksPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
            currentPage = pageButton.textContent;
            renderBooksTable(data);
        });
        pagination.appendChild(pageButton);
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
    }
}

function addNextAndBackButtons() {
    const nextButton = document.getElementById("nextButton");
    const backButton = document.getElementById("backButton");

    backButton.addEventListener("click", () => {
        if (currentPage - 1 > 0) {
            currentPage--;
            const data = JSON.parse(localStorage.getItem("booksData"));
            renderBooksTable(data);
        }
    });

    nextButton.addEventListener("click", () => {

        if (Number(currentPage) + 1 <= totalPages) {
            currentPage++;
            const data = JSON.parse(localStorage.getItem("booksData"));
            renderBooksTable(data);
        }
    });

}

function createForm(bookDetails) {
    console.log(bookDetails);

    const formDiv = document.createElement('div');
    formDiv.id = 'productForm';

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'title:';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    if (bookDetails && bookDetails.title)
        titleInput.value = bookDetails.title;

    const priceLabel = document.createElement('label');
    priceLabel.textContent = 'price:';
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.id = 'price';
    if (bookDetails && bookDetails.price)
        priceInput.value = bookDetails.price;

    const rateLabel = document.createElement('label');
    rateLabel.textContent = 'rate:';
    const rateInput = document.createElement('input');
    rateInput.type = 'number';
    rateInput.id = 'rate';
    rateInput.min = 1;
    rateInput.max = 10;
    if (bookDetails && bookDetails.rate)
        rateInput.value = bookDetails.rate;

    const imgUrlLabel = document.createElement('label');
    imgUrlLabel.textContent = 'imgUrl:';
    const imgUrlInput = document.createElement('input');
    imgUrlInput.type = 'text';
    imgUrlInput.id = 'imgUrl';
    if (bookDetails && bookDetails.imgUrl)
        imgUrlInput.value = bookDetails.imgUrl;

    const submitButton = document.createElement('button');
    submitButton.textContent = 'שליחה';
    submitButton.addEventListener('click', () => submitDetails(bookDetails.id));

    formDiv.appendChild(titleLabel);
    formDiv.appendChild(titleInput);
    formDiv.appendChild(document.createElement('br'));

    formDiv.appendChild(priceLabel);
    formDiv.appendChild(priceInput);
    formDiv.appendChild(document.createElement('br'));

    formDiv.appendChild(rateLabel);
    formDiv.appendChild(rateInput);
    formDiv.appendChild(document.createElement('br'));

    formDiv.appendChild(imgUrlLabel);
    formDiv.appendChild(imgUrlInput);
    formDiv.appendChild(document.createElement('br'));

    formDiv.appendChild(submitButton);

    renderBookDetailsWindow(formDiv);

}

function submitDetails(bookId) {
    console.log(bookId);

    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const rate = document.getElementById('rate').value;
    const imgUrl = document.getElementById('imgUrl').value;

    if (title && price && rate && imgUrl) {
        const newBook = {
            id: bookId ? bookId : nextId++,
            title: title,
            price: price,
            rate: rate,
            imgUrl: imgUrl
        };

        let booksArr = JSON.parse(localStorage.getItem("booksData"));
        if (booksArr.find(book => book.id === bookId)) {
            booksArr = booksArr.filter(book => book.id !== bookId);
        }
        booksArr.push(newBook);
        booksArr.sort((a, b) => a.id - b.id);
        console.log(booksArr);

        localStorage.setItem("booksData", JSON.stringify(booksArr));

        clearDivToDisplayWindow();
        addPaging();
        renderBooksTable(booksArr);
        alert('הפעולה התבצעה בהצלחה!');

    } else {
        alert('אנא מלא/י את כל השדות.');
    }
}

function readBook(bookId) {
    const bookDetails = booksArr.find(book => book.id === bookId);
    const bookDetailsDiv = document.createElement('div');
    bookDetailsDiv.classList.add('productContainer');
    const titleElement = document.createElement('h2');
    titleElement.textContent = bookDetails.title;
    const priceElement = document.createElement('p');
    priceElement.textContent = `price: ₪${bookDetails.price}`;
    const imgElement = document.createElement('img');
    imgElement.src = bookDetails.imgUrl;
    imgElement.alt = 'img';
    const rateElement = document.createElement('p');
    rateElement.textContent = `rate: ${bookDetails.rate}`;
    rateElement.className='rateElement'
    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => {
        console.log(bookDetails.rate);
        
        bookDetails.rate = Math.min(Number(bookDetails.rate) + 1, 10); 
        rateElement.textContent = `rate: ${bookDetails.rate}`;
        updateRateInLocalStorage(bookDetails.rate,bookId);
    });

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => {
        bookDetails.rate = Math.max(bookDetails.rate - 1, 0); 
        rateElement.textContent = `rate: ${bookDetails.rate}`;
        updateRateInLocalStorage(bookDetails.rate,bookId);
    });

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('rating-buttons');
    buttonsDiv.appendChild(decreaseButton);
    buttonsDiv.appendChild(increaseButton);

    bookDetailsDiv.appendChild(titleElement);
    bookDetailsDiv.appendChild(priceElement);
    bookDetailsDiv.appendChild(imgElement);
    bookDetailsDiv.appendChild(rateElement);
    bookDetailsDiv.appendChild(buttonsDiv);

    renderBookDetailsContainer(bookDetailsDiv);
}

function updateRateInLocalStorage(rate,bookId) {
    const bookToUpdate = booksArr.find(book => book.id === bookId);
    bookToUpdate.rate = rate;
    localStorage.setItem("booksData", JSON.stringify(booksArr));
}

function updateBook(bookId) {
    let booksArr = JSON.parse(localStorage.getItem("booksData"));
    const bookToUpdate = booksArr.find(book => book.id === bookId);
    createForm(bookToUpdate);
}

function deleteBook(bookId, button) {
    dynamicBooksArr = booksArr.filter(book => book.id !== bookId);
    localStorage.setItem("booksData", JSON.stringify(dynamicBooksArr));
    console.log(dynamicBooksArr);
    renderBooksTableInDelete(button);
}

function loadData() {
    data = booksArr;
    localStorage.setItem("booksData", JSON.stringify(data));
    renderBooksTable(data);
    addPaging();
}

function sortByTitle() 
{
    let booksArr= JSON.parse(localStorage.getItem("booksData"));
    booksArr.sort((a, b) => a.title.localeCompare(b.title));
    localStorage.setItem("booksData", JSON.stringify(booksArr));
    renderBooksTable(booksArr);
}

function sortByPrice() 
{
    let booksArr= JSON.parse(localStorage.getItem("booksData"));
    booksArr.sort((a, b) => a.price - b.price);
    localStorage.setItem("booksData", JSON.stringify(booksArr));
    renderBooksTable(booksArr);
}
