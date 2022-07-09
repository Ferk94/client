import { useSelector } from 'react-redux';
import './adminHome.css'
import { useEffect, useState } from 'react';

export function AdminHome({ adminInfo }) {


    return <div className='adminHome'>
        <div className='title-adminHome'>
            <h1 >|----Bienvenido {adminInfo?.name}----|</h1>
        </div>


    </div>





    {/* return <div className='home'>
    <div className='title-home'>
    <h1>Galería de fotos de Mariano Cejas</h1>
    </div>
    <img className='img-home' src='https://volemos.nyc3.digitaloceanspaces.com/blog/wp-content/uploads/2019/07/Buscan-foto%CC%81grafos-para-trabajar-en-los-Cruceros-de-MSC.jpg' alt='img not found' />
</div> */}
}

