import Head from 'next/head';
import styled from 'styled-components';

const Heading = styled.h1`
  color: green;
`;

const Home = () => (
  <div>
    <Heading>Inicio</Heading>
  </div>
)

export default Home;