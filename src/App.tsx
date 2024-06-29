import React from 'react';
import vincentium_broken from './img/vincentium_broken.jpg';
import loading_spinner from './img/loading-spinner.gif';
import './App.css';
import { useState, useEffect } from "react";

function App() {

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const [message, setMessage] = useState('');

  const uploadPhoto = () => {
    setLoading(true);
    setMessage('Shot in progress...');
    setPhoto('');

    setTimeout(() => {
      setLoading(false);
      setPhoto(vincentium_broken);
      setMessage('Photo taken correctly!');
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const deletePhoto = () => {
    setPhoto('');
    setMessage('');
  };



  return (
    <div className="App">
      <header className="App-header">

        <h1>Create your NFT Photo NFT an a Snap</h1>
        <p>This is the homepage of the website</p>

        <div id="upload-photo">

          <button onClick={uploadPhoto}>Take a photo</button>

          {loading && (
            <>
              <br />

              <img src={loading_spinner} className='marginTop' width="50" height="50" />
            </>
          )}

          {message && <p>{message}</p>}

          {/* {photo && <img src={photo} alt="Uploaded photo" width="500" height="500" />} */}

          {photo && (
          <>
          <img src={photo} alt="Uploaded photo" width="500" height="500" />
            <br />

            <button onClick={deletePhoto}>Delete Photo</button>
          </>
          )}

        </div>

        {/*This is where the uploaded photo will be displayed.
            A loading spinner will be displayed here until the photo is uploaded along with a message 
            saying "Uploading photo..."  */}


      </header>
    </div>
  );
}

export default App;
