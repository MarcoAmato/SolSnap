import React, { useState, useEffect } from 'react';
import vincentium_broken from '../img/vincentium_broken.jpg';
import loading_spinner from '../img/loading-spinner.gif';
import '../css/Style.css';
import { Button } from 'reactstrap';


function Home() {

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  // const uploadPhoto = () => {
  //   setLoading(true);
  //   setMessage('Shot in progress...');
  //   setPhoto('');

  //   setTimeout(() => {
  //     setLoading(false);
  //     setPhoto(vincentium_broken);
  //     setMessage('Photo taken correctly!');
  //   }, 3000); // 3000 milliseconds = 3 seconds
  // };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file); // This should now be correctly typed
    } else {
      setSelectedFile(null); // Ensure you can also reset to null if needed
    }
  };

  const uploadPhoto = async () => {
    if (!selectedFile) {
      setMessage('No file selected');
      return;
    }
    setLoading(true);
    setMessage('Uploading...');
    const formData = new FormData();
    formData.append('picture', selectedFile);
    formData.append('name', 'NFT Name');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-nft`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setPhoto(data.url); // Assuming the response contains the URL of the uploaded photo
        setMessage('Photo uploaded successfully!');
      } else {
        setMessage('Upload failed');
      }
    } catch (error) {
      setMessage('Upload failed with error');
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = () => {
    setPhoto('');
    setMessage('');
  };



  return (
    <>

      <div className="App">
        <header className="App-header">

          <h1>Create your NFT Photo NFT an a Snap</h1>
          <p>This is the homepage of the website</p>

          <div id="upload-photo">

            <input type="file" accept="image/*" onChange={handleFileSelect}/>

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

                <Button onClick={deletePhoto}>Delete Photo</Button>
              </>
            )}

          </div>

          {/*This is where the uploaded photo will be displayed.
        A loading spinner will be displayed here until the photo is uploaded along with a message
        saying "Uploading photo..."  */}


        </header>
      </div>
    </>
  );
}

export default Home;
