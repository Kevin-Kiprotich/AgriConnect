import React, { useState, useEffect } from 'react';
// import { useDropzone} from 'react-dropzone';
import axios from 'axios';
import '../App.css';

export default function DataUploadPage(){
  const granteeList = ['Helvetas','IDH','PDF','Rikolto','SolidaridadPACE','SolidaridadCERT','Trias','Viagro'];
  const quotaList=['janmar','aprjun','julsep','octdec'];
  const [years, setYears] = useState([]);
  const [file, setFile] = useState(null);
  const [grantee,setGrantee]=useState(granteeList[0]);
  const [quota,setQuota]=useState(null);
  const [year,setYear]=useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(quota);
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('grantee',grantee)
    formData.append('quota',quota);
    formData.append('year',year)

    try {
      const response = await axios.post('http://localhost:8000/api/sums/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Check if the response contains CSV data
      if (response.data) {
        console.log(response.data);
        // Create a Blob object from the CSV data
        // for(let key in response.data.csv_data){
        //   const blob = new Blob([response.data.csv_data[key]], { type: 'text/csv' });

        //   // Create a URL for the Blob
        //   const url = window.URL.createObjectURL(blob);
  
        //   // Create a temporary <a> element to trigger the download
        //   const a = document.createElement('a');
        //   a.href = url;
        //   a.download = key; // Specify the file name
        //   a.click();
  
        //   // Release the Object URL
        //   window.URL.revokeObjectURL(url);
        // }

        
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

  const handleQuotaChange=(e)=>{
    e.preventDefault();
    setQuota(e.target.value)
  }

  const handleYearChange=(e)=>{
    e.preventDefault();
    setYear(e.target.value);
  }

  useEffect(()=>{
    const currentYear=new Date().getFullYear();
    const yearsArray=[];
    for (let year =2000;year<=currentYear;year++){
      yearsArray.push(year);
  }
  setYears(yearsArray);
  },[])
  return (
    <div className="App">
      <div className="form">
        <div className="PageTitle">
          <h1 style={{ color: 'rgb(0,128,79)', textAlign: 'center', padding: 0, margin: 0 }}>AGRI<span style={{ color: '#303030' }}>CONNECT</span></h1>
          <div className='formholder'>
            <h4 style={{ textAlign: 'left', margin: 0 }} >Data Upload</h4>
            <p style={{fontSize:'14px',}}> Please fill in the form below to upload your file.</p>
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