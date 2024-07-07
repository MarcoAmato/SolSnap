import React, { useState, useEffect } from 'react';
import '../css/Style.css';
import { Button } from 'reactstrap';
import vincentium_broken from '../img/vincentium_broken.jpg';
import img1 from '../img/1.png';
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
    setPhoto(img1);
    setuploadeffected(false);
  };

  const uploadPhoto = async () => {
    setUploading(true);
    setuploadeffected(false);
    setuploaderror(false);
    // Create a new File instance for testing
    const testFile = new File([img1], img1, { type: 'image/png' });

    if (!testFile) {
      setMessage('No file selected');
      return;
    }
    setLoading(true);
    setMessage('Uploading...');
    console.log('Uploading photo:', testFile.name);
    setPhoto(img1);

    const formData = new FormData(); // Collect the data to send to the server
    formData.append('picture', testFile);
    formData.append('name', 'NFT Name');
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
        console.log('NFT Image URL:', data.url);
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
