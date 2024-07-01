'use client'
import React, { useEffect, useState } from 'react';
import LetterBox from './boxLetter'

const WordleGame = ({letterList}:any) => {
    
    const searchedWordList = ['C', 'A', 'N', 'O', 'E'];
    const [input, setInput] = useState<string>('');
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            
            if (key === 'Enter') {
                if (input.length == 5){
                    let letters: string[] = input.split('');
                    for(let i = 0; i < 30; i++){
                        if(letterList[i].letter === '' || letterList[i].letter === undefined){
                            letterList[i].letter = letters[0];
                            if (searchedWordList.includes(letters[0])){
                                letterList[i].color = 'yellow';
                                if(searchedWordList[i%6] == letters[0]){
                                    letterList[i].color = 'green';
                                }
                            }
                            else{
                                letterList[i].color = 'gray';
                            }
                            letters.shift();
                        }
                    }
                    console.log(letterList)
                }
          setInput('');
        } else if (key === 'Backspace') {
          // Handle Backspace key press
          setInput((prevInput) => prevInput.slice(0, -1));
        } else {
          // Handle other key presses
          if (input.length < 5) {
            const uppercaseKey = key.toLocaleUpperCase(); // Convert key to uppercase
            setInput((prevInput) => prevInput + uppercaseKey);
          }
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [input]); // Dependency array ensures useEffect runs when input changes
    return (
        <div>
            <p>{input}</p>
            {/* <CheckWord word={word} letterList = {letterList}/> */}
            <div className='flex flex-col items-center justify-center'>
                {[...Array(6)].map((_, i) => (
                    <div className='flex flex-row'>
                        {[...Array(5)].map((_, index) => (
                            <div className='m-1'>
                                <LetterBox letter={letterList[index+i*5] ? letterList[index+i*5].letter : ''}
                                    color={letterList[index+i*5] ? letterList[index+i*5].color : ''} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WordleGame