import React, {useState, useEffect} from 'react';
//import icons
import Activebox from '@mui/icons-material/TaskAlt';
import Circleicon from '@mui/icons-material/RadioButtonUnchecked';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


// material components
import CheckBox  from '@mui/material/Checkbox';
//import images
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

    const targets=['FA','Res'];

    const [grantee,setGrantee]=useState(Object.keys(granteeMap)[0]);
    const [target,setTarget]=useState(targets[1])
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
                            <li key={key}><button className='dropdown-item' onClick={()=>{setGrantee(key)}} style={{color:grantee===key ? '#8BCC00' : ''}}>{key}</button></li>
                        ))} 
                    </ul>
                </div>
                <p className='fw-bold'>Targets and Responses</p>

                 <FormControl className='target-selectors'>
                        <RadioGroup 
                            name='targets' 
                            defaultValue='Res'
                            className='radio'
                        >
                                <FormControlLabel
                                    value='FA'
                                    className='btns' 
                                    control={<Radio 
                                                icon={<Circleicon/>} 
                                                checkedIcon={<Activebox/>}
                                                sx={{
                                                    color: '#424242',
                                                    '&.Mui-checked':{
                                                        color:'#8BCC00'
                                                    }
                                                }}
                                            />}
                                    label="Financial Agreement Indicators"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value='Res'
                                    className='btns' 
                                    control={<Radio 
                                                icon={<Circleicon/>} 
                                                checkedIcon={<Activebox/>}
                                                sx={{
                                                    color: '#424242',
                                                    '&.Mui-checked':{
                                                        color:'#8BCC00'
                                                    }
                                                }}
                                            />}
                                    label="Responses"
                                    labelPlacement="start"
                                />
                        </RadioGroup>
                        
                </FormControl>   
            </div>
            <div className='dashboard'>

            </div>
        </>
    );
}