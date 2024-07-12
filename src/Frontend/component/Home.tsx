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
  const [photostart, setPhotoStart] = useState('');
  const [photostartboolean, setPhotoStartBoolean] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');



  useEffect(() => {
    setPhotoStart(smartphone);
  }, []);

  // const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     setSelectedFile(file); // This should now be correctly typed
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPhoto(reader.result as string); // Convert selected file into data URL
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setSelectedFile(null); // Ensure you can also reset to null if needed
  //     setPhoto(null); // Reset photo when no file is selected
  //   }
  // };

  const takePhoto = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
    const newImage = `${IMAGE_FOLDER}${randomNumber}.png`;
    console.log('New image:', newImage);
    setPhoto(newImage);
    setuploadeffected(false);
    setPhotoStartBoolean(false);
  };

  const uploadPhoto = async (
    image: File,
    name: string,
    description: string,
    symbol: string
  ) => {
    if (!selectedFile) {
      setMessage('No file selected');
      return;
    }
    
    setUploading(true);
    setuploadeffected(false);
    setuploaderror(false);
    setLoading(true);
    setMessage('Uploading...');
    console.log('Uploading photo:', name);

    setPhoto(photo);
    setPhotoStartBoolean(false);

    const formData = new FormData(); // Collect the data to send to the server
    formData.append('picture', image);
    formData.append('name', 'NFT Name');
    formData.append('description', 'Pinga ponga');

    // NFT Image URL: /img/10.png
    // Remove the /img/ part of the URL
    // const src = photo.replace(IMAGE_FOLDER, '');
    // formData.append('src', src);

    
    const mockMetadata = {
      name: name,
      symbol: symbol,
      description: description
    };

    try {

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-nft`, {
        method: 'POST',
        body: JSON.stringify(mockMetadata),
      });

      if (response.ok) {
        const result = await response.json();
        // log data in prettier format
        console.log(JSON.stringify(result, null, 2));
        
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
    setPhoto('');
    setMessage('');
    setPhotoStartBoolean(true);
  };

  const takeNewPhoto = () => {
    setPhoto('');
    setPhotoStartBoolean(true);
    setMessage('');
    setUploading(false);
    setuploaderror(false);
  };

  return (
    <>

      <div className="App">
        <header className="App-header">

          <h1>Create your NFT Photo</h1>
          <p>Solsnap</p>

          <div id="upload-photo">

            <div className="containerPhoto">
              <img src={photostart} className="image1" />
            </div>
            <br />
            {photostartboolean && (
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

            {!photostartboolean && (
              <>
                {/* Photo is located in img folder */}
                {/*                 <img src={photo} alt="Uploaded photo" width="650" height="350" />
                <br /> */}



                {!upload ? (
                  <>
                    {/* <Button className='marginRight' onClick={uploadPhoto}>Upload photo</Button> */}
                    <Button className='marginRight' onClick={() => selectedFile && uploadPhoto(selectedFile, 'NFT Name', 'Pinga ponga', 'NFT')}>Upload photo</Button>
                    <Button onClick={deletePhoto}>Delete Photo</Button>
                  </>
                ) : (
                  <>
                  </>
                )}


                {uploaderror ? (
                  <>
                    <Button className='marginRight' onClick={() => selectedFile && uploadPhoto(selectedFile, 'NFT Name', 'Pinga ponga', 'NFT')}>Upload again</Button>
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
