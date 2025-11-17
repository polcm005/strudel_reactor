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
import BasslineToggle from './components/BasslineToggle';
import EffectSelection from './components/EffectSelection';
import FileUpload from './components/FileUpload';
import VolumeControls from './components/VolumeControls';
import SelectTheme from './components/SelectTheme';
import GraphArea from './components/GraphArea';
import DrumsToggle from './components/DrumsToggle'
import Drums2Toggle from './components/Drums2Toggle'
import MainArpToggle from './components/MainArpToggle'
import PatternSetting from './components/PatternSetting'
import VolumeSlider from './components/VolumeSlider'

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
        /*console.log(globalEditor);*/
        //console.log("cpsvalue " + cpsValue);
    }

    const handlePlay = () => {
        globalEditor.evaluate()
        setIsMusicPlaying(true)
    }

    const handleStop = () => {
        globalEditor.stop();
        setIsMusicPlaying(false);
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

    const handleBassline = () => {
        if (basslineStatus == true) {
            let processed_text = songText.replaceAll('bassline:', '_bassline:');
            setSongText(processed_text);
        } else { let processed_text = songText.replaceAll('_bassline:', 'bassline:');
            setSongText(processed_text);
        }
    }

    const handleDrums = () => {
        if (drumsStatus == true) {
            let processed_text = songText.replaceAll('drums:', '_drums:');
            setSongText(processed_text);
        } else {
            let processed_text = songText.replaceAll('_drums:', 'drums:');
            setSongText(processed_text);
        }
    }

    const handleDrums2 = () => {
        if (drums2Status == true) {
            let processed_text = songText.replaceAll('drums2:', '_drums2:');
            setSongText(processed_text);
        } else {
            let processed_text = songText.replaceAll('_drums2:', 'drums2:');
            setSongText(processed_text);
        }
    }

    const handleMainArp = () => {
        if (mainArpStatus == true) {
            let processed_text = songText.replaceAll('main_arp:', '_main_arp:');
            setSongText(processed_text);
        } else {
            let processed_text = songText.replaceAll('_main_arp:', 'main_arp:');
            setSongText(processed_text);
        }
    }

    const handlePattern = (newValue) => {
        let patternRegex = /const pattern = .*/gi
        let processed_text = songText.replaceAll(patternRegex, 'const pattern = ' + newValue);
        setSongText(processed_text);
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

    // Modifies the songText to use the user's provided setcps value
    const handleCPS = () => { 
        
        /*console.log("handleCPS" + cpsValue)*/
        let cpsRegex = /setcps\(.*\)/gi
        let processed_text = songText.replaceAll(cpsRegex, "setcps(" + cpsValue + ")")
        setSongText(processed_text)
        //console.log("pre-restart" + processed_text)
        //console.log("pre-restart" + songText)
    }

    // Modifies the Strudel repl theme per user selection
    const handleThemeChange = (themeName) => {
        /*console.log("received theme" + themeName);*/
        globalEditor.setTheme(themeName)
    }

    //const handleBasslineVolume = () => {
    //    let basslineRegex = /bassline:.*?\.gain\(.*?\)/gis

    //}

    //const volumeMultiply = (input1, volume) => {
    //    console.log("input1 " + input1)
    //    console.log("volume " + volume)
    //    let sum = input1 * volume;
    //    console.log("sum " + sum)
    //    return sum.toString();
    //}

    //const handleVolume = (newVolume) => {
    //    let gainRegex = /(?<=\.gain\().*(?=\))/g
    //    let processed_text = songText.replaceAll(gainRegex, volumeMultiply(Number(gainRegex), Number(newVolume)))
    //    console.log("processed_text" + processed_text)

    //}

    //const handleVolume = (newVolume) => {
    //    let gainRegex = /(?<=\.gain\().*(?=\))/g
    //    let processed_text = songText.replaceAll(gainRegex, (match) => volumeMultiply(Number(match), Number(newVolume)))
    //    console.log("processed_text" + processed_text)
    //    setSongText(processed_text);

    //}

    const handleVolume = (newVolume) => {
        console.log("newVolume" + newVolume)
        // Regular expression uses positive lookbehind and positive lookahead to only match the arguments of .gain() i.e. the value within the parenthesis
        let gainRegex = /(?<=.*\.gain\().*(?=\*|\))/g 
        // Volume is calculated by multiplying the existing argument of .gain() with the value returned by the volume slider.
        // However, this requires that the previous multiplier value be removed from the string prior to applying the new value returned by the volume slider.
        let processed_text = songText.replaceAll(gainRegex, (match) => (removeMultiplierFromGain(match) + "*" + newVolume)) 
        console.log("processed_text" + processed_text)
        setSongText(processed_text);

    }

    
    const removeMultiplierFromGain = (oldVolumeValue) => {
        console.log("oldvolumevalue " + oldVolumeValue);
        let volumeValue = oldVolumeValue.match(/.*(?=\*)/)
        console.log("volumeValue " + volumeValue);
        if (volumeValue == null) {
            return oldVolumeValue
        } else {
            return volumeValue;
        }
    }


    const [songText, setSongText] = useState(stranger_tune) // This state variable holds the current user input entered in the PreprocessTextArea component

    const [fontSize, setTextSize] = useState(18) // This state variable holds the text size of the Strudel player contents

    const [isMusicPlaying, setIsMusicPlaying] = useState(false); // This state variable indicates whether the music is currently playing or stopped

    const [cpsValue, setCPSValue] = useState();

    const [basslineStatus, setBasslineStatus] = useState(true);

    const [drumsStatus, setDrumsStatus] = useState(true);

    const [drums2Status, setDrums2Status] = useState(true);

    const [mainArpStatus, setMainArpStatus] = useState(true);

    const [patternStatus, setPatternStatus] = useState("0");

    const [volumeModifier, setVolumeModifier] = useState();

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

    if (isMusicPlaying == true) {
        globalEditor.evaluate();
    }

}, [songText, fontSize]); // useEffect runs when the application beins, and whenever songText or fontSize change in value
return (
    <div>
        <h1 className="text-center shadow-lg text" style={{ backgroundColor:'rgba(255,255,255, 0.5)'} }>Strudel Demo</h1>
        <br/>
        <main>
            <div className="container-fluid">
                <div className="row">
                    {/*Column 1 containing Strudel Player*/}
                    <div className="col-6 p-1 mx-auto shadow-lg " style={{ maxHeight: '91vh', overflow: 'scroll', backgroundColor: '#222222', borderStyle: 'solid', borderRadius: '15px', borderColor: '#fffb96', borderWidth: '3px' }}>
                        <div id="editor" />
                    </div>
                    {/*Column 2 containing interface components and textbox*/}
                    <div className="col-5 mx-auto pe-5" >
                        <div className="p-4 mb-4" style={{ backgroundColor: 'rgba(255,255,255, 0.5)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px', opacity: "100%" }}>
                            <div>
                                {/*<p><b>Interface Controls</b></p>*/}
                            </div>
                            <nav>
                                {/*<ProcessButtons processingLogic={handleUserInputProcessing} />*/}
                                <ToggleButton onToggle={handleToggle} musicStatus={isMusicPlaying} /> {/*Whenever the toggle button is clicked, setIsMusicPlaying() sets the value of isMusicPlaying useState variable*/}
                                <p><b>Setting Controls</b></p>
                                <div className="row">
                                    <div className="col-6">
                                        <PreprocessControls onChange={(i) => setCPSValue(i.target.value)} onClick={(i) => { handleCPS()}} />
                                        
                                    </div>
                                    <div className="col-6">
                                        <VolumeControls />
                                    </div>
                                </div>
                                <p><b>Toggle Instrumental Elements</b></p>
                                <div className="row mb-3">
                                    <BasslineToggle onChange={(i) => { setBasslineStatus(i.target.checked); handleBassline() }} />
                                    <MainArpToggle onChange={(i) => { setMainArpStatus(i.target.checked); handleMainArp() }} />
                                    <DrumsToggle onChange={(i) => { setDrumsStatus(i.target.checked); handleDrums() }} />
                                    <Drums2Toggle onChange={(i) => { setDrums2Status(i.target.checked); handleDrums2() }} />
                                </div>
                                <div className="row mb-3">
                                    <PatternSetting onChange={(i) => { setPatternStatus(i.target.value); console.log("pattern status should now be " + i.target.value); handlePattern(i.target.value) }} />
                                </div>
                                <EffectSelection />
                                <TextSizeControl defaultValue={fontSize} onChange={(i) => setTextSize(i.target.value)} /> {/*Whenever the text size value is adjusted, setTextSize() sets the value of fontSize useState variable*/}
                                <SelectTheme onChange={(i) => handleThemeChange(i.target.value)} />
                                <FileUpload />
                                <GraphArea />
                                <VolumeSlider onChange={(i) => { setVolumeModifier(i.target.value); console.log("volume" + i.target.value); handleVolume(i.target.value) }} />
                            </nav>
                        </div>
                        <div className="p-4" style={{ backgroundColor: 'rgba(255,255,255, 0.5)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px' } }>
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