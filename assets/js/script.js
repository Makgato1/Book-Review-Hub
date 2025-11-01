// JS Functionalities: 1. Search filter, 2. Form validation, 3. Hover effects (already in CSS, but add dynamic), 4. Modal for reviews, 5. Language toggle, 6. Star rating input, 7. Local storage for reviews

// Language data
const translations = {
    en: {
        welcome: "Welcome to BookReview Hub",
        searchPlaceholder: "Search for a book...",
        searchBtn: "Search",
        recentReviews: "Recent Reviews",
        aboutTitle: "About BookReview Hub",
        aboutDesc1: "BookReview Hub is your go-to platform for discovering and reviewing books. We believe in the power of stories to inspire, educate, and entertain. Our community of readers shares their thoughts on timeless classics and modern masterpieces alike.",
        aboutDesc2: "Explore books like Beauty and the Beast, Pride and Prejudice, and many more. Search for your favorites, read reviews, and share your own insights.",
        contactTitle: "Contact Us",
        contactDesc: "Have questions or suggestions? Reach out to us!",
        nameLabel: "Name:",
        emailLabel: "Email:",
        messageLabel: "Message:",
        sendBtn: "Send Message",
        reviewBtn: "Review This Book",
        reviewerName: "Your Name:",
        ratingLabel: "Rating (1-5):",
        reviewText: "Review:",
        submitBtn: "Submit Review",
        successMsg: "Thank you for your review!",
        noReviews: "No reviews yet. Be the first to review a book!",
        home: "Home",
        about: "About",
        contact: "Contact",
        language: "Language"
    },
    af: {
        welcome: "Welkom by BookReview Hub",
        searchPlaceholder: "Soek vir 'n boek...",
        searchBtn: "Soek",
        recentReviews: "Onlangse Resensies",
        aboutTitle: "Oor BookReview Hub",
        aboutDesc1: "BookReview Hub is jou eerste keuse platform vir die ontdekking en resensie van boeke. Ons glo in die krag van stories om te inspireer, op te voed en te vermaak. Ons gemeenskap van lesers deel hul gedagtes oor tydlose klassieke en moderne meesterwerke.",
        aboutDesc2: "Verken boeke soos Beauty and the Beast, Pride and Prejudice, en vele meer. Soek vir jou gunstelinge, lees resensies, en deel jou eie insigte.",
        contactTitle: "Kontak Ons",
        contactDesc: "Het jy vrae of voorstelle? Kontak ons!",
        nameLabel: "Naam:",
        emailLabel: "E-pos:",
        messageLabel: "Boodskap:",
        sendBtn: "Stuur Boodskap",
        reviewBtn: "Resenseer Hierdie Boek",
        reviewerName: "Jou Naam:",
        ratingLabel: "Gradering (1-5):",
        reviewText: "Resensie:",
        submitBtn: "Dien In",
        successMsg: "Dankie vir jou resensie!",
        noReviews: "Geen resensies nog nie. Wees die eerste om 'n boek te resenseer!",
        home: "Tuis",
        about: "Oor",
        contact: "Kontak",
        language: "Taal"
    }
};

// Current language
let currentLang = 'en';

// Books data
const books = [
    {
        "title": "Beauty and the Beast",
        "author": "Jeanne-Marie Leprince de Beaumont",
        "description": "A tale of a prince cursed to live as a beast until he finds true love.",
        "cover": "assets/images/book-covers/beauty-beast.jpg"
    },
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "description": "A romantic novel about Elizabeth Bennet and Mr. Darcy.",
        "cover": "assets/images/book-covers/pride-prejudice.jpg"
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "description": "A story of the Jazz Age and the American Dream.",
        "cover": "assets/images/book-covers/great-gatsby.jpg"
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "description": "A novel about racial injustice in the American South.",
        "cover": "assets/images/book-covers/to-kill-mockingbird.jpg"
    },
    {
        "title": "1984",
        "author": "George Orwell",
        "description": "A dystopian novel about totalitarianism and surveillance.",
        "cover": "assets/images/book-covers/1984.jpg"
    }
];

// Reviews data - load from localStorage
let reviews = JSON.parse(localStorage.getItem('bookReviews')) || [];

// Load books function
function loadBooks() {
    const booksList = document.getElementById('books-list');
    if (booksList) {
        booksList.innerHTML = '';
        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            bookDiv.innerHTML = `
                <img src="${book.cover}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.description}</p>
                <button class="review-btn" data-book="${book.title}">Review This Book</button>
            `;
            const bookReviews = reviews.filter(r => r.book === book.title);
            if (bookReviews.length > 0) {
                bookDiv.innerHTML += `<div class="book-reviews"><a href="#" class="view-reviews-link" data-book="${book.title}">View Reviews (${bookReviews.length})</a></div>`;
            }
            booksList.appendChild(bookDiv);
        });
    }
}

// Load books
loadBooks();

// Load books table
function loadBooksTable() {
    const tableBody = document.querySelector('#books-table tbody');
    if (tableBody) {
        tableBody.innerHTML = '';
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${book.cover}" alt="${book.title}"></td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.description}</td>
                <td><button class="review-btn" data-book="${book.title}">Review This Book</button></td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Load books table
loadBooksTable();

// Function to generate star rating display
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

// Load reviews
function displayReviews() {
    const reviewsDisplay = document.getElementById('reviews-display');
    if (reviewsDisplay) {
        if (reviews.length === 0) {
            reviewsDisplay.innerHTML = '<p>No reviews yet. Be the first to review a book!</p>';
        } else {
            reviewsDisplay.innerHTML = '<button id="clear-reviews-btn">Delete All My Reviews</button><ul>' + reviews.slice().reverse().map((r, index) => `
                <li>
                    <h4>${r.book} - ${r.name} ${generateStars(r.rating)}</h4>
                    <p>${r.review}</p>
                    <small>${r.date}</small>
                </li>
            `).join('') + '</ul>';
        }
    }
}
if (document.getElementById('reviews-display')) {
    displayReviews();
}

// Clear reviews functionality and view reviews modal
document.addEventListener('click', function(e) {
    if (e.target.id === 'clear-reviews-btn') {
        if (confirm('Are you sure you want to clear all reviews? This action cannot be undone.')) {
            reviews = [];
            localStorage.removeItem('bookReviews');
            displayReviews();
            loadBooks(); // Reload books to remove reviews from books
        }
    } else if (e.target.classList.contains('delete-review-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        showDeleteConfirmModal(function() {
            reviews.splice(index, 1);
            localStorage.setItem('bookReviews', JSON.stringify(reviews));
            displayReviews();
            loadBooks(); // Reload books to update review counts
        });
    } else if (e.target.classList.contains('view-reviews-link')) {
        e.preventDefault();
        const bookTitle = e.target.getAttribute('data-book');
        showBookReviewsModal(bookTitle);
    }
});

// 1. Search functionality
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const books = document.querySelectorAll('.book');
        books.forEach(book => {
            const title = book.querySelector('h3').textContent.toLowerCase();
            if (title.includes(query)) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    });
}

// 2. Form validation and AJAX submission for contact form
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // AJAX submission
        const formData = new FormData(this);
        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessModal(data.message);
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
}

// Function to show success modal
function showSuccessModal(message, onClose) {
    const modal = document.createElement('div');
    modal.id = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Review Submitted!</h2>
            <p>${message}</p>
            <button id="success-ok-btn">OK</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal and call onClose callback
    const closeModal = function() {
        modal.remove();
        if (onClose) onClose();
    };

    modal.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('success-ok-btn').addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Function to show delete confirmation modal
function showDeleteConfirmModal(onConfirm) {
    const modal = document.createElement('div');
    modal.id = 'delete-confirm-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review? This action cannot be undone.</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="delete-yes-btn">Yes, Delete</button>
                <button id="delete-no-btn">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal
    const closeModal = function() {
        modal.remove();
    };

    modal.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('delete-no-btn').addEventListener('click', closeModal);

    // Confirm delete
    document.getElementById('delete-yes-btn').addEventListener('click', function() {
        closeModal();
        onConfirm();
    });

    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}



// 3. Hover effects (dynamic enhancement)
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Mobile hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            const navUl = this.nextElementSibling;
            navUl.classList.toggle('open');
        });
    }
});

// 4. Modal for reviews
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('review-btn')) {
        const bookTitle = e.target.getAttribute('data-book');
        showReviewModal(bookTitle);
    }
});



// 5. Language toggle
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updatePageLanguage();
}

function updatePageLanguage() {
    const t = translations[currentLang];

    // Update hero
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1) heroH1.textContent = t.welcome;

    // Update search
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.textContent = t.searchBtn;

    // Update reviews section
    const reviewsH2 = document.querySelector('.reviews h2');
    if (reviewsH2) reviewsH2.textContent = t.recentReviews;

    // Update about page
    const aboutH1 = document.querySelector('.about h1');
    if (aboutH1) aboutH1.textContent = t.aboutTitle;
    const aboutP1 = document.querySelector('.about p:nth-child(2)');
    if (aboutP1) aboutP1.textContent = t.aboutDesc1;
    const aboutP2 = document.querySelector('.about p:nth-child(3)');
    if (aboutP2) aboutP2.textContent = t.aboutDesc2;

    // Update contact page
    const contactH1 = document.querySelector('.contact h1');
    if (contactH1) contactH1.textContent = t.contactTitle;
    const contactP = document.querySelector('.contact p');
    if (contactP) contactP.textContent = t.contactDesc;

    // Update form labels
    const nameLabel = document.querySelector('label[for="name"]');
    if (nameLabel) nameLabel.textContent = t.nameLabel;
    const emailLabel = document.querySelector('label[for="email"]');
    if (emailLabel) emailLabel.textContent = t.emailLabel;
    const messageLabel = document.querySelector('label[for="message"]');
    if (messageLabel) messageLabel.textContent = t.messageLabel;
    const sendBtn = document.querySelector('#contact-form button');
    if (sendBtn) sendBtn.textContent = t.sendBtn;

    // Update navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks.length >= 3) {
        navLinks[0].textContent = t.home;
        navLinks[1].textContent = t.about;
        navLinks[2].textContent = t.contact;
    }

    // Update review buttons
    const reviewBtns = document.querySelectorAll('.review-btn');
    reviewBtns.forEach(btn => btn.textContent = t.reviewBtn);

    // Update no reviews message
    const noReviewsP = document.querySelector('#reviews-display p');
    if (noReviewsP && reviews.length === 0) noReviewsP.textContent = t.noReviews;
}

// Add language toggle button to header
const header = document.querySelector('header');
if (header) {
    const langToggle = document.createElement('div');
    langToggle.className = 'lang-toggle';
    langToggle.innerHTML = `
        <button id="lang-en" class="${currentLang === 'en' ? 'active' : ''}">EN</button>
        <button id="lang-af" class="${currentLang === 'af' ? 'active' : ''}">AF</button>
    `;
    header.appendChild(langToggle);

    document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));
    document.getElementById('lang-af').addEventListener('click', () => switchLanguage('af'));
}

// Load saved language
const savedLang = localStorage.getItem('language');
if (savedLang) {
    currentLang = savedLang;
    updatePageLanguage();
}

// 6. Star rating input
function createStarRating(container, inputId) {
    const stars = document.createElement('div');
    stars.className = 'star-rating';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '☆';
        star.dataset.rating = i;
        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            document.getElementById(inputId).value = rating;
            updateStars(stars, rating);
        });
        stars.appendChild(star);
    }
    container.appendChild(stars);
}

function updateStars(container, rating) {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.textContent = index < rating ? '★' : '☆';
    });
}

// Update review modal to include star rating
function showReviewModal(bookTitle) {
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'review-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Review ${bookTitle}</h2>
            <form id="review-form" action="reviews.php" method="post">
                <input type="hidden" name="book" value="${bookTitle}">
                <label for="reviewer-name">Your Name:</label>
                <input type="text" id="reviewer-name" name="name" required>
                <label for="rating">Rating:</label>
                <div id="star-rating-container"></div>
                <input type="hidden" id="rating" name="rating" required>
                <label for="review-text">Review:</label>
                <textarea id="review-text" name="review" required></textarea>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Add star rating
    const ratingContainer = document.getElementById('star-rating-container');
    createStarRating(ratingContainer, 'rating');

    // Close modal
    modal.querySelector('.close').addEventListener('click', function() {
        modal.remove();
    });

    // Submit review
    document.getElementById('review-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const book = formData.get('book');
        const name = formData.get('name');
        const rating = formData.get('rating');
        const review = formData.get('review');
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        reviews.push({ book, name, rating, review, date });
        localStorage.setItem('bookReviews', JSON.stringify(reviews));

        showSuccessModal(`Thank you, ${name}! Your review has been submitted.`, function() {
            loadBooks(); // Reload books to show new reviews immediately
        });
        modal.remove();
    });
}

// Function to show book reviews modal
function showBookReviewsModal(bookTitle) {
    const bookReviews = reviews.filter(r => r.book === bookTitle);
    const modal = document.createElement('div');
    modal.id = 'book-reviews-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Reviews for ${bookTitle}</h2>
            <ul>${bookReviews.slice().reverse().map((r, index) => `<li><h5>${r.name} ${generateStars(r.rating)}</h5><p>${r.review}</p><small>${r.date}</small></li>`).join('')}</ul>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal
    modal.querySelector('.close').addEventListener('click', function() {
        modal.remove();
    });

    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}


