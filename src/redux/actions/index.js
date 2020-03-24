
import axios from 'axios';

// Consts
import { FETCH_CONTACTS, UPDATE_CONTACTS } from "../constans/index";

// Fetch Contact List
export function fetchContacts() {
  return function(dispatch) {
    return axios.get( process.env.REACT_APP_API_URL + 'users')
    .then(res => {
      if(res.data.status) {
        dispatch({
          type: FETCH_CONTACTS,
          payload: res.data.data
        });
      }
    }).catch(err => {
      dispatch({type: FETCH_CONTACTS, payload: err });
    })
  }
};

export function updateContacts(to_be_updated) {
  return (dispatch) => {
    var config = {
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
    }
    let data = new FormData();
    data.set('id', to_be_updated.id);
    data.set('nama', to_be_updated.nama);
    data.set('no_telp', to_be_updated.no_telp);

    return axios.post( process.env.REACT_APP_API_URL + 'update-user', data, config)
      .then(res => {
        if(res.data.status) {
          dispatch({ type: UPDATE_CONTACTS, payload: res.data.data })
        }
      }).catch(err => {
        dispatch({type: UPDATE_CONTACTS, payload: err });
      });
  }
}