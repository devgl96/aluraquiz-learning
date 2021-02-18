import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import db from '../../db.json';

import Widget from '../../src/components/Widget';
import QuestionWidget from '../../src/components/QuestionWidget';

import QuizLogo from '../../src/components/QuizLogo';
import QuizContainer from '../../src/components/QuizContainer';
import QuizBackground from '../../src/components/QuizBackground';

// import Input from '../src/components/Input';
// import Button from '../src/components/Button';

function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>
                Tela de Resultado:
            </Widget.Header>

            <Widget.Content>
                <p>
                    Você acertou 
                    {' '} 
                    {/* {results.reduce((somatoriaAtual, resultAtual) => {
                    const isAcertou = resultAtual === true;
                    if(isAcertou) {
                        return somatoriaAtual + 1;
                    }
                    return somatoriaAtual;
                }, 0)} */}
                    {results.filter((x) => x).length}
                    {' '}
                    perguntas!</p>
                <ul>
                    { results.map((result, index) => (
                        <li key={`result__${result}`}>
                            #{index+1} Resultado: 
                            {result === true ? ' Acertou' : ' Errou'}
                        </li>
                    ))
                    }
                </ul>
            </Widget.Content>
        </Widget>
    );
}

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                [Desafio do Loading]
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {
    const [screenState, setScreenState] = useState(screenStates.LOADING);
    const [results, setResults] = useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function addResult(result) {
        setResults([
            ...results, 
            result
        ]);
    }

    // [React chama de: Efeitos || Effects]
    useEffect(() => {
        // fetch()
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1 * 1000);
        // nasce === didMount
    }, []);
    // atualizado === willUpdate
    // morre === willUnmount

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if(nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            setScreenState(screenStates.RESULT);
        }

    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>AluraQuiz - CSS Quiz</title>
            </Head>
            <QuizContainer>
                <QuizLogo />

                { screenState === screenStates.QUIZ &&
                    (<QuestionWidget 
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmitQuiz}
                        addResult={addResult}
                    />)
                }
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <ResultWidget results={results} />}
            </QuizContainer>
        </QuizBackground>
    );
}