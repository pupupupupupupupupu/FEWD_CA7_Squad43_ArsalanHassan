import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instagram from "./images/I_logo.png";
import linkedIn from "./images/L_logo.png";
import github from "./images/G_logo.png";
import bookImg from "./images/book.png";
import Book from "./Book";

function HomePage() {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState(true);
  var displayName = sessionStorage.getItem("Name");
  const SearchedData = () => {
    var dataToAppend = [];
    Data.forEach((item) => {
      item.books.map((bookData) => {
        if (
          (bookData.title.toLowerCase().startsWith(query.toLowerCase()) &&
            !dataToAppend.includes(bookData)) ||
          (bookData.author.toLowerCase().startsWith(query.toLowerCase()) &&
            !dataToAppend.includes(bookData))
        ) {
          dataToAppend.push(
            <Book
              key={bookData.amazon_product_url}
              title={bookData.description}
              source={bookData.book_image ? bookData.book_image : bookImg}
              label={bookData.title}
              Author={bookData.author}
              amazonLink={bookData.amazon_product_url}
            />
          );
        }
      });
    });
    if (dataToAppend.length !== 0) {
      return <div id="bookCollectionGrid">{dataToAppend}</div>;
    } else {
      return (
        <div id="NoresultSpace">
          <h1>
            Sorry, No Results Found <span>:(</span>
          </h1>
        </div>
      );
    }
  };
  useEffect(() => {
    axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=WankjAhcmyxxdC7X9B0G88QmqIQY2Z26"
      )
      .then((res) => {
        setData(res.data.results.lists);
        console.log(res.data.results.lists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
    if (search !== "") {
      setQuery(search);
      setSearchStatus(false);
    } else if (search === "") {
      setQuery(search);
      setSearchStatus(true);
    }
  };
  console.log(displayName === null);
  return searchStatus ? (
    <>
      <header>
        <h1>Bookstore</h1>
        <div className="searchField">
          <input
            type="text"
            value={search}
            placeholder="Search by book/author name"
            onChange={handleChange}
          />
          <button id="buttonOnclick" onClick={handleClick}>
            SEARCH
          </button>
        </div>
        {displayName === null ? (
          <Link to="form">
            <button id="register">REGISTER </button>
          </Link>
        ) : (
          <div className="welcomeText">
            <h2>Hey {displayName}</h2>
          </div>
        )}
      </header>
      <div id="bookCollectionGrid">
        {Data.map((item) =>
          item.books.map((bookData) => (
            <Book
              key={bookData.amazon_product_url}
              title={bookData.description}
              source={bookData.book_image ? bookData.book_image : bookImg}
              label={bookData.title}
              Author={bookData.author}
              amazonLink={bookData.amazon_product_url}
            />
          ))
        )}
      </div>
      <hr />
      <footer>
        <h2>
          MADE WITH <span>SWEAT</span> BY A TALENTED FELLOW
        </h2>
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/emilia_clarke/?hl=en"
          >
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="https://in.linkedin.com/" target="_blank" rel="noreferrer">
            <img src={linkedIn} alt="LinkedIn" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/pupupupupupupupupu"
          >
            <img src={github} alt="Github" />
          </a>
        </div>
      </footer>
    </>
  ) : (
    <>
      <header>
        <h1>Kalvium Books</h1>
        <div className="searchField">
          <input
            type="text"
            value={search}
            placeholder="Search by book/author name"
            onChange={handleChange}
          />
          <button id="buttonOnclick" onClick={handleClick}>
            SEARCH
          </button>
        </div>
        {displayName === null ? (
          <Link to="form">
            <button>Register Now</button>
          </Link>
        ) : (
          <div className="welcomeText">
            <h5>Hey {displayName}</h5>
          </div>
        )}
      </header>
      {SearchedData()}
      <hr />
      <footer>
        <h2>
          Made with <span>❤</span> by a Kalvian
        </h2>
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/emilia_clarke/?hl=en"
          >
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="https://in.linkedin.com/" target="_blank" rel="noreferrer">
            <img src={linkedIn} alt="LinkedIn" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/pupupupupupupupupu"
          >
            <img src={github} alt="Github" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
