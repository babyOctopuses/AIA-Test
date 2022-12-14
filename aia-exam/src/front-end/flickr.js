import React, { useState, useEffect } from "react";
import { ButtonGroup, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Flickr() {
  const [picture, setPicture] = useState([]);
  const [textInput, setTextInput] = useState("people");
  const [indexValue, setIndexValue] = useState(0);

  const Delay = () => {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  };

  const ReloadImages = () => {
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0767ed418992f33fae56d50a82525e92&tags=" +
        textInput +
        "&per_page=50&safe_search=3&format=json&nojsoncallback=1"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (j) {
        let picArray = j.photos.photo.map((pic) => {
          var srcPath =
            "https://live.staticflickr.com/" +
            pic.server +
            "/" +
            pic.id +
            "_" +
            pic.secret +
            ".jpg";
          return <img alt="dogs" src={srcPath}></img>;
        });
        setPicture(picArray);
        setIndexValue(0);
      });
  };

  const HandleChange = (e) => {
    setTextInput(e.target.value);
  };

  const NextHandler = () => {
    let currentIndex = indexValue;
    if (currentIndex === 49) {
      currentIndex = 0;
    } else currentIndex++;
    setIndexValue(currentIndex);
  };

  const PrevHandler = () => {
    let currentIndex = indexValue;
    if (currentIndex === 0) {
      currentIndex = 49;
    } else currentIndex--;
    setIndexValue(currentIndex);
  };

  useEffect(() => {
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=0767ed418992f33fae56d50a82525e92&per_page=50&safe_search=1&format=json&nojsoncallback=1"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (j) {
        let picArray = j.photos.photo.map((pic) => {
          var srcPath =
            "https://live.staticflickr.com/" +
            pic.server +
            "/" +
            pic.id +
            "_" +
            pic.secret +
            ".jpg";
          return <img alt="dogs" src={srcPath}></img>;
        });
        setPicture(picArray);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          className="textInput"
          onChange={HandleChange}
          size="small"
        />
        <Button onClick={() => Delay(ReloadImages(), 100)}>Search</Button>
      </div>
      <div>
        <p>Picture #{indexValue}</p>
      </div>
      <div className="pictureClass">
        <div>{picture[indexValue]}</div>
      </div>
      <div>
        <ButtonGroup>
          <Button variant="contained" onClick={PrevHandler}>
            <ArrowBackIosNewIcon />
            <p>Prev</p>
          </Button>
          <Button variant="contained" onClick={NextHandler} color="secondary">
            <ArrowForwardIosIcon />
            <p>Next</p>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Flickr;
