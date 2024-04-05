import React, { useState, } from 'react';
// import { useDropzone} from 'react-dropzone';
import axios from 'axios';

export default function DataUploadPage(){
  const granteeList = ['Helvetas','IDH','PDF','Rikolto','SolidaridadPACE','SolidaridadCERT','Trias','Viagro'];
  const [file, setFile] = useState(null);
  const [grantee,setGrantee]=useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(grantee);
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('grantee',grantee)

    try {
      const response = await axios.post('http://localhost:8000/api/sums/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Check if the response contains CSV data
      if (response.data) {
        
        // Create a Blob object from the CSV data
        const blob = new Blob([response.data.csv_data], { type: 'text/csv' });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary <a> element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'processed_data.csv'; // Specify the file name
        a.click();

        // Release the Object URL
        window.URL.revokeObjectURL(url);
      } else {
        alert('No CSV data received.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange =(e)=>{
    e.preventDefault()
    setGrantee(e.target.value);
    console.log(grantee);
  }

  return (
    <div className="App">
      <div className="form">
        <div className="PageTitle">
          <h1 style={{ color: 'rgb(0,128,79)', textAlign: 'center', padding: 0, margin: 0 }}>AGRI<span style={{ color: '#303030' }}>CONNECT</span></h1>
          <div className='formholder'>
            <h4 style={{ textAlign: 'left', margin: 0 }} >Data Upload</h4>
            <p> Please fill in the form below to upload your file.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor='grantee'>Grantee</label><br />
              {/* <input required id='grantee' type='text' name='grantee' onChange={handleNameChange} /><br /> */}
              <select id='select' onChange={handleNameChange}>
                  {granteeList.map((item,index)=>(<option value={item}>{item}</option>))}
              </select><br/>
              <label htmlFor='file'>File</label><br/>
              <input required id='file' name='file' type='file' onChange={handleChange} accept='.XLSX, .xlsx, .csv' /><br />
              <div className='buttonholder'> 
                <button type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}