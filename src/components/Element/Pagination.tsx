import React from "react";
import styled from "styled-components";

interface Props {
  postsPerPage: any;
  totalPosts: any;
  paginate: any;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0 5px;
  }

  a {
    padding: 5px 10px;
    border: 1px solid #000;
    border-radius: 5px;
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    background: #000;
    color: #fff;
  }
`;



const Pagination = ({ postsPerPage, totalPosts, paginate }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Nav>
        <ul>
          {pageNumbers.map(number => (
            <li key={number}>
              <a onClick={() => paginate(number)} href="#">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </Nav>
    </Container>
  );
};

export default Pagination;
