import React, {useState, useEffect} from 'react';
import Navbar from './Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../redux/store';
import { getWishlistCount } from '../../redux/services/planet';
import Footer from './Footer/Footer';

const Layout = ({ children }:JSX.Element) => {

  const { countWishlist } = useSelector((state: RootState) => state.planetReducer);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getWishlistCount());
    console.log('countWishlist', countWishlist);
  }, [countWishlist]);
  
  return (
    <div>
      <Navbar 
      countWishlist={countWishlist}
      />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
