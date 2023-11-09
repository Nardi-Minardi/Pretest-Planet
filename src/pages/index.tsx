import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import {useRouter} from 'next/router';

const MainStyled = styled.main`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 0;
`;

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainStyled>
        <h1 className="text-3xl font-bold text-center"> 
          Welcome,<br />
          My name is <span className="text-blue-500">Minardi</span> <br />
          Test Web Aplikasi Planet untuk Pre Employment Test
        </h1>

        <button 
        onClick={() => router.push('/planet')}
        className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </MainStyled>

    </div>
  );
};

export default Home;