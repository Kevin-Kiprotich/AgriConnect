import React, { useState, useEffect } from 'react';
import './styles/dashboard.css';
import brand from '../assets/images/agriconnect_logo.png';
import contributors from '../assets/images/sponsor.svg';

//import components
import Sums from './subcomponents/sums';

// const images = require.context('../assets/images', true);
// const imageList = images.keys().map(image => images(image));
// console.log(imageList)
export default function Dashboard() {
    const [activePage, setActivePage] = useState('sums');
    function switchPage (page){
        page=== 'sums' ? setActivePage('sums') 
                : page==='infr' ? setActivePage('infr')
                    : page === 'roads' ? setActivePage('roads')
                        : page === 'nutr' ? setActivePage('nutr')
                            : setActivePage('sums');
    }

    useEffect(()=>{
        switchPage(activePage)
    },[activePage])


    return (
        <div className='page'>
            <header>
                <div className="logos">
                    <img src={brand} alt='Agriconnect' />
                    <img id='small-img' src={contributors} alt="Contributors" />
                </div>
                <div className="routes">
                    <button>Home</button>
                    <button id='active'>Dashboard</button>
                    <div className='user flex-center'>KK</div>
                </div>
            </header>

            <section>
                <div className="sidenav" id='sidenav'>
                    <button id="sums-btn" className={activePage === 'sums' ? 'active' : 'inactive'} onClick={()=>{setActivePage('sums')}}><i className="fa-solid fa-bullseye icon-sums icon"></i><p>SUMS</p></button>
                    <button id="infr-btn" className={activePage === 'infr' ? 'active' : 'inactive'} onClick={()=>{setActivePage('infr')}}><i className="fa-solid fa-industry icon-infrastructure icon"></i><p>Infrastructure</p></button>
                    <button id="road-btn" className={activePage === 'roads' ? 'active' : 'inactive'} onClick={()=>{setActivePage('roads')}}><i className="fa-solid fa-road icon-tarura icon-road icon"></i><p>TARURA</p></button>
                    <button id="nutr-btn" className={activePage === 'nutr' ? 'active' : 'inactive'} onClick={()=>{setActivePage('nutr')}}><i className="fa-solid fa-bowl-rice icon-nut icon"></i><p>Nutrition</p></button>
                </div>
            
                <div className="dash">
                    <Sums/>
                </div>
            </section>
        </div>
    );
}