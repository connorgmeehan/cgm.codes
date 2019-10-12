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

## Showcase

I had the opportunity to display my visuals for the melbourne based art collective [proximity](https://www.instagram.com/p_r_x_y/) where my visuals were on display for the final act of the night.  

https://twitter.com/connorgm/status/1182883285212397573

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Gamma Flow, my audio reactive visuals project, showcased at Proximity in melbourne <a href="https://t.co/m8vDgzLHES">pic.twitter.com/m8vDgzLHES</a></p>&mdash; Connor G Meehan (@connorgm) <a href="https://twitter.com/connorgm/status/1182883285212397573?ref_src=twsrc%5Etfw">October 12, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Inspiration

The main inspiration for this set of displays were 

## Tech

codeflow was built using openFrameworks to receive audio input, run it through an FFT as well as a custom (primitive) beat detection algorithm.  It then passes this information to 'Channels' which are tasked with using this information to generate visuals.  It was built with re-usability and automatic control in mind with the ability to automatically mix between and layer a number of Channels based on kick, snare or high hat triggers from the beat detection.  Setting up this mixing and matching can be achieved through a gui on a second window which communicates with the display manager through a number of callbacks.

## Problems faces

With absolute certianty, the most difficult part of the application was the gui to control the rendering of the display manager.  This was the project I learned C++ on and it was re-written a number of times, each being because I was unhappy with the architecture of the gui frontend.  The current solution of using callbacks is sufficient but when I get the opportunity to rewrite I will certainly be splitting the Visualising side of the program from the GUI and build an API with OSC to pass the required information.

Additionally, as this was my first C++ project, I ran into the expected herdles of memory and pointer management, however through this I was able to pick up experience debugging c++ applications using GDB.