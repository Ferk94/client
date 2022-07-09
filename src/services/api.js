import a from 'axios'
import Swal from 'sweetalert2'


const BACKEND_URL_PRODUCCION = process.env.REACT_APP_BACKEND_URL_PRODUCCION;

const axios = a.create({ withCredentials: false });


export const sessionApi = (data) =>
  axios.post(`${BACKEND_URL_PRODUCCION}auth`, data);

export const getUser = () => axios.post(`${BACKEND_URL_PRODUCCION}auth/me`);



export function getZipPhotosByExcursionId(excursionId){
  return axios.get(`${BACKEND_URL_PRODUCCION}photos/zip/${excursionId}`)
}

export function getPhotosByExcursionId(excursionId){

  return axios.get(`${BACKEND_URL_PRODUCCION}photos/${excursionId}`)
  
}

export function postPhotosByExcursionId(excursionId, photos){
  axios.post(`${BACKEND_URL_PRODUCCION}photos/${excursionId}`, photos)
  .then(response => {
    Swal.fire({
      icon: 'success',
      title: 'Éxito!',
      text: 'Se han posteado y asociado las correctamente.',
    })
  })
  .catch(err => console.error(err));
}

export function deletePhoto(excursionId, id, name){
  axios.delete(`${BACKEND_URL_PRODUCCION}photos/${excursionId}/${id}/${name}`)
  .then(response => {
    alert('se ha eliminado la foto correctamente')
  })
  .catch(err => console.error(err));
}
