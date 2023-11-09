import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../redux/store';
import { getDataWishlist, getDetailPlanet, deleteWishlist } from '../../redux/services/planet';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ItemDetail from 'components/Planet/ItemDetail';
import ItemWishlist from 'components/Planet/ItemWishlist';
import Pagination from 'components/Element/Pagination';

const ContainerLoader = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: #064bc1 #064bc1 #064bc1 #064bc1;
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before,
  &:after {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: skyblue;
    position: absolute;
    left: 0.125rem;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: #000;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #000;
  margin: 20px 0;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  background: #fff;
`;

const index: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<RootDispatch>();
  const { dataWishlist, isLoading } = useSelector((state: RootState) => state.planetReducer);
  const { detailData } = useSelector((state: RootState) => state.planetReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataWishlistPerPage, setDataWishlistPerPage] = useState(4);
  console.log('dataWishlist', dataWishlist);

  useEffect(() => {
    dispatch(getDataWishlist());
  }, []);

  const fetchDetailPlanet = (url: string) => {
    dispatch(getDetailPlanet(url));
  };

  const handleRemoveWishlist = (item: any) => {
    dispatch(deleteWishlist(item));
    dispatch(getDataWishlist());
  };

  const indexOfLast = currentPage * dataWishlistPerPage;

  const indexOfFirst = indexOfLast - dataWishlistPerPage;

  const currentDataWishlist = dataWishlist.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {dataWishlist.length === 0 ? (
        <Title>Data Wishlist Kosong</Title>
      ) : (
        <>
          <Title>{detailData == null ? 'Data Wishlist' : 'Detail Planet'}</Title>

          <Separator />
          {detailData == null ? (
            isLoading ? (
              <ContainerLoader>
                <Loader />
              </ContainerLoader>
            ) : (
              <>
                <ItemWishlist
                  dataWishlist={currentDataWishlist}
                  handleRemoveWishlist={handleRemoveWishlist}
                  fetchDetailPlanet={fetchDetailPlanet}
                />
                <Pagination
                  postsPerPage={dataWishlistPerPage}
                  totalPosts={dataWishlist.length}
                  paginate={paginate}
                />
              </>
            )
          ) : (
            <ItemDetail item={detailData} />
          )}
        </>
      )}
    </>
  );
};

export default index;
