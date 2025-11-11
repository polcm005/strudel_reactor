// This component holds a select menu that allows users to select a theme
function SelectTheme({onChange}) {
    return (
        <>
            <select className="form-select" aria-label="" onChange={onChange}>
                <option value="strudelTheme">Select Strudel REPL theme...</option>
                <option value="algoboy">Algoboy</option>
                <option value="androidstudio">AndroidStudio</option>
                <option value="archBtw">ArchBtw</option>
                <option value="atomone">Atomone</option>
                <option value="aura">Aura</option>
                <option value="bbedit">Bbedit</option>
                <option value="blackscreen">Blackscreen</option>
                <option value="bluescreen">Bluescreen</option>
                <option value="bluescreenlight">Bluescreenlight</option>
                <option value="CutiePi">CutiePi</option>
                <option value="darcula">Darcula</option>
                <option value="dracula">Dracula</option>
                <option value="duotoneDark">DuotoneDark</option>
                <option value="eclipse">Eclipse</option>
                <option value="fruitDaw">FruitDaw</option>
                <option value="githubDark">GithubDark</option>
                <option value="githubLight">GithubLight</option>
                <option value="gruvboxDark">GruvboxDark</option>
                <option value="gruvboxLight">GruvboxLight</option>
                <option value="materialDark">MaterialDark</option>
                <option value="materialLight">MaterialLight</option>
                <option value="monokai">Monokai</option>
                <option value="noctisLilac">NoctisLilac</option>
                <option value="nord">Nord</option>
                <option value="red-text">Red-text</option>
                <option value="solarizedDark">SolarizedDark</option>
            </select>
        </>
    );
}

export default SelectTheme;