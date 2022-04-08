import { useState } from 'react';
import {PollProp,OptionData} from '../utils/interfaces';
import { patchData } from '../utils/requests';


export default function VoteInPoll():JSX.Element {
    const [pollData, setPollData] = useState<PollProp>();
    const [lastOptionChanged,setLastOptionChanged] = useState<number>();
    const pollPathRegexArray: RegExpMatchArray[] = Array.from(window.location.href.matchAll(RegExp('polls/[0-9]+','g')));
    const pollDataPath:RegExpMatchArray = pollPathRegexArray[0];

    if(!pollData){
        fetch(`http://localhost:5000/${pollDataPath}`).then(res => res.json()).then(data => {
             data as PollProp;

                setPollData(data);

            }
        );
    }

    

    function onVoteButtonClick(index: number){
        if(pollData){
            const newOptionData:OptionData = pollData?.options[index];
            const currentCount:number = newOptionData.count;
            newOptionData.count = currentCount+1;
            const newPollData:PollProp = Object.assign({}, pollData);
            newPollData.options[index] = newOptionData;
            if(lastOptionChanged !== undefined){
                newPollData.options[lastOptionChanged].count--;
            }

            setPollData(newPollData);
            setLastOptionChanged(index);
            patchData(`http://localhost:5000/polls/${pollData.id}`,pollData)
        } 
    }



    return (
        <>
            <h1 className='vote-question'>{pollData?.question}</h1>
            <section className='flex-container-column centre-children'>
            {pollData?.options.map((o,i) => {
                return (
                    
                        <span className='flex-container-row' key={i}>
                            <p className='vote-option'>{o.name}</p>
                            <button onClick={() => onVoteButtonClick(i) } className={
                                lastOptionChanged===i?'vote-button green-background' : 'vote-button'
                            }>+1</button>
                        </span>
                    
                   
                )
            })}
            </section>
        </>
    )
}