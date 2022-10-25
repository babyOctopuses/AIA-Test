import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

function Flickr() {
  const [picture, setPicture] = useState();
  const [textInput, setTextInput] = useState("");

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
        "&safe_search=3&per_page=100&format=json&nojsoncallback=2"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (j) {
        let picArray = j.photos.photo.map((pic) => {
          var srcPath =
            "https://farm" +
            pic.farm +
            ".staticflickr.com/" +
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
  };

  const HandleChange = (e) => {
    setTextInput(e.target.value);
  };

  useEffect(() => ReloadImages(), []);

  return (
    <div className="App">
      <div>
        <p>
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            className="textInput"
            onChange={HandleChange}
            onKeyUp={() => Delay(ReloadImages(), 500)}
          />
        </p>
      </div>
      <p>{picture}</p>
    </div>
  );
}

export default Flickr;
