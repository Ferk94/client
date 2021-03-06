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

console.log('la prueba boluda')
  const dispatch = useDispatch();
  const coordinators = useSelector((state) => state.getDataInfo.coordinators);
  const [error, setError] = useState(initialStateError);
  const [input, setInput] = useState(initialState);
  const [status, setStatus] = useState(0);
  const [photos, setPhotos] = useState(1)


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
      if (e.target.value === "") {
        setError({ ...error, [name]: "Campo obligatorio" });
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
      title:'T??rminos y Condiciones de Uso.',
      html:'INFORMACI??N RELEVANTE. <br> Es requisito necesario para la adquisici??n de los productos que se ofrecen en este sitio, que lea y acepte los siguientes T??rminos y Condiciones que a continuaci??n se redactan. El uso de nuestros servicios as?? como la compra de nuestros productos implicar?? que usted ha le??do y aceptado los T??rminos y Condiciones de Uso en el presente documento. Todas los productos que son ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas o presentadas por una p??gina web tercera y en tal caso estar??an sujetas a sus propios T??rminos y Condiciones. En algunos casos, para adquirir un producto, ser?? necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definici??n de una contrase??a. El usuario puede elegir y cambiar la clave para su acceso de administraci??n de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para la compra de alguno de nuestros productos. www.QBOOK.com no asume la responsabilidad en caso de que entregue dicha clave a terceros. Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, est??n sujetas a un proceso de confirmaci??n y verificaci??n, el cual podr??a incluir la verificaci??n. Los precios de los productos ofrecidos en esta Tienda Online es v??lido solamente en las compras realizadas en este sitio web. <br> LICENCIA. <br> Qbook  a trav??s de su sitio web concede una licencia para que los usuarios utilicen los roductos que son vendidos en este sitio web de acuerdo a los T??rminos y Condiciones que se describen en este documento. <br> USO NO AUTORIZADO. <br> En caso de que aplique (para venta de software, templetes, u otro producto de dise??o y programaci??n) usted no puede colocar uno de nuestros productos, modificado o sin modificar, en un CD, sitio web o ning??n otro medio y ofrecerlos para la redistribuci??n o la reventa de ning??n tipo. <br> PROPIEDAD. <br> Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad  de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan sin ning??n tipo de garant??a, expresa o impl??cita. En ning??n esta compa????a ser??  responsables de ning??n da??o incluyendo, pero no limitado a, da??os directos, indirectos, especiales, fortuitos o consecuentes u otras p??rdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos. <br> POL??TICA DE REEMBOLSO Y GARANT??A. <br> En el caso de productos que sean  mercanc??as irrevocables no-tangibles, no realizamos reembolsos despu??s de que se env??e el producto, usted tiene la responsabilidad de entender antes de comprarlo.  Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripci??n no se ajusta al producto. Este www.QBOOK.com garantiza que la informaci??n personal que usted env??a cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validaci??n de los pedidos no ser??n entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales. La suscripci??n a boletines de correos electr??nicos publicitarios es voluntaria y podr??a ser seleccionada al momento de crear su cuenta. Qbook reserva los derechos de cambiar o de modificar estos t??rminos sin previo aviso.'
  })
  }

  const handleSubmit = function (e) {
    e.preventDefault();
    if((error.name
      || error.email
      || error.password
      || error.checkbox
      || error.phoneNumberString
      || error.CoordinatorId)
      || (input.name.length === 0
        || input.email.length === 0 
        || input.password.length === 0
        || input.checkbox !== "on"
        || input.phoneNumberString.length === 0
        || input.CoordinatorId.length === 0)){

          
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
        <div className="registerPie">Complet?? los siguientes datos para poder ingresar y descargar tu book.</div>
        <div className="registerLine">
          <div className="textformRegister">tu nombre y apellido</div>
          <div className="textformRegister">tu correo electr??nico</div>
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
            handleInputChange(e);
            validateInput(e);
            }}
            name='email'
            type="text"
            value={input.email}
             />
          <div className="error">{error?.name}</div>
          <div className="error">{error?.email}</div>
          <div className="textformRegister">tu coordinador</div>
          <div className="textformRegister">tu n??mero de tel??fono</div>
          <select name='CoordinatorId' onChange={(e) => handleInputChange(e)} className="selectRegister">
            <option hidden>??</option>
            {
              coordinators.map(e => {
                return <option value={e.id}>{e.name}</option>
              })
            }
          </select>
          <input className="inputFont" 
          onChange={(e) => {
            handleInputChange(e);
            validateInput(e);
          }} 
          name='phoneNumberString' 
          type="text"
          value={input.phoneNumberString}
          />
          <div className="error">{error?.CoordinatorId}</div>
          <div className="error">{error?.phoneNumberString}</div>
        </div>
        <div className="registerPasswordInput">
        <div className="textformRegister">tu contrase??a</div>
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
                t??rminos y condiciones.
              </button>
              </div>
            </div>
          
            <div className="errorCheckbox">{error?.checkbox}</div>
          </div>
          <RegisterModal error={error} input={input} handleSubmit={handleSubmit} status={status}/>
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