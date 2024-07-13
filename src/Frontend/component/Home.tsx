import React, { useState, useEffect } from 'react';
import '../css/Style.css';
import { Button, Form, FormGroup, Input } from 'reactstrap';
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

  const takePhoto = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
    const newImage = `${IMAGE_FOLDER}${randomNumber}.png`;
    console.log(`New image: ${newImage}`);

    setPhoto(newImage);
    // Assuming newImage is a path string, create a File object for it
    fetch(newImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `photo${randomNumber}.png`, { type: 'image/png' });
        console.log(`New image file: ${file}. Size = ${file.size}`);
        setSelectedFile(file);
      })
      .catch(error => console.error('Error fetching image:', error));
    setuploadeffected(false);
    setPhotoStartBoolean(false);
  };

  const uploadPhoto = async (
    image: File,
    name: string,
    description: string,
    symbol: string
  ) => {
    // if image size is 0, return
    if (image.size === 0) {
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
    formData.append('name', name);
    formData.append('description', description);
    formData.append('symbol', symbol);

    try {

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-nft`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(JSON.stringify(result, null, 2));

        setMessage('Photo uploaded successfully!');
      } else {
        console.error('Failed to upload photo:', response);
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
              <img src={photo ?? ''} className="image2" />
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

                    
                    <Form>

                      <FormGroup>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Inserisci titolo"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          id="symbol"
                          name="symbol"
                          placeholder="Inserisci simbolo"
                          type="text"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          id="description"
                          name="description"
                          type="textarea"
                          placeholder="Inserisci descrizione"
                        />
                      </FormGroup>

                      <FormGroup>
                      <Button onClick={() => selectedFile && uploadPhoto(selectedFile, 'NFT Name', 'Pinga ponga', 'NFT')}>Upload photo</Button>
                      </FormGroup>
                    </Form>
                 
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
