import './home.css'
import { Carousel, CarouselIndicators, CarouselCaption, CarouselItem, CarouselControl } from 'reactstrap'


export default function Home() {

  return <div className='homeComponent'>
    <div className='homeTitle'><h1 >----Galería de fotos de Mariano Cejas----</h1></div>

    <div id="carouselExampleFade" class="carousel slide carousel-fade homeCarousel" data-bs-interval="2150" data-bs-ride="carousel">



      <div class="carousel-inner " position='realive'>
        <div class="carousel-item active homeCarouselImage" >
          <img src='https://volemos.nyc3.digitaloceanspaces.com/blog/wp-content/uploads/2019/07/Buscan-foto%CC%81grafos-para-trabajar-en-los-Cruceros-de-MSC.jpg' alt='img not found' class="d-block w-100 " />
        </div>
        <div class="carousel-item homeCarouselImage">
          <img src="https://mendoza.puntoapunto.com.ar/wp-content/uploads/2020/11/viaje.jpg" alt='img not found' class="d-block w-100 " />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>

    </div>
  </div>

  {/* return <div className='home'>
        <div className='title-home'>
        <h1>Galería de fotos de Mariano Cejas</h1>
        </div>
        <img className='img-home' src='https://volemos.nyc3.digitaloceanspaces.com/blog/wp-content/uploads/2019/07/Buscan-foto%CC%81grafos-para-trabajar-en-los-Cruceros-de-MSC.jpg' alt='img not found' />
      </div> */}
}