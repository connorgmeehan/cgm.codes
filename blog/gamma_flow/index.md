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
  "description": "codeflow has been a personal project since 2016 when I took Interactive Media at The University of Technology Sydney.  It was here I learned about creative coding through processing and I've been inspired to move into the field ever since.  I've always had a strong connection to music and imagined shapes and scenes when listening to music and I wanted to explore that by producing a program that communicated these scenes.",
  "git": "https://github.com/connorgmeehan/codeflow"
}
---

import EmbeddedTweet from '~/components/EmbeddedTweet';

## Showcase

I had the opportunity to display my visuals for the melbourne based art collective [proximity](https://www.instagram.com/p_r_x_y/) where my visuals were on display for the final act of the night.  

<EmbeddedTweet id="1182883285212397573" />

## Inspiration

The main inspiration for this set of displays were 

## Tech

codeflow was built using openFrameworks to receive audio input, run it through an FFT as well as a custom (primitive) beat detection algorithm.  It then passes this information to 'Channels' which are tasked with using this information to generate visuals.  It was built with re-usability and automatic control in mind with the ability to automatically mix between and layer a number of Channels based on kick, snare or high hat triggers from the beat detection.  Setting up this mixing and matching can be achieved through a gui on a second window which communicates with the display manager through a number of callbacks.

## Problems faces

The most difficult part of building this application was working out the data flow of the GUI to control the rendering of the display manager.  This was the project I learned C++ on and it was re-written a number of times, each being because I was unhappy with the architecture of the gui frontend.  The current implementation has done away with the GUI, ([you can view a more primitive version with a gui here](https://github.com/connorgmeehan/gammaflow_delta)) but when I get the opportunity to rewrite I plan on implementing an API to control the displays in OSC and developing a seperate application tasked with controlling this data.
Additionally, as this was my first C++ project, I ran into the expected herdles of memory and pointer management, however through this I was able to pick up experience debugging C++ applications using GDB.
