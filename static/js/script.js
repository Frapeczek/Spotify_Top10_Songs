
document.addEventListener("DOMContentLoaded", function() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    window.onload = function() {
        loading.style.display = 'none';
    };

    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const artistName = document.getElementById('artist-name').value.trim();
        if (artistName) {
            const encodedArtistName = encodeURIComponent(artistName.replace(/ /g, '_'));
            window.location.href = '/' + encodedArtistName;
        }
    });
});

// Wait for the DOM to be fully loaded
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Select the header element
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



