---
{
  "title": "face d_tect",
  "shortdescription": "Interactive installation to raise awareness for the growing prevalence of mass surveilance and the way marginalized communities are disproportionately effect.",
  "date": "2019-11-06",
  "image": "/face-d_tect-glamour.png",
  "video": "/face-d_tect-showcase.webm",
  "team": [
    { "name": "Bethany Koulyras", "link": "https://www.linkedin.com/in/beth-koulyras" },
    { "name": "Nathan Judges", "link": "https://nathanjudges.com/" },
    { "name": "Benjamin Flemming", "link": "https://www.linkedin.com/in/benjamin-fleming-92695217b"},
  ],
  "tools": ["AB Testing", "Body Storming", "C++", "Java", "Python", "Raspberry Pi", "openFrameworks", "Processing", "openCV"],
  "myrole": [
    { "name" : "Concept Generation", "link": "" },
    { "name" : "Helping design physical installation appearance", "link": "" },
    { "name" : "Designing how the system will operate", "link": "" },
    { "name" : "Implementing visuals from mockups", "link":"" },
    { "name" : "Implementing communication between AI backend and displays", "link":"" }
  ],
  "git": "https://github.com/connorgmeehan/deco3200-interactive-produce-design",
  "duration": "3 months",
  "description": "An interactive art installation that aims to raise awareness and action for the potential for AI and computerised surveillance to further disadvantage marginalized groupes.  It makes use of modern machine learning models to analyse user's faces and attempt to predict their age, gender and emotion, denying them any further interaction to reflect the lack of power and safety measures we have as individuals.  When the interaction is complete, the user can scan a QR code to send an email raising concerns of these technologies use to the  Department of Home Affairs, the government body responsible for employing these AI systems in Australia's local security operations.  It was built for Interactive Product Design Studio at the University of Sydney and will be presented in the Design 2019 Graduation show in December."
}
---

import EmbeddedImage from '~/components/EmbeddedImage';

# Portfolio entry still work in progress...

---
# Showcase

# Process

## 1. Brief

## 2. Defining the problem

## 3. Design Process

## 4. Technical Implementation
I designed the system to be split into 3 logical components:

1. A control centre that was responsible for managing the dataflow, logic and communication of the display.  It recieves webcam input and passes it through openFrameworks addon [ofxFaceTracker](https://github.com/kylemcdonald/ofxFaceTracker) to find users faces and cuts out the regions of interest, saving the images via a named [FIFO pipe](https://github.com/antimodular/ofxFifo).

2. The python processes run an [OSC server](https://pypi.org/project/osc4py3/) and when alerted that a new face was present, read the face and ran it through their respective algorithms.  These algorithms used pre-trained models and neural network architectures such as Convolutional Neural Networks, MobileNetV2 an Inceptionv3 from libraries such as [Keras](https://keras.io/) and  [TensorFlow](https://www.tensorflow.org/) to predicted characteristics of users before passing the results back to the control centre.

3. A number of [Raspberry Pi](https://www.raspberrypi.org/)'s responsible for handling input data, formatted by the control centre, via an [OSC server](http://www.sojamo.de/libraries/oscP5/) and rendering it in a [Processing](https://processing.org/) sketch.

<EmbeddedImage src="/face-d_tect-technical-implementation.png" alt="Diagram of each process of this project, showing a control centre that recieves webcam input, passes a cutout of the user's face to each neural network, recieves the returned value and passes it to each display process." type="fullwidth" />

As for the physical implementation, we collected second hand screens from services like Facebook Marketplace and gumtree and used a plethora of adapters to fit our Raspberry Pis to the range of inputs these screens required.  Each computer communicated on a local network area network over static IPs stored in an environment file.
