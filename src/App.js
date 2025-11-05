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

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

//export function SetupButtons() {

//    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//    document.getElementById('process').addEventListener('click', () => {
//        Proc()
//    }
//    )
//    document.getElementById('process_play').addEventListener('click', () => {
//        if (globalEditor != null) {
//            Proc()
//            globalEditor.evaluate()
//        }
//    }
//    )
//}



//export function ProcAndPlay() {
//    if (globalEditor != null && globalEditor.repl.state.started == true) {
//        console.log(globalEditor)
//        Proc()
//        globalEditor.evaluate();
//    }
//}

//export function Proc() {

//    let proc_text = document.getElementById('proc').value
//    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//    ProcessText(proc_text);
//    globalEditor.setCode(proc_text_replaced)
//}

//export function ProcessText(match, ...args) {

//    let replace = ""
//    if (document.getElementById('flexRadioDefault2').checked) {
//        replace = "_"
//    }

//    return replace
//}

export default function StrudelDemo() {

    const hasRun = useRef(false);
    
    const handlePlay = () => {
        globalEditor.evaluate()
        console.log(globalEditor)
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    const handleToggle = () => {
        globalEditor.toggle()
        /*globalEditor.setFontSize(5)*/

    }

    const [songText, setSongText] = useState(stranger_tune)

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
            
       // document.getElementById('proc').value = stranger_tune
        //SetupButtons()
        //Proc()
    }
    globalEditor.setCode(songText);
}, [songText]);


return (
    <div style={{ backgroundColor:'#EDEDED' }}>
        <h1 className="text-center shadow-lg">Strudel Demo</h1>
        <br/>
        <main>

            <div className="container-fluid">
                <div className="row">
                    {/*<div className="col-md-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>*/}
                    {/*    <PreprocessTextArea defaultValue={songText} onChange={(i) => setSongText(i.target.value)} />*/}
                    {/*</div>*/}
                    {/*<div className="col-md-6 overflow-hidden">*/}
                    <div className="col-6 p-1 mx-auto shadow-lg" style={{ maxHeight: '91vh', overflowY: 'auto', backgroundColor: '#222222', borderStyle: 'solid', borderRadius: '15px',  opacity: 0.90 }}>
                        <div id="editor" />
                    </div>
                    <div className="col-5 mx-auto pe-5" >
                        <div className="p-4" style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                            <nav>
                                <ProcessButtons />
                                <br />
                                <PlayButtons onPlay={handlePlay} onStop={handleStop} onToggle={handleToggle} />
                                <br />
                                <br />
                                <PreprocessControls />        
                                <br />
                            </nav>
                        </div>
                        <br/>
                        <div className="p-4" style={{ backgroundColor: 'white', borderRadius: '15px'} }>
                            <PreprocessTextArea defaultValue={songText} onChange={(i) => setSongText(i.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/*<div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>*/}
                    {/*    <div id="editor" />*/}
                    {/*    <div id="output" />*/}
                    {/*</div>*/}
                    {/*<div className="col-md-4">*/}
                    {/*    <PreprocessControls />         */}
                    {/*</div>*/}
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div>
);


}