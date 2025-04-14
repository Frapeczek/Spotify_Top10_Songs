const API_URL = "https://api.quotable.io/random";

const quoteContainer = document.querySelector(".quote");
const newQuoteBtn = document.querySelector('.new-quote-btn');

newQuoteBtn.addEventListener('click', getQuote);

async function getQuote() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        quoteContainer.innerHTML = `<p>${data.content}</p>
            <cite>${data.author}</cite>`
    } catch (error) {

    }
}

