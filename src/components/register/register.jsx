import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios';

import { signUp } from "../../redux/actions/userActions";

import { getCoordinators } from '../../redux/actions/coordinatorsActions';
import { getEnterprises } from '../../redux/actions/enterprisesActions';
import { RegisterModal } from './registerModal';
import './register.css';

const initialState = {
  email: "",
  password: "",
  name: "",
  phoneNumberString: "",
  CoordinatorId: null
};

const initialStateError = {
  email: "",
  password: "",
  name: "",
  phoneNumberString: "",
  CoordinatorId: null
}


const BACKEND_URL_PRODUCCION = process.env.REACT_APP_BACKEND_URL_PRODUCCION;

export default function Register() {


  const dispatch = useDispatch();


  const coordinators = useSelector((state) => state.getDataInfo.coordinators);


  const allCoordinatorsName = coordinators.length > 0 && coordinators.map((el) => el.name)

  
  const [error, setError] = useState(initialStateError);
  const [input, setInput] = useState(initialState);
  const [status, setStatus] = useState(0);
  const [photos, setPhotos] = useState(1)
  const [inputCoordinator, setInputCoordinator] = useState("");
  const [suggest, setSuggest] = useState("");
  const [activeSuggest, setActiveSuggest] = useState(true)

  

  useEffect(() => {
    setTimeout(() => {
      if (photos < 7) {
        setPhotos(photos + 1);
      } else {
        setPhotos(1)
      }
    }, 6000);
  }, [photos]);

  // const addCoordinatorToUsers = function (e) {
  //   let coordinator = document.getElementById("coordinator").value;
  //   e.target.name === "coordinator"
  //     ? setInput({
  //       ...input,
  //       CoordinatorId: e.target.value
  //     })
  //     : setInput({
  //       ...input,
  //       CoordinatorId: coordinator
  //     });
  // }

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleAutocompleteChange = function (e) {
    
    let searchVal = e.target.value
    let suggestion = []
    if(searchVal.length > 0 ){
        suggestion = allCoordinatorsName.sort().filter((e)=> e.toLowerCase().includes(searchVal.toLowerCase()))
    }
    if(suggestion.length > 0){

      setSuggest(suggestion[0].charAt(0).toUpperCase() + suggestion[0].slice(1))
    }
    if(suggestion.length < 1){
      setSuggest("")
    }
    setInputCoordinator(searchVal);
    setActiveSuggest(true)
  }

  function acceptSuggestion(e){
    e.preventDefault();

      setInputCoordinator(suggest)
      setActiveSuggest(false)
      setError({ ...error, CoordinatorId: "" });
  }

  const validateInput = function (e) {
    let { name } = e.target;
    let numerics = [
      "phoneNumberString",
    ];
    if (name === "name") {
      if (!/^[a-zA-Z\u00C0-\u00FF ]*$/.test(e.target.value) || e.target.value === "" || e.target.value === " ") {
        setError({ ...error, [name]: "El nombre solo debe contener letras" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
        setError({ ...error, [name]: "Mail incorrecto" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if (name === "password") {
      if (e.target.value.length < 6) {
        setError({ ...error, [name]: "Minimo seis caracteres" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if (numerics.includes(name)) {
      if (isNaN(e.target.value) || e.target.value === "" ) {
        setError({ ...error, [name]: "Solo puede contener numeros" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if (name === "CoordinatorId"){
      if (e.target.value === "" || allCoordinatorsName.includes(e.target.value) !== true) {
        setError({ ...error, [name]: "Dato incorrecto" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if(name==="checkbox"){
      if (!e.target.checked) {
        setError({ ...error, [name]: "Campo obligatorio" });
      } else{
        setError({ ...error, [name]: "" });
      }
    }
  };

  const clearForm = function () {
    setInput(initialState);
    setError(initialStateError);
  };

  function termsModal(e) {
    e.preventDefault();
    Swal.fire({ 
      title:'Términos y Condiciones de Uso.',
      html:'INFORMACIÓN RELEVANTE. <br> Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios así como la compra de nuestros productos implicará que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todas los productos que son ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas o presentadas por una página web tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. En algunos casos, para adquirir un producto, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña. El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para la compra de alguno de nuestros productos. www.QBOOK.com no asume la responsabilidad en caso de que entregue dicha clave a terceros. Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación. Los precios de los productos ofrecidos en esta Tienda Online es válido solamente en las compras realizadas en este sitio web. <br> LICENCIA. <br> Qbook  a través de su sitio web concede una licencia para que los usuarios utilicen los roductos que son vendidos en este sitio web de acuerdo a los Términos y Condiciones que se describen en este documento. <br> USO NO AUTORIZADO. <br> En caso de que aplique (para venta de software, templetes, u otro producto de diseño y programación) usted no puede colocar uno de nuestros productos, modificado o sin modificar, en un CD, sitio web o ningún otro medio y ofrecerlos para la redistribución o la reventa de ningún tipo. <br> PROPIEDAD. <br> Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad  de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan sin ningún tipo de garantía, expresa o implícita. En ningún esta compañía será  responsables de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos. <br> POLÍTICA DE REEMBOLSO Y GARANTÍA. <br> En el caso de productos que sean  mercancías irrevocables no-tangibles, no realizamos reembolsos después de que se envíe el producto, usted tiene la responsabilidad de entender antes de comprarlo.  Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripción no se ajusta al producto. Este www.QBOOK.com garantiza que la información personal que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales. La suscripción a boletines de correos electrónicos publicitarios es voluntaria y podría ser seleccionada al momento de crear su cuenta. Qbook reserva los derechos de cambiar o de modificar estos términos sin previo aviso.'
  })
  }

  const nameToId= function(e, value, coordinators){
    var names = coordinators.map(el => el.name.toLowerCase())
    if(names.includes(value.toLowerCase())){
       var id = coordinators.filter(el => el.name.toLowerCase() === value.toLowerCase())
       setInput({
        ...input,
        CoordinatorId: id[0].id
      })
    }else{    
      setInput({
       ...input
      })
    }
  }

  const handleSubmit = function (e, value, coordinators) {
    e.preventDefault();
    nameToId(e, value, coordinators)
    if((error?.name
      || error?.email
      || error?.password
      || error?.checkbox
      || error?.phoneNumberString
      || error?.CoordinatorId)
      || (input?.name?.length === 0
        || input?.email?.length === 0 
        || input?.password?.length === 0
        || input?.checkbox !== "on"
        || input?.phoneNumberString?.length === 0
        || input?.CoordinatorId?.length === 0)){

          
        }
        else{

          //aca  hay q disparar la nueva action signUp

            dispatch(signUp(input))
            .then(response => {
              const info = {to: input.email, password: input.password}
             return axios.post(`${BACKEND_URL_PRODUCCION}sendMail/`, info)
            }) 

          .then(response => {
            setStatus(response?.status)
            
          })
          .catch(err => {
            setStatus(err)
          })
          clearForm();
        }
  };

  useEffect(() => {
    dispatch(getCoordinators());
    dispatch(getEnterprises());
  }, [dispatch]);

  
  return (<div className={"landing" + 3}>
    <ul class="cb-slideshow"><li><span>Image 01</span></li><li><span>Image 02</span></li><li><span>Image 03</span></li><li><span>Image 04</span></li><li><span>Image 05</span></li><li><span>Image 06</span></li>	<li><span>Image 07</span></li></ul>
    <Link to='/'>
      <img className="landingLogo" src="../images/LogoBlanco.png" alt="logoBlancologin" /></Link>
    <div className="registerContainer">
      <div className="registerForm">
        <img className="registerLogo" src="../images/Logo.png" alt="logoBlancologin" />
        {/* <img className="registerPie" src="../images/FraseRegister.png" alt="logoBlancologin" /> */}
        <div className="registerTitle">Te damos la bienvenida a tu QBOOK.</div>
        <div className="registerPie">Completá los siguientes datos para poder ingresar y descargar tu book.</div>
        <div className="registerLine">
          <div className="textformRegister">tu nombre y apellido</div>
          <div className="textformRegister">tu correo electrónico</div>
          <input className="inputFont" 
          onChange={(e) => {
            handleInputChange(e);
            validateInput(e);
          }} 
          name='name'
          type="text"
          value={input.name}
          />
          <input className="inputFont" 
          onChange={(e) => {
            validateInput(e);
            handleInputChange(e);
            }}
            name='email'
            type="text"
            value={input.email}
             />
          <div className="error">{error?.name}</div>
          <div className="error">{error?.email}</div>
          <div className="textformRegister">tu coordinador</div>
          <div className="textformRegister">tu número de teléfono</div>
          <input className="inputFont"
          onChange={(e) => {
            handleAutocompleteChange(e);
            validateInput(e);
          }}
          value={inputCoordinator}
          name='CoordinatorId'
          type="text"
          />
          <input className="inputFont" 
          onChange={(e) => {
            handleInputChange(e);
            validateInput(e);
          }} 
          name='phoneNumberString' 
          type="text"
          value={input.phoneNumberString}
          />
          <div>

          {activeSuggest && suggest ?
          <div
          className="suggestion"
          onClick={(e) => acceptSuggestion(e)}
          >
          {activeSuggest && suggest}       
          </div>
          : 
          <div></div>
          }
          <div className="error">
          {error.CoordinatorId}
          </div>
          </div>
          <div className="error">{error?.phoneNumberString}</div>
        </div>
        <div className="registerPasswordInput">
        <div className="textformRegister">tu contraseña</div>
          <input className="registerPassword" 
          type='password'
           onChange={(e) => {
             handleInputChange(e);
            validateInput(e);
           }} 
           name='password'
           />
            <div className="errorPassword">{error?.password}</div>
          </div>
          <div className="checkboxContainer">
            <div className="rowCheckbox">
              <input
                onChange={(e) => {
                  handleInputChange(e);
                  validateInput(e);
                  }}
                  type='checkbox'
                  name="checkbox"
                  className="checkboxInput"
                  >
              </input>
            <div>Acepto los 
              <button
              className="termsButton"
              onClick={(e) => termsModal(e)}
              >
                términos y condiciones.
              </button>
              </div>
            </div>
          
            <div className="errorCheckbox">{error?.checkbox}</div>
          </div>
          <RegisterModal error={error} input={input} handleSubmit={handleSubmit} status={status} inputCoordinator={inputCoordinator} coordinators={coordinators}/>
      </div>
    </div>
    <div className="whatsappContainerRegister">
            <a href="https://wa.me/message/UW5MARGNVV24M1" target="_blank" rel="noreferrer">
            <img className="whatsappLanding" src="./images/WhatsappIcon.png" alt=""/>
            </a>
        </div>
  </div>
  )
}