import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPlanet, getDetailPlanet} from '../../redux/services/planet';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #000;
  margin-bottom: 20px;
  font-weight: 700;
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

const CardDetail = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ButtonBack = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background: #000;
  color: #fff;
  cursor: pointer;
`;


const ItemDetail = ({ item }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<RootDispatch>();

  const goToBack = () => {
    dispatch(getAllPlanet(1));
    dispatch(getDetailPlanet(null));
  }

  return (
    <Container>
      <ButtonBack onClick={() => goToBack()}>Back</ButtonBack>
      <CardDetail>
        <Title>{item.name}</Title>
        <Ul>
          <Li>Rotation Period: {item.rotation_period}</Li>
          <Li>Orbital Period: {item.orbital_period}</Li>
          <Li>Diameter: {item.diameter}</Li>
          <Li>Climate: {item.climate}</Li>
          <Li>Gravity: {item.gravity}</Li>
          <Li>Terrain: {item.terrain}</Li>
          <Li>Surface Water: {item.surface_water}</Li>
          <Li>Population: {item.population}</Li>
          <Li>Created: {dayjs(item.created).locale('id').format('DD MMMM YYYY')}</Li>
        </Ul>
      </CardDetail>
    </Container>
  )
};

export default ItemDetail;
