import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../redux/store';
import { getAllPlanet, getDetailPlanet, addWishlist } from '../../redux/services/planet';
import { incrementPage } from '../../redux/reducers/limit';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ItemDetail from 'components/Planet/ItemDetail';

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

const Card = styled.div`
  width: 100%;
  max-width: 350px;
  height: 100%;
  max-height: 300px;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  line-height: 1;
`;

const Li = styled.li`
  margin: 10px 0;
`;

const GroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 15px;
`;

const ButtonDetail = styled.button`
  padding: 5px 10px;
  border: none;
  background: #064bc1;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
`;

const ButtonWishlist = styled.button`
  padding: 5px 10px;
  border: none;
  background: #ff6b6b;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
`;

const index: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<RootDispatch>();
  const { dataSource, isLoading } = useSelector((state: RootState) => state.planetReducer);
  const { detailData } = useSelector((state: RootState) => state.planetReducer);
  const { page } = useSelector((state: RootState) => state.limitReducer);

  useEffect(() => {
    dispatch(getAllPlanet(page));
  }, [page]);

  const handleScroll = (e: any) => {
    let height = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let viewHeight = window.innerHeight;
    if (viewHeight + scrollTop + 1 >= height) {
      dispatch(incrementPage());
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchDetailPlanet = (url: string) => {
    dispatch(getDetailPlanet(url));
  };

  const handleAddWishlist = (url: any) => {
    dispatch(addWishlist(url));
  };

  return (
    <>
      <Title>{detailData == null ? 'List All Planet' : 'Detail Planet'}</Title>
      <Separator />
      {detailData == null ? (
        isLoading ? (
          <ContainerLoader>
            <Loader />
          </ContainerLoader>
        ) : (
          <>
            <CardContainer>
              {dataSource.length > 0 &&
                dataSource.map((item, index) => (
                  <Card key={index}>
                    <Ul>
                      <Li>Name: {item.name}</Li>
                      <Li>Rotation Period: {item.rotation_period}</Li>
                      <Li>Orbital Period: {item.orbital_period}</Li>
                      <Li>Diameter: {item.diameter}</Li>
                      <Li>Climate: {item.climate}</Li>
                      <Li>Gravity: {item.gravity}</Li>
                      <Li>Terrain: {item.terrain}</Li>
                      <Li>Surface Water: {item.surface_water}</Li>
                      <Li>
                        <GroupButton>
                          <ButtonDetail onClick={() => fetchDetailPlanet(item.url)}>
                            Detail
                          </ButtonDetail>
                          <ButtonWishlist onClick={() => handleAddWishlist(item.url)}>
                            Add Wishlist
                          </ButtonWishlist>
                        </GroupButton>
                      </Li>
                    </Ul>
                  </Card>
                ))}
            </CardContainer>
          </>
        )
      ) : (
        <ItemDetail item={detailData} />
      )}
    </>
  );
};

export default index;
