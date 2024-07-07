import React, { useState, useEffect } from 'react';
import '../css/Style.css';
import { Button } from 'reactstrap';
import smartphone from '../img/smartphone.png';
import loading_spinner from '../img/loading-spinner.gif';
import { IMAGE_FOLDER } from '../../constants';

function Home() {

  const [loading, setLoading] = useState(false);
  const [upload, setUploading] = useState(false);
  const [uploadeffected, setuploadeffected] = useState(false);
  const [uploaderror, setuploaderror] = useState(false);
  const [photo, setPhoto] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');



  useEffect(() => {
    setPhoto(smartphone);
  }, []);

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

  const takePhoto = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
    const newImage = `${IMAGE_FOLDER}${randomNumber}.png`;
    console.log('New image:', newImage);
    setPhoto(newImage);
    setuploadeffected(false);
  };

  const uploadPhoto = async () => {
    setUploading(true);
    setuploadeffected(false);
    setuploaderror(false);
    // Create a new File instance for testing
    const image = new File([photo], photo, { type: 'image/png' });

    if (!image) {
      setMessage('No file selected');
      return;
    }
    setLoading(true);
    setMessage('Uploading...');
    console.log('Uploading photo:', image.name);
    setPhoto(photo);

    const formData = new FormData(); // Collect the data to send to the server
    formData.append('picture', image);
    formData.append('name', 'NFT Name');
    formData.append('description', 'Pinga ponga');

    // NFT Image URL: /img/10.png
    // Remove the /img/ part of the URL
    const src = photo.replace(IMAGE_FOLDER, '');
    formData.append('src', src);
    try {
      // Delay the upload to simulate a real-world scenario
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-nft`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        // log data in prettier format
        console.log(JSON.stringify(data, null, 2));

        // log id
        console.log('NFT ID:', data.id);
        // log name
        console.log('NFT Name:', data.name);
        // log img url in backend
        console.log('NFT Image URL:', data.src);
        setMessage('Photo uploaded successfully!');
      } else {
        setMessage('Upload failed');
      }
    } catch (error) {
      setMessage('Upload failed with error');
      setuploaderror(true);
    } finally {
      setLoading(false);
      setuploadeffected(true);
    }
  };

  const deletePhoto = () => {
    setPhoto(smartphone);
    setMessage('');
  };

  const takeNewPhoto = () => {
    setPhoto(smartphone);
    setMessage('');
    setUploading(false);
    setuploaderror(false);
  };

  return (
    <>

      <div className="App">
        <header className="App-header">

          <h1>Create your NFT Photo NFT an a Snap</h1>
          <p>This is the homepage of the website</p>

          <div id="upload-photo">
            <img src={photo} width="650" height="350" />
            <br />
            {photo == smartphone && (
              <>
                {/* Photo is located in img folder */}
                {/*                 <img src={photo} alt="Uploaded photo" width="650" height="350" />
                <br /> */}
                <Button onClick={takePhoto}>Take a photo</Button>
              </>
            )}


            {loading && (
              <>
                <br />
                <img src={loading_spinner} className='marginTop' width="50" height="50" />
              </>
            )}

            {message && <p>{message}</p>}

            {photo != smartphone && (
              <>
                {/* Photo is located in img folder */}
                {/*                 <img src={photo} alt="Uploaded photo" width="650" height="350" />
                <br /> */}



                {!upload ? (
                  <>
                    <Button className='marginRight' onClick={uploadPhoto}>Upload photo</Button>
                    <Button onClick={deletePhoto}>Delete Photo</Button>
                  </>
                ) : (
                  <>
                  </>
                )}


                {uploaderror ? (
                  <>
                    <Button className='marginRight' onClick={uploadPhoto}>Upload again</Button>
                  </>
                ) : (
                  <>
                  </>
                )}

                {uploadeffected ? (
                  <>
                    <Button onClick={takeNewPhoto}>Take a new Photo</Button>
                  </>
                ) : (
                  <>
                  </>
                )}


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
