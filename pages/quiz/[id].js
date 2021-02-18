import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({ dbExterno }) {
    return(
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen 
                externalQuestions={dbExterno.questions}
                externalBg={dbExterno.bg}
            />
            {/* <pre style={{color: 'black'}}>
                {JSON.stringify(dbExterno, null, 4)}
            </pre> */}
        </ThemeProvider>        
    );
}

export async function getServerSideProps(context) {
    const [projectName, githubUser] = context.query.id.split('___');
    // console.log('Infos que o Next da para nós: ', context);

    try {    
        const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
        .then((respostaDoServer) => {
            if(respostaDoServer.ok) {
                return respostaDoServer.json();
            }

            throw new Error('Falha em pegar os dados');
        })
        .then((respostaConvertidaEmObjeto) => {
            return respostaConvertidaEmObjeto;
        })
        .catch((err) => {
            console.error(err);
        });

        console.log(dbExterno);

        return {
            props: {
                dbExterno,
            },
        };
    } catch(err) {
        // redirect ...
        throw new Error(err);
    }
}