const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('twitter-btn');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoader(){
loader.hidden=false;
quoteContainer.hidden=true;
}

// hide loader
function hideLoader(){
quoteContainer.hidden=false;
loader.hidden=true;
}

function getRandomQuote(){
    showLoader();
    const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blanck and replace it with unknown
    
    author.innerText = randomQuote.author
    // check quote length to determine styling
    if (randomQuote.text.length>120){
        quote.classList.add('long-quote');
    }
    else {
        quote.classList.remove('long-quote');
    }
    quote.textContent= randomQuote.text;
    hideLoader();
};

// get quotes from API
async function getQuotesFromApi(){
    showLoader()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes= await response.json();
        getRandomQuote();
    } catch (error) {
    //    catch error here 
    }

}
// show tweet window
function tweetPostWindow(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blanck')
}


newQuoteBtn.addEventListener('click' , getRandomQuote);
tweetBtn.addEventListener('click',tweetPostWindow)
getQuotesFromApi();
