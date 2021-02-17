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
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';

import Input from '../src/components/Input';
import Button from '../src/components/Button';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

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
                name="nomeDoUsuario"
                onChange={(infosDoEvent) => setName(infosDoEvent.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
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
