import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import PreprocessControls from './components/PreprocessControls';
import PlayButtons from './components/PlayButtons';
import ProcessButtons from './components/ProcessButtons';
import PreprocessTextArea from './components/PreprocessTextArea';
import StopButton from './components/StopButton';
import ToggleButton from './components/ToggleButton';
import TextSizeControl from './components/TextSizeControl';
import InstrumentToggle from './components/InstrumentToggle';
import EffectSelection from './components/EffectSelection';
import FileUpload from './components/FileUpload';
import VolumeControls from './components/VolumeControls';
import SelectTheme from './components/SelectTheme';
import GraphArea from './components/GraphArea';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);
    
    const handleToggle = () => {
        globalEditor.toggle() // When called, this method either stops or starts the music, depending on whether it is currently playing
        if (isMusicPlaying == false) { setIsMusicPlaying(true) }; // if the music was not playing prior (i.e. false), change the isMusicPlaying state variable to true
        if (isMusicPlaying == true) { setIsMusicPlaying(false) }; // if the music was playing prior (i.e. true), change the isMusicPlaying state variable to false
        console.log(globalEditor);
    }

    const handleUserInputProcessing = () => {
        let text_to_process = songText;
        const terms_to_replace = /<b1_toggle>|<d1_toggle>|<d2_toggle>/gi
        let processed_text = text_to_process.replaceAll(terms_to_replace, '')
        setSongText(processed_text);
    }

    const handleInstrumentDetection = () => {
        let instrumentTerms = /bassline|main_arp|drums|drums2/gi
    }

    const handleBasslineDetection = () => {
        /*let basslineTerm = /bassline/gi*/
        let processed_text = songText.replaceAll('bassline', '_bassline')
    }

    //const handleMain_arpDetection = () => {
    //    let main_arpTerm = /main_arp/gi

    //}

    //const handledrumsDetection = () => {
    //    let drumsTerm = /drums/gi
    //}

    //const handleDrums2Detection = () => {
    //    let drums2Term = /drums/gi
    //}

    const handleCPS = (newCPSValue) => {
        console.log("handleCPS" + newCPSValue)
        let cpsRegex = /setcps\(.*\)/gi
        let processed_text = songText.replaceAll(cpsRegex, "setcps(" + newCPSValue + ")")
        setSongText(processed_text)
    }
    

    const handleThemeChange = (themeName) => {
        console.log("received theme" + themeName);
        globalEditor.setTheme(themeName)
    }

    const [songText, setSongText] = useState(stranger_tune) // This state variable holds the current user input entered in the PreprocessTextArea component

    const [fontSize, setTextSize] = useState(18) // This state variable holds the text size of the Strudel player contents

    const [isMusicPlaying, setIsMusicPlaying] = useState(false); // This state variable indicates whether the music is currently playing or stopped

    const [cpsValue, setCPSValue] = useState();

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
    }

    globalEditor.setCode(songText); 
    globalEditor.setFontSize(fontSize); 
}, [songText, fontSize]); // useEffect runs when the application beins, and whenever songText or fontSize change in value
return (
    <div>
        <h1 className="text-center shadow-lg text" style={{opacity:0.75, backgroundColor:'white'} }>Strudel Demo</h1>
        <br/>
        <main>
            <div className="container-fluid">
                <div className="row">
                    {/*Column 1 containing Strudel Player*/}
                    <div className="col-6 p-1 mx-auto shadow-lg " style={{ maxHeight: '91vh', overflowY: 'auto', backgroundColor: '#222222', borderStyle: 'solid', borderRadius: '15px', borderColor: '#fffb96', borderWidth: '3px' }}>
                        <div id="editor" />
                    </div>
                    {/*Column 2 containing interface components and textbox*/}
                    <div className="col-5 mx-auto pe-5" >
                        <div className="p-4 mb-4" style={{ backgroundColor: 'white', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px' }}>
                            <div>
                                <p><b>Interface Controls</b></p>
                            </div>
                            <nav>
                                <ProcessButtons processingLogic={handleUserInputProcessing} />
                                <ToggleButton onToggle={handleToggle} musicStatus={isMusicPlaying} /> {/*Whenever the toggle button is clicked, setIsMusicPlaying() sets the value of isMusicPlaying useState variable*/}
                                <TextSizeControl defaultValue={fontSize} onChange={(i) => setTextSize(i.target.value)} /> {/*Whenever the text size value is adjusted, setTextSize() sets the value of fontSize useState variable*/}
                                <div className="row">
                                    <div className="col-5">
                                        <PreprocessControls onChange={(i) => setCPSValue(i.target.value)} />
                                        
                                    </div>
                                    <div className="col-7">
                                        <VolumeControls />
                                    </div>
                                </div>
                                <InstrumentToggle />
                                <EffectSelection />
                                <FileUpload />
                                <SelectTheme onChange={(i) => handleThemeChange(i.target.value)} />
                                <GraphArea/>
                            </nav>
                        </div>
                        <div className="p-4" style={{ backgroundColor: 'white', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px' } }>
                            <PreprocessTextArea defaultValue={songText} onChange={(i) => setSongText(i.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/*    <div id="output" />*/}
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div>
);


}