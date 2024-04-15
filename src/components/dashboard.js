import './styles/dashboard.css';
import brand from '../assets/images/agriconnect_logo.png';
import contributors from '../assets/images/sponsor.svg';
export default function Dashboard(){
    return (
        <div className='page'>
            <header>
                <div className="logos">
                    <img src={brand} alt='Agriconnect'/>
                    <img id='small-img' src={contributors} alt="Contributors"/>
                </div>
                <div className="routes">
                    <button>Home</button>
                    <button id='active'>Dashboard</button>
                    <div className='user flex-center'>KK</div>
                </div>
            </header>

            <section>

            </section>
        </div>
    );
}