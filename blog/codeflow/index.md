---
{
  "title": "codeflow",
  "shortdescription": " A framework for audio reactive visuals built in openFrameworks.",
  "date": "2018-03-06",
  "video": "/gammaflow-showcase.mp4",
  "tools": ["c++", "openFrameworks", "gdb"],
  "team": [],
  "methods": [],
  "myrole": [],
  "duration": "On going",
  "description": "codeflow has been a personal project since 2016 when I took Interactive Media at The University of Technology Sydney.  It was here I learned about creative coding through Processing and I've been inspired to move into the field ever since.  I've always had a strong connection to music and imagined shapes and scenes when listening to music and I wanted to explore that by producing a program that communicated these scenes.",
  "git": "https://github.com/connorgmeehan/codeflow"
}
---

import EmbeddedTweet from '~/components/EmbeddedTweet';

## Showcase

I had the opportunity to display my visuals for the melbourne based art collective [proximity](https://www.instagram.com/p_r_x_y/) where my visuals were on display for the final act of the night.  

<EmbeddedTweet :ids="['1182883285212397573']" />

## Inspiration

The main inspiration for this project was to communicate the energy and inspiration that music gave me and to compliment music to create a more encompassing experience for the viewer and listener.  The idea of creating a feedback loop between the music, visuals and audience interested me.  Aesthetically the displays are inspired by early digital art from the 60s and 70s, evident in the brutal aesthetic of many of the displays.  I was further inspired by learning about transient quantum states and wanted to explore this by creating an automatic, semi randomly generated set of visuals that were constantly in motion and rarely the same. 

## Tech

codeflow was designed to run off a real-time audio input, thus using I chose to use C++ creative coding openFrameworks to receive audio, run it through an FFT and pass that to a (primitive) beat detection algorithm that I developed.  It then passes this information to 'Channels' which are tasked with using this information to generate visuals.  It was built with re-usability and automatic control in mind with the ability to automatically mix between and layer a number of Channels based on kick, snare or high hat triggers from the beat detection.

## Problems faces

The hardest problem I faced was staying creative when trying to debug cryptic c++ errors.  I overcame this by sectioning my time between designing and planning new displays when bursts of inspiration came and writing this down so I could reference it when in the less creative mindset of trying to make the program work.

On the technical side, I found the flow of data from Audio Analyser to gui to displays difficult to manage and as a result have re-written this application many times.  However, this repetition inspired me to improve my technical skills and use different program architecture concepts and each implementation was better than the last.  The latest version does not yet have a gui but when I get the chance I plan on developing a seperate application that controls the AudioAnalyser/DisplayManager via an [OSC](https://opensoundcontrol.org) api. ([you can view a more primitive version of this project with a gui here](https://github.com/connorgmeehan/gammaflow_delta)).

Additionally, as this was my first C++ project, I ran into the expected hurdles of memory and pointer management.  While frustrating I overcame this with hours of debugging and further developed my knowledge through watching C++ theory explanations by C++ game dev [The Cherno](https://youtube.com/user/TheChernoProject) on youtube.
