import axios from 'axios';
import { API_URL } from 'config';
import store, { RootDispatch } from '../store';
import { showAllPlanet, showDetailPlanet, showWishlist, showCountWishlist } from '../reducers/planet';
import { addWishlistToLocalStorage, getWishlistFromLocalStorage} from 'utils/function';
import Swal from 'sweetalert2';

export const getAllPlanet = (page?:any) => async (dispatch: RootDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/planets/?page=${page}`);
    const data = response.data.results;
    if(page > 1){
      dispatch(showAllPlanet([...store.getState().planetReducer.dataSource, ...data]));
    }
    else{
      dispatch(showAllPlanet([...data]));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDetailPlanet = (params: string) => async (dispatch: RootDispatch) => {
  try {
    if(params === null){
      dispatch(showDetailPlanet(null));
      return;
    }else{
      const response = await axios.get(params);
      const data = response.data;
      dispatch(showDetailPlanet(data));
    }
  } catch (error) {
    console.log(error);
  }
}

export const addWishlist = (params : any) => async (dispatch: RootDispatch) => {
  try {
    const response = await axios.get(params);
    const data = response.data;
    // cek if data is exist in wishlist
    const wishlist = getWishlistFromLocalStorage();
    const isExist = wishlist.find((item:any) => item.url === data.url);
    if(isExist){
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Planet already exist in wishlist'
      })
      return;
    }

    addWishlistToLocalStorage(data);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Add to wishlist success'
    })
  } catch (error) {
    console.log(error);
  }
}

export const getDataWishlist = () => async (dispatch: RootDispatch) => {
  try {
    const data = getWishlistFromLocalStorage();
    dispatch(showWishlist(data));
  } catch (error) {
    console.log(error);
  }
}

export const deleteWishlist = (params : any) => async (dispatch: RootDispatch) => {
  try {
    const data = getWishlistFromLocalStorage();
    const newData = data.filter((item:any) => item.url !== params.url);
    localStorage.setItem('wishlist', JSON.stringify(newData));
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Delete wishlist success'
    })
    dispatch(showWishlist(newData));
  } catch (error) {
    console.log(error);
  }
}

export const getWishlistCount = () => async (dispatch: RootDispatch) => {
  try {
    const data = getWishlistFromLocalStorage();
    dispatch(showCountWishlist(data.length));
  } catch (error) {
    console.log(error);
  }
}