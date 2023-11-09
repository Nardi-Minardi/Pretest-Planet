import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  background: #e21919;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
`;

interface IPlanet {
  dataWishlist: [];
  handleRemoveWishlist: (item: any) => void;
  fetchDetailPlanet: (url: string) => void;
}

const ItemWishlist = ({ dataWishlist, handleRemoveWishlist, fetchDetailPlanet }: IPlanet) => {

  return (
      <CardContainer>
        {dataWishlist.length > 0 &&
          dataWishlist.map((item, index) => (
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
                    <ButtonDetail onClick={() => fetchDetailPlanet(item.url)}>Detail</ButtonDetail>
                    <ButtonWishlist onClick={() => handleRemoveWishlist(item)}>
                      Remove Wishlist
                    </ButtonWishlist>
                  </GroupButton>
                </Li>
              </Ul>
            </Card>
          ))}
      </CardContainer>
  );
};

export default ItemWishlist;
