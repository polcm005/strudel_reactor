# Strudel Demo

### Author: Conrad Polewski
Student ID: 110150550

## Controls:

### 1. Play Music toggle button:

This button can be clicked to either play or stop the music, depending on whether the music is currently playing. Upon clicking the button, the button text and colour will change, indicating what action will occur once the user next clicks it.

### 2. Set Cycles Per Second Controls:

This input field is used to set the value of the 'setcps()' (set cycles per second) function. This function dictates the tempo of the music, with higher values producing higher tempos and lower values producing lower tempos. Numerical inputs can be in decimal notation (e.g. 0.2) or separated using forward slashes (such as with the default song value of 140/60/4). For a value to take effect, the user must click submit. Note that this control only changes the setcps value when an input different to the last is submitted; the same value can not be submitted successively. For example, if the user sets the value to 0.4, then loads a previous setting with 0.6, they cannot set the value to 0.4 again immediately. Instead, they must first enter a different value for the component to detect a change.

### 3. Volume Control:

This slider allows the user to decrease or increase the music volume. To use, click the blue circular icon and drag and drop to the left to reduce music volume, or drag and drop to the right to increase music volume.

### 4. Toggle Instrumental Elements Checkboxes:

This UI element consists of a 4 checkbox components, one for each of the main instruments

* bassline
* main_arp
* drums
* drums2

All checkboxes are checked by default, as all instruments are enabled in the song. Upon clicking an instrument's checkbox, that instrument will become unchecked, and that instrument will stop playing (if music is being played). If clicked again, the checkbox will become checked, and that instrument will resume playing (if music is being played).

### 5. Change Pattern Radio:

This radio control will change the value of the 'pattern' variable in the song, which can take on one of the values of 0, 1 or 2 at any one time. Changing the pattern will affect the sound of any instrument that is checked at that time.

### 6. Text Control Size:

This slider will change the size of the text within the Strudel Repl area. Drag and drop it to the right to make text larger, or drag and drop it to the left to make text smaller.

### 7. Select Strudel REPL theme:

This drop down selection allows the user to change the theme of the Strudel Repl area to one of various presets provided in the Strudel files.

### 8. Save Current Settings button:

Clicking this button allows the user to save the current settings of the set cycles per second, toggle instrumental elements, and change pattern music controls. Users can only save one lot of settings at a time. Upon saving a different setting configuration, the previous one will be overwritten.

### 9. Load Saved Settings button:

Clicking this button allows the user to load the latest settings saved with the 'Save Current Settings' button, if any have been saved. This will modify the song in the Strudel Repl with the saved setcps() value, the saved instrumental elements settings, and the saved pattern setting. It will also modify the Toggle Instrumental Element and Change Pattern UI elements accordingly. The saving and load feature has been observed to function correctly for successive saves and loads.

## Declarations

My demonstration Video: https://youtu.be/Rd3UkfDvEKw

My project github repository (All my work has been completed on the React_Components branch): https://github.com/polcm005/strudel_reactor/tree/React_Components

I am claiming no bonus points for this assignment.

I have used the song provided with the assignment starter code. I have made minor modifications to the song, such as removing // all(x => x.gain(mouseX.range(0,1))) and adding .gain() functions. I have not used any song code from the Strudel.cc bakery or any other source. 

I have not used any AI tools or AI generated code in this assignment. Aside from the provided starter code, and elements of the provided assignment resources, all work is my own.

