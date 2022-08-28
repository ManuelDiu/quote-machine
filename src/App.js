import React, {useEffect, useState} from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons' 
import { faQuoteLeftAlt, faQuoteRightAlt } from '@fortawesome/free-solid-svg-icons' 



let quotesDB = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

/* Random colors array, used for the main color of the app. */ 
var colorsArray = [];
while (colorsArray.length < 100) {
  do {
      var color = Math.floor((Math.random()*1000000)+1);
  } while (colorsArray.indexOf(color) >= 0);
  colorsArray.push("#" + ("000000" + color.toString(16)).slice(-6));
}

function App() {
  const [quote, setQuote] = useState("It is never too late to be what you might have been.");
  const [author, setAuthor] = useState("George Eliot");
  const [rnumber, setRnumber] = useState(0);
  const [quotesArray, setQuotesArr] = useState(null);
  const [actualColor, setActualColor] = useState('#282c34');
  
  const fetchQuotes = async(link) => {
    const response = await fetch(link);
    const formattedJSON = await response.json();
    setQuotesArr(formattedJSON.quotes);
  };
  
  useEffect(() => {
    fetchQuotes(quotesDB);
  }, [quotesDB])


  const getRandomQuote = () => {
    let randomnumber = Math.floor(quotesArray.length * Math.random());
    setRnumber(randomnumber);
    setActualColor(colorsArray[randomnumber]);
    setQuote(quotesArray[randomnumber].quote);
    setAuthor(quotesArray[randomnumber].author);
  }
  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:actualColor, color:actualColor}}>
        <div id='quote-box' style={{color:actualColor}}>
          <p id='text'><FontAwesomeIcon icon ={faQuoteLeftAlt}/> {quote} <FontAwesomeIcon icon ={faQuoteRightAlt}/></p>
          <p id='author'>- {author}</p>
          <div className='buttons'>
            <a id='tweet-quote' style={{backgroundColor:actualColor}} href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon ={faTwitter} /></a>
            <button id='new-quote' style={{backgroundColor:actualColor}} onClick={() => getRandomQuote()}>New Random Quote</button>
          </div>
        </div>
        <p className='fingerPrint'>by Manuel Diu</p>
      </header>
    </div>
  );
}

export default App;
