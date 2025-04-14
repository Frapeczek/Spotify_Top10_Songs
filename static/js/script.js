document.addEventListener("DOMContentLoaded", function() {

    const header = document.querySelector("header");

    // Function to handle scroll event
    function handleScroll() {
        // Get the current scroll position
        const scrollPosition = window.scrollY;

        // Set timeout to delay the animation
        setTimeout(function() {
            // If scroll position is greater than 0, remove header with smooth transition, otherwise add it
            if (scrollPosition > 15) {
                header.style.transition = "top 0.3s ease-in-out";
                header.style.top = "-100px"; // Move header off screen
            } else{
                header.style.transition = "top 0.3s ease-in-out";
                header.style.top = "0"; // Move header back to top of screen
            }
        }, 100); // Adjust the delay time here (in milliseconds)
    }

    // Listen for scroll event and call handleScroll function
    window.addEventListener("scroll", handleScroll);
});


document.addEventListener('DOMContentLoaded', function() {
    var toggler = document.getElementById('nav-toggler');
    var navMenu = document.getElementById('nav-menu');

    toggler.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
});


// ADD TO YOUR FAVOURITES
// CLICK FAVOURITE ARTIST IN HEADER TO DIRECT TO ARTIST PAGE
//     document.addEventListener('DOMContentLoaded', function() {
//         // Get references to DOM elements
//         const addToFavoritesBtn = document.getElementById('add-to-favorites');
//         const favoritesList = document.getElementById('favorites-list');
//         const favoritesToggler = document.getElementById('favorites-toggler');
//
//         // Load favorites from localStorage
//         let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//
//         // Function to update the favorites list in the DOM
//         function updateFavoritesList() {
//             favoritesList.innerHTML = '';
//             favorites.forEach(artist => {
//                 const li = document.createElement('li');
//                 li.textContent = artist;
//                 li.addEventListener('click', () => {
//                     window.location.href = `/artist/${encodeURIComponent(artist)}`;
//                 });
//                 favoritesList.appendChild(li);
//             });
//         }
//
//         // Add event listener to the "Add to Favorites" button
//         if (addToFavoritesBtn) {
//             addToFavoritesBtn.addEventListener('click', function() {
//                 const artist = this.getAttribute('data-artist');
//                 if (!favorites.includes(artist)) {
//                     favorites.push(artist);
//                     localStorage.setItem('favorites', JSON.stringify(favorites));
//                     updateFavoritesList();
//                 }
//             });
//         }
//
//         // Toggle the visibility of the favorites list
//         favoritesToggler.addEventListener('click', function() {
//             favoritesList.classList.toggle('show');
//         });
//
//         // Initial call to update the favorites list
//         updateFavoritesList();
//     });

    // JavaScript to handle adding, displaying, and deleting favorites
    document.addEventListener('DOMContentLoaded', function() {
        // Get references to DOM elements
        const addToFavoritesBtn = document.getElementById('add-to-favorites');
        const favoritesList = document.getElementById('favorites-list');
        const favoritesToggler = document.getElementById('favorites-toggler');

        // Load favorites from localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Function to update the favorites list in the DOM
        function updateFavoritesList() {
            favoritesList.innerHTML = '';
            favorites.forEach(artist => {
                const li = document.createElement('li');
                li.className = 'favorite-item';
                li.innerHTML = `
                    <span class="favorite-artist">${artist}</span>
                    <button class="delete-btn">Delete</button>
                `;
                li.querySelector('.favorite-artist').addEventListener('click', () => {
                    window.location.href = `/artist/${encodeURIComponent(artist)}`;
                });
                li.querySelector('.delete-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    removeFavorite(artist);
                });
                favoritesList.appendChild(li);
            });
        }

        // Add event listener to the "Add to Favorites" button
        if (addToFavoritesBtn) {
            addToFavoritesBtn.addEventListener('click', function() {
                const artist = this.getAttribute('data-artist');
                if (!favorites.includes(artist)) {
                    favorites.push(artist);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    updateFavoritesList();
                }
            });
        }

        // Toggle the visibility of the favorites list
        favoritesToggler.addEventListener('click', function() {
            favoritesList.classList.toggle('show');
        });

        // Remove favorite from the list
        function removeFavorite(artist) {
            favorites = favorites.filter(fav => fav !== artist);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesList();
        }

        // Initial call to update the favorites list
        updateFavoritesList();
    });