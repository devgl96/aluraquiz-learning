import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Import components from folder src
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export const Input = styled.input`
  width: 100%;

  background: none;
  font-size: 0.7rem;
  border: 2px solid ${({theme}) => theme.colors.primary};
  border-radius: 3px;
  margin: 1.5em 0;
  padding: 0.75em;
  color: #FFF;
`;

export const Button = styled.button`
  width: 100%;
  background: ${({theme}) => theme.colors.secondary};
  color: ${({theme}) => theme.colors.primary};

  font-size: 1em;
  margin: 1em 0 0;
  padding: 0.50em 1em;
  border: 2px solid ${({theme}) => theme.colors.primary};
  border-radius: 3px;

  &:disabled {
    background: #333;
    color: #DDD;
    border: 2px solid #DDD;
  }
`;

export default function Home() {
  const router = useRouter();
  
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - CSS Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        {/* First Widget */}
        <Widget>
          <Widget.Header>
            <h1>CSS Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Teste os seus conhecimentos sobre o universo CSS e divirta-se criando o seu AluraQuiz!</p>
            <form onSubmit={(infosDoEvent) => {
              infosDoEvent.preventDefault();
              
              router.push(`/quiz?name=${name}`);

              console.log("Making a submit from react");
            }}>
              {/* <input 
                onChange={(infosDoEvent) => {
                  setName(infosDoEvent.target.value);
                }}
                placeholder="Diz ai seu nome"/> */}
              <Input 
                onChange={(infosDoEvent) => {
                  setName(infosDoEvent.target.value);
                }}
                placeholder="Diz ai seu nome"/>
              
              <Button type="submit" disabled={name.length === 0}>
                JOGAR
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        {/* Second Widget */}
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/devgl96" />
    </QuizBackground>
  );
}
