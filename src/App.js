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
import CPSControls from './components/CPSControls';
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
import SaveSettings from './components/SaveSettings'
import LoadSettings from './components/LoadSettings'

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
    }

    // Responsible for changing the bassline instrument status
    const handleBassline = () => {
        if (basslineStatus == true) {
            let processed_text = songText.replaceAll('bassline:', '_bassline:');
            setSongText(processed_text);
        } else {
            let processed_text = songText.replaceAll('_bassline:', 'bassline:');
            setSongText(processed_text);
        }
    }

    // Responsible for changing the main_arp instrument status
    const handleMainArp = () => {
        if (mainArpStatus == true) {
            let processed_text = songText.replaceAll('main_arp:', '_main_arp:');
            setSongText(processed_text);
        } else {
            let processed_text = songText.replaceAll('_main_arp:', 'main_arp:');
            setSongText(processed_text);
        }
    }

    // Responsible for changing the drums instrument status
    const handleDrums = () => {
        if (drumsStatus == true) {
            let processed_text = songText.replaceAll('drums:', '_drums:');
            setSongText(processed_text);
        } else {
            let processed_text = songText.replaceAll('_drums:', 'drums:');
            setSongText(processed_text);
        }
    }

    // Responsible for changing the drums2 instrument status
    const handleDrums2 = () => {
        if (drums2Status == true) {
            let processed_text = songText.replaceAll('drums2:', '_drums2:');
            setSongText(processed_text);
        } else {
            let processed_text = songText.replaceAll('_drums2:', 'drums2:');
            setSongText(processed_text);
        }
    }

    // Responsible for changing the value of the 'pattern' setting in the song
    const handlePattern = (newValue) => {
        let patternRegex = /const pattern = .*/gi
        let processed_text = songText.replaceAll(patternRegex, 'const pattern = ' + newValue);
        setSongText(processed_text);
    }

    // Modifies the songText to use the user's provided setcps value
    const handleCPS = () => {
        let cpsRegex = /setcps\(.*\)/gi
        let processed_text = songText.replaceAll(cpsRegex, "setcps(" + cpsValue + ")")
        setSongText(processed_text)
    }

    // Modifies the Strudel repl theme per user selection
    const handleThemeChange = (themeName) => {
        globalEditor.setTheme(themeName)
    }

    // This function is used to modify the music volume
    const handleVolume = (newVolume) => {
        // Regular expression uses positive lookbehind and positive lookahead to only match the arguments of .gain() i.e. the value within the parenthesis
        let gainRegex = /(?<=.*\.gain\().*(?=\*|\))/g 
        // Volume is calculated by multiplying the existing argument of .gain() with the value returned by the volume slider.
        // However, this requires that the previous multiplier value be removed from the string prior to applying the new value returned by the volume slider.
        let processed_text = songText.replaceAll(gainRegex, (match) => (removeMultiplierFromGain(match) + "*" + newVolume)) 
        setSongText(processed_text);

    }

    // This function is used in the process of changing music volume, it returns a string that only contains the characters appearing prior to multiplication symbol * 
    const removeMultiplierFromGain = (oldVolumeValue) => {
        let volumeValue = oldVolumeValue.match(/.*(?=\*)/)  
        if (volumeValue == null) {
            return oldVolumeValue
        } else {
            return volumeValue;
        }
    }

    // This function is responsible for saving the current song settings as as JSON object state variable
    const handleJSONSave = () => {
        let settingDictionary = {
            "CPSValue": cpsValue,
            "basslineStatus": basslineStatus,
            "drumsStatus": drumsStatus,
            "drums2Status": drums2Status,
            "mainArpStatus": mainArpStatus,
            "patternStatus": patternStatus,
        }
        let jsonSettingString = JSON.stringify(settingDictionary);
        setJSONSettings(jsonSettingString);
    }

    // This function sets the state variables for various song settings and modifies songText according 
    // to the settings values specified in the jsonSettings state variable
    const handleJSONLoad = () => { 

        if (jsonSettings != null) { // i.e. There exists a saved setting

            let parsedJSON = JSON.parse(jsonSettings);
            
            let cpsRegex = /setcps\(.*\)/gi
            let processed_text = songText.replaceAll(cpsRegex, "setcps(" + parsedJSON.CPSValue + ")");

            if (parsedJSON.basslineStatus == true) {
                // true corresponds to the checkbox being ticked (i.e. instrument is playing), so the instrument is unmuted by removing the underscore
                processed_text = processed_text.replaceAll('_bassline:', 'bassline:'); 
            } else {
                // false corresponds to the checkbox being unticked (i.e instrument not playing), so the instrument is muted by prepending with an underscore. 
                // The following processing logic accounts for if the instrument is already muted, so additional underscores are not prepended
                processed_text = processed_text.replaceAll('_bassline:', 'bassline:');
                processed_text = processed_text.replaceAll('bassline:', '_bassline:');
            }

            if (parsedJSON.mainArpStatus == true) {
                processed_text = processed_text.replaceAll('_main_arp:', 'main_arp:');
            } else {
                processed_text = processed_text.replaceAll('_main_arp:', 'main_arp:');
                processed_text = processed_text.replaceAll('main_arp:', '_main_arp:');
            }

            if (parsedJSON.drumsStatus == true) {
                processed_text = processed_text.replaceAll('_drums:', 'drums:');
            } else {
                processed_text = processed_text.replaceAll('_drums:', 'drums:');
                processed_text = processed_text.replaceAll('drums:', '_drums:');
            }

            if (parsedJSON.drums2Status == true) {
                processed_text = processed_text.replaceAll('_drums2:', 'drums2:');
            } else {
                processed_text = processed_text.replaceAll('_drums2:', 'drums2:');
                processed_text = processed_text.replaceAll('drums2:', '_drums2:');
            }

            let patternRegex = /const pattern = .*/gi
            processed_text = processed_text.replaceAll(patternRegex, 'const pattern = ' + parsedJSON.patternStatus);

            setCPSValue(parsedJSON.CPSValue)
            setBasslineStatus(parsedJSON.basslineStatus)
            setMainArpStatus(parsedJSON.mainArpStatus)
            setDrumsStatus(parsedJSON.drumsStatus)
            setDrums2Status(parsedJSON.drums2Status)
            setPatternStatus(parsedJSON.patternStatus)
            console.log(processed_text)
            setSongText(processed_text);

        }
        else {alert("No settings are currently saved") }
    }

    const [songText, setSongText] = useState(stranger_tune) // Holds the current user input entered in the PreprocessTextArea component

    const [fontSize, setTextSize] = useState(18) // Holds the text size of the Strudel player contents

    const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Indicates whether the music is currently playing or stopped

    const [cpsValue, setCPSValue] = useState("140/60/4"); // Holds the value of the setcps() argument

    const [basslineStatus, setBasslineStatus] = useState(true); // Indicates whether the bassline instrument is checked (true) or unchecked (false)

    const [drumsStatus, setDrumsStatus] = useState(true); // Indicates whether the drums instrument is checked (true) or unchecked (false)

    const [drums2Status, setDrums2Status] = useState(true); // Indicates whether the drums2 instrument is checked (true) or unchecked (false)

    const [mainArpStatus, setMainArpStatus] = useState(true); // Indicates whether the main_arp instrument is checked (true) or unchecked (false)

    const [patternStatus, setPatternStatus] = useState("0"); // Holds the value of the pattern variable

    const [volumeModifier, setVolumeModifier] = useState("1"); // Holds the value of the volume variable

    const [jsonSettings, setJSONSettings] = useState(); // Holds the JSON object settings

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

}, [songText, fontSize, jsonSettings]); // useEffect runs when the application beins, and whenever songText, fontSize or jsonSettings change in value

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
                        <div className="p-4 pb-2 mb-3" style={{ backgroundColor: 'rgba(255,255,255, 0.4)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px', opacity: "100%" }}>
                            <div>
                        </div>
                            <nav>
                                <div className="shadow-lg">
                                    <ToggleButton onToggle={handleToggle} musicStatus={isMusicPlaying} /> {/*Whenever the toggle button is clicked, setIsMusicPlaying() sets the value of isMusicPlaying useState variable*/}
                                </div>
                                <div className="row mb-2 p-1 pt-2 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255, 0.2)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px', opacity: "100%" }}>
                                    <div className="col-6">
                                        <CPSControls value={cpsValue} onChange={(i) => setCPSValue(i.target.value)} onClick={(i) => { handleCPS()}} />
                                    </div>
                                    <div className="col-6">
                                        <VolumeSlider onChange={(i) => { setVolumeModifier(i.target.value); handleVolume(i.target.value) }} />
                                    </div>
                                </div>
                                <div className="row mb-2 p-2 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255, 0.2)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px', opacity: "100%" }}>
                                    <p><b>Toggle Instrumental Elements</b></p>
                                    <BasslineToggle checkedValue={basslineStatus} onChange={(i) => { setBasslineStatus(i.target.checked); handleBassline() }} />
                                    <MainArpToggle checkedValue={mainArpStatus} onChange={(i) => { setMainArpStatus(i.target.checked); handleMainArp() }} />
                                    <DrumsToggle checkedValue={drumsStatus} onChange={(i) => { setDrumsStatus(i.target.checked); handleDrums() }} />
                                    <Drums2Toggle checkedValue={drums2Status} onChange={(i) => { setDrums2Status(i.target.checked); handleDrums2() }} />
                                </div>
                                <div className="row mb-2 p-2 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255, 0.2)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px', opacity: "100%" }}>
                                    <PatternSetting checkedValue={patternStatus} onChange={(i) => { setPatternStatus(i.target.value); handlePattern(i.target.value) }} />
                                </div>
                                <div className="row mb-2 pt-4 pb-3 p-2 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255, 0.2)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px', opacity: "100%" }}>
                                    <TextSizeControl defaultValue={fontSize} onChange={(i) => setTextSize(i.target.value)} /> 
                                </div>
                                <div className="row mb-2 p-3 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255, 0.2)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px', opacity: "100%" }}>
                                    <SelectTheme onChange={(i) => handleThemeChange(i.target.value)} />
                                </div>
                                    <div className="row mb-2 pt-3 pb-3 p-2 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255, 0.2)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px', opacity: "100%" }}>
                                        <div className="col-6">
                                                <SaveSettings onClick={(i) => { handleJSONSave() }} />
                                        </div>
                                        <div className="col-6">
                                            <LoadSettings onClick={(i) => { handleJSONLoad() }} />
                                        </div>
                                    </div>
                            </nav>
                        </div>
                        <div className="p-4" style={{ backgroundColor: 'rgba(255,255,255, 0.4)', borderRadius: '15px', borderStyle: 'solid', borderColor: '#fffb96', borderWidth: '0px' } }>
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