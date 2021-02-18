import React, {useState} from 'react';

import Widget from '../Widget';
import Button from '../Button';
import BackLinkArrow from '../BackLinkArrow';

import AlternativesForm from '../AlternativesForm';


function QuestionWidget({
    question, 
    questionIndex, 
    totalQuestions,
    onSubmit,
    addResult
}) {
    const [selectedAlternative, setSelectedAlternative] = useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !==  undefined;

    return(
        <div>
            <Widget>
                <Widget.Header>
                    <BackLinkArrow href="/" />
                    <h3>
                        {`
                            Pergunta ${questionIndex + 1} de ${totalQuestions}
                        `}                        
                    </h3>
                </Widget.Header>
                <img 
                    alt="Descrição"
                    style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover'
                    }}
                    src={question.image}
                />

                <Widget.Content>
                    <h2>
                        {question.title}
                    </h2>
                    <p>
                        {question.description}
                    </p>
                    
                    <AlternativesForm onSubmit={(infosDoEvent) => {
                        infosDoEvent.preventDefault();
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                            addResult(isCorrect);
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                            onSubmit();
                        }, 3 * 1000);
                    }}>
                        {question.alternatives.map((alternative, alternativeIndex) => {
                            const alternativeId = `alternative__${alternativeIndex}`;
                            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                            const isSelected = selectedAlternative === alternativeIndex;

                            return (
                                <Widget.Topic
                                    as="label"
                                    key={alternativeId}
                                    htmlFor={alternativeId}
                                    data-selected={isSelected}
                                    data-status={isQuestionSubmited && alternativeStatus}
                                >
                                    <input 
                                        style={{display: "none"}}
                                        id={alternativeId}
                                        name={questionId}
                                        onChange={() => setSelectedAlternative(alternativeIndex)}
                                        type="radio"
                                    />
                                    {alternative}
                                </Widget.Topic>
                            );
                        })}

                        {/* <pre>
                            {JSON.stringify(question, null, 4)}
                        </pre> */}

                        <Button type="submit" disabled={!hasAlternativeSelected}>
                            Confirmar
                        </Button>
                        {/* <p>selectedAlternative: {selectedAlternative}</p> */}
                        {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                        {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
                    </AlternativesForm>
                </Widget.Content>
            </Widget>
        </div>
    );
}

export default QuestionWidget;