document.addEventListener('DOMContentLoaded', function() {
    const books = [
        {
            title: "8 Dorja 9 Kuthuri",
            cover: "8dorja 9 kuthuri.jpg",
            pdf: "8 Dorja 9 Kuthori by Samaresh Majumdar -  (BDeBooks.Com).pdf"
        },
        {
            title: "1952",
            cover: "1952.jpg",
            pdf: "1952 by Mohammad Nazim Uddin  (BDeBooks.Com).pdf"
        },
        {
            title: "Hajar Bochor Dhore",
            cover: "Hajar Bochor Dhore.jpg",
            pdf: "Hajar Bochor Dhore By Zahir Raihan   (BDeBooks.Com).pdf",
        },
        {
            title: "A Tale Of Two Cities Bangla Onubad Book",
            cover: "A Tale Of Two Cities Bangla Onubad Book.jpg",
            pdf: "A Tale Of Two Cities by Charles Dickens   (BDeBooks.Com).pdf"
        },
        {
            title: "Abaro Tuntuni O Abaro Chotacchu",
            cover: "Abaro Tuntuni O Abaro Chotacchu.jpg",
            pdf: "Abaro Tuntuni O Abaro Chotacchu Muhammad Zafar Iqbal   (BDeBooks.Com).pdf"
        },
        {
            title: "Agantuk",
            cover: "Agantuk.jpg",
            pdf: "Agantuk by Sri Swapan Kumar -  (BDeBooks.Com).pdf"
        },
         {
            title: "Baghbondi Misir Ali By Humayun Ahmed",
            cover: "Baghbondi Misir Ali.jpg",
            pdf: "13 Baghbondi Misir Ali By Humayun Ahmed   (BDeBooks.Com).pdf"
        },
        
    ];

       const bookContainer = document.getElementById('bookContainer');
    const sortAZButton = document.getElementById('sortAZ');
    const showPopularButton = document.getElementById('showPopular');
    const showSavedButton = document.getElementById('showSaved');
    const searchBox = document.getElementById('searchBox');
    const dropdownContent = document.querySelector('.dropdown-content');

    function displayBooks(filteredBooks) {
        bookContainer.innerHTML = '';
        filteredBooks.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';

            const bookImg = document.createElement('img');
            bookImg.src = book.cover;
            bookImg.alt = book.title;

            const bookTitle = document.createElement('div');
            bookTitle.className = 'book-title';
            bookTitle.innerText = book.title;

            const saveButton = document.createElement('button');
            saveButton.className = 'save-button';
            saveButton.innerText = 'Save for Later';
            saveButton.addEventListener('click', (e) => {
                e.stopPropagation();
                saveBook(book);
            });

            bookDiv.appendChild(bookImg);
            bookDiv.appendChild(bookTitle);
            bookDiv.appendChild(saveButton);
            bookContainer.appendChild(bookDiv);

            bookDiv.addEventListener('click', () => {
                window.open(book.pdf, '_blank');
            });
        });
    }

    function saveBook(book) {
        let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
        if (!savedBooks.some(savedBook => savedBook.title === book.title)) {
            savedBooks.push(book);
            localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
            alert('Book saved!');
        } else {
            alert('Book already saved!');
        }
    }

    function getSavedBooks() {
        return JSON.parse(localStorage.getItem('savedBooks')) || [];
    }

    sortAZButton.addEventListener('click', () => {
        const sortedBooks = books.slice().sort((a, b) => a.title.localeCompare(b.title));
        displayBooks(sortedBooks);
    });

    showPopularButton.addEventListener('click', () => {
        const popularBooks = books.filter(book => book.popular);
        displayBooks(popularBooks);
    });

    showSavedButton.addEventListener('click', () => {
        const savedBooks = getSavedBooks();
        if (savedBooks.length > 0) {
            displayBooks(savedBooks);
        } else {
            alert('No saved books found!');
        }
    });

    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
        displayBooks(filteredBooks);
    });

    // Display all books initially
    displayBooks(books);

    // Show dropdown content upon clicking the ||| icon
    document.querySelector('.header-right p').addEventListener('click', function() {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
});