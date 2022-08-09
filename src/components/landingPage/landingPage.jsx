import { Link } from "react-router-dom";
import './landingPage.css';
import { useState, useEffect } from 'react';
import { Button } from 'reactstrap'


export default function LandingPage(){

    const [photos, setPhotos] = useState(1)

    useEffect(() => {
       setTimeout(() => {  
           if(photos<7){
            setPhotos(photos + 1);   
           } else {
               setPhotos(1)
           }   
        }, 3000);
    },[photos]);
    return <div className={"landing" + 7}>
        <ul class="cb-slideshow"><li><span>Image 01</span></li><li><span>Image 02</span></li><li><span>Image 03</span></li><li><span>Image 04</span></li><li><span>Image 05</span></li><li><span>Image 06</span></li>	<li><span>Image 07</span></li></ul>
        <img className="landingLogo" src="./images/LogoBlanco.png" alt="logoBlanco"/>
        <div className="bienvenidosContainer">
        <img className="bienvenidos" src="./images/Bienvenidos.png" alt="Bienveidos" />
        </div>
        <div className="subtituloContainer">
        <img className="subtitulo" src="./images/BienvenidosSubtitulo.png" alt="Subtitulo" />
        </div>
        <div className="buttonsLanding">
        <Link to='/login'>
            <Button className="buttonLoginLanding">iniciar sesión</Button>
        </Link>
        <Link to='/register'>
            <Button className="buttonLoginLanding">registrarse</Button>
        </Link>
        </div>
        <div className="whatsappContainerLanding">
            <a href="https://wa.me/message/W6PH7DKBWGHQA1" target="_blank" rel="noreferrer">
            <img className="whatsappLanding" src="./images/WhatsappIcon.png" alt=""/>
            </a>
        </div>

    </div>
}