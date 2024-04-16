import React, {useState, useEffect} from 'react';
import helvetas_logo from '../../assets/images/helvetas.png';
import idh_logo from '../../assets/images/idh.png';
import trias_logo from '../../assets/images/trias.png';
import solidaridad_logo from '../../assets/images/solidaridad.png';
import viagro_logo from '../../assets/images/viagro.png';
import pdf_logo from '../../assets/images/pdf.png';
import rikolto_logo from '../../assets/images/rikolto.jpg';
// import styles
import './styles/sums.css'

export default function Sums() {
    
    const granteeMap={
        'Helvetas':helvetas_logo,
        'IDH':idh_logo,
        'PDF':pdf_logo,
        'Rikolto':rikolto_logo,
        'Viagro':viagro_logo,
        'Trias':trias_logo,
        'SolidaridadPACE':solidaridad_logo,
        'SolidaridadCERT':solidaridad_logo,
    }

    const [grantee,setGrantee]=useState(Object.keys(granteeMap)[0]);
    return (
        <>
            <div className='selectors'>
                <p className='title'>SUSTAINABLE UNIFIED MONITORING</p>
                <div className="dropdown">
                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
                        <div className='dropdown-value'>
                            <img src={granteeMap[grantee]} alt={grantee}/>
                            <p>{grantee}</p>
                        </div>
                    </button>
                    <ul className="dropdown-menu">
                        {granteeMap && Object.keys(granteeMap).map((key)=>(
                            <li key={key}><button className='dropdown-item' onClick={()=>{setGrantee(key)}}>{key}</button></li>
                        ))} 
                    </ul>
                </div>


            </div>
            <div className='dashboard'>

            </div>
        </>
    );
}