import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { InfrastructureData } from "../data/infrastructuredata";
import * as markers from '../data/markerIcons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/infrastructe.css';
export default function Infrastructe() {

    //Define variables to be used
    const map = useRef(null);
    const choro = useRef(null);
    const zoom = useRef(7);
    const BaseMap = useRef(null);
    const choroData=useRef(null);
    const [grantee, setGrantee] = useState('Helvetas');

    const titleStyle = { color: 'rgb(0,128,79)', textAlign: 'left', padding: 0, margin: 0 };

    const OSM_TILE = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        attribution: '© OpenStreetMap'
    });

    // function to prevent map layers being plotted twice
    function toggleMap(val) {

        if (map.current.hasLayer(choro.current)) {
            map.current.removeLayer(choro.current);
        } else {
            map.current.addLayer(choro.current);
        }

    }

    // function to filter the geojson
    function FilterData(grantee) {
        // Filter the GeoJSON features based on the "GRANTEE" property
        const filteredFeatures = InfrastructureData.features.filter(feature => {
            return feature.properties && feature.properties.Grantee === grantee;
        });

        return {
            type: "FeatureCollection",
            features: filteredFeatures,
        }
    }


    function plotMap() {
        if (choro.current != null) {
            map.current.removeLayer(choro.current);
        }
        
        if (map.current != null && choroData != null) {
            console.log(choroData);
            choro.current = L.geoJSON(choroData.current, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: markers.greenIcon
                    })
                }
            },
            )
            choro.current.addTo(map.current);
        }
    }

    useEffect(() => {
        choroData.current=FilterData(grantee);
        if (map.current == null) {
            map.current = L.map('map', {
                center: [-6.0, 35.0],
                zoom: zoom.current,
                zoomControl: false,
            });

            L.control.zoom({ position: 'topright' }).addTo(map.current);

            //Set basemap
            BaseMap.current = OSM_TILE;   
            BaseMap.current.addTo(map.current);
        }
    }, [OSM_TILE,grantee])

    useEffect(() => {
        console.log(grantee);
        plotMap();
        
    }, [grantee])


    return (
        <div className="page">
            <header>
                <h1 style={titleStyle}>AGRI<span style={{ color: '#303030' }}>CONNECT</span></h1>
                <div className='navbrand'>
                    <ul>
                        <li>
                            <Link to="/data_upload" className='navlink'>Data Upload</Link>
                        </li>
                        <li>
                            <div className="user">
                                <div className='userimg'>
                                    <h3 style={{ margin: 0 }}>KK</h3>
                                </div>
                                <div className="userdetails">
                                    <h5 style={{ margin: 0, fontWeight: '600' }}>Kevin Kiprotich</h5>
                                    <p style={{ marginTop: '2px', marginBottom: 0, fontSize: '12px' }}>kevinkiprotich@gmail.com</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
            <div className='dash-filters'>
                <div className="dropdown">
                    <button type="button" className="btn bg-white dropdown-toggle" data-bs-toggle="dropdown">
                        Select Grantee
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={()=> setGrantee('Helvetas')}>Helvetas</button></li>
                        <li><button className="dropdown-item" onClick={()=> setGrantee('IDH')}>IDH</button></li>
                        <li><button className="dropdown-item" onClick={()=> setGrantee('PDF')}>PDF</button></li>
                        <li><button className="dropdown-item" onClick={()=> setGrantee('Rikolto')}>Rikolto</button></li>
                        <li><button className="dropdown-item" onClick={()=> setGrantee('SolidaridadCERT')}>SolidaridadCERT</button></li>
                        <li><button className="dropdown-item" onClick={()=> setGrantee('SolidaridadPACE')}>SolidaridadPACE</button></li>
                        <li><button className="dropdown-item" onClick={()=> setGrantee('Trias')}>Trias</button></li>
                        <li><button className="dropdown-item" onClick={()=> setGrantee('Viagroforestry')}>Viagroforestry</button></li>
                    </ul>
                </div>
            </div>

            <div id='map'>

            </div>
        </div>
    );
}