---
{
  "title": "face d_tect",
  "shortdescription": "Interactive installation to raise awareness for the growing prevalence of mass surveillance and the way marginalized communities are disproportionately effect.",
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
  "description": "An interactive art installation that aims to raise awareness and action for the potential for AI and computerised surveillance to further disadvantage marginalized groups.  It makes use of modern machine learning models to analyse user's faces and attempt to predict their age, gender and emotion, denying them any further interaction to reflect the lack of power and safety measures we have as individuals.  When the interaction is complete, the user can scan a QR code to send an email raising concerns of these technologies use to the  Department of Home Affairs, the government body responsible for employing these AI systems in Australia's local security operations.  It was built for Interactive Product Design Studio at the University of Sydney and will be presented in the Design 2019 Graduation show in December."
}
---

import EmbeddedImage from '~/components/EmbeddedImage';
import EmbeddedMultiImage from '~/components/EmbeddedMultiImage';
import EmbeddedYoutube from '~/components/EmbeddedYoutube';

# Process




## 1. Brief

With this project we were given three areas of interest to design within.  We chose stream of augmenting urban environments with the goal of empowering disadvantaged and marginalised communities.  Furthermore, we were interested in the way computerised mass surveillance exacerbates the effect of stigmatisation and marginalisation to any group that does not fit within the 'norm'.

<EmbeddedImage src="/face-d_tect/brainstorm.jpg" alt="Image of final assessment showing cartoon renditions of Donald Trump and Hillary Clinton." type="fullwidth" />

However, as we researched ways of supporting these communities, we discovered that attempting to focus on a single area and engineer an isolated solution is often unhelpful and can result in an extension of the marginalisation we were attempting to combat.  As a result we decided to take a holistic approach by generating empathy within the broader population towards the groups most affected.  





## 2. Ideating solutions

Building off the idea of generating empathy with our users towards marginalized groups we generated 12 initial concepts before deciding on the three most promising concepts to develop further as our hero concepts.

#### Concept 1: Harassment Trails

> You are walking pas a large digital screen.  As you walk by you realise male figures are appearing beside you.  When you look at them, harassing rhetoric in speech bubbles appears above their heads.  At the end of the display is a paypass terminal asking for donations.

<EmbeddedMultiImage :data="[{ src: '/face-d_tect/concept-art-harassment-trails.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}]" />

Harassment trails was an interactive display designed to generate empathy and understanding within men towards women's experiences of gender-based street harassment.  This was my hero concept.

#### Concept 2: Anti-hostile Architecture

> You walk by a bench that looks unlike any you've seen before.  You sit down, after a moment, parts of the bench poke up from below you causing you to stand up.  You sit down again, this time leaning back and laying down.  Nothing pokes up.

<EmbeddedMultiImage :data="[{ src: '/face-d_tect/concept-art-antihostile-architecture.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}]" />

The installation's goal was to juxtapose with hostile architecture benches that disallowed sleeping and generate empathy within those who were not homeless towards the experience of those who were.

#### Concept 3: Black Mirror

> You approach an artwork made of a portrait mirror with multiple screens surrounding it.  On one side you read "#27 | Male | 24yo | Curios".  You look into the mirror and it flashes.  On the same screen now reads "#28 | Female | 26yo | Confused".  You are female, you had your 26th birthday last month and you were confused by what the installation might be.

<EmbeddedMultiImage :data="[{ src: '/face-d_tect/concept-art-black-mirror.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}]" />

Black mirror took a less direct approach by aiming to bring to light the potential for misuse of computerised surveillance both in general and as an extension of current discriminatory sentiments.




## 3. User Testing

With these three hero concepts we ran a low fidelity experience walkthrough before transcribing the results and using collaborative user research assistance tool UserBit to analyse the transcriptions and inform us of the most promising concept.

#### Harassment Trails

For my concept, Harassment Trails, I narrated the experience to 4 people who had and hadn't experienced gender based street harassment and used a simple prototype built in openFrameworks and Wizard of Oz-ed the interaction to aid their imagination.  

<EmbeddedMultiImage :data="[{ src: '/face-d_tect/testing-harrassment-trails.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}]" />`

After finding that it didn't communicate the intended message and confirmed our fears that it was graphic enough to bring up trauma we decided to scrap the ideas.

#### Anti-hostile architecture

Benjamin's concept, Black Mirror, was tested in a similar way to mine by both Benjamin and Bethany.  It was tested on two males and one female with two participants self identifying with the statement that technology has contributed to them having difficulty finding suitable work.

<EmbeddedMultiImage :data="[{ src: '/face-d_tect/testing-black-mirror.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}]" />

While participants like the idea, again we found that the message was not communicated clearly without associated information and the interactive elements were not as involved in the design as the subject learning outcomes allowed we decided to scrap it as well.


#### Black Mirror

Benjamins's concept, Black Mirror, was tested in a similar way to mine by both Benjamin and Bethany.  It was tested on two males an done female with two participants self identifying with the statement that technology contributed to them having difficulty finding suitable work.

<EmbeddedMultiImage :data="[{ src: '/face-d_tect/testing-anti-hostile-architecture.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}]" />

From our research we found a couple of key findings

1. **Engaging and able to catalyse further exploration and discussion around the topic**
  - "Fearful. Because that's terrifying that a mirror can recognise my gender,
age and emotion. Like, that's insane." - Cindy
2. **Context of the interaction has a major weight in the effectiveness of the concept**
  - "Fearful. Because that's terrifying that a mirror can recognise my gender,
age and emotion. Like, that's insane." - Cindy
3. **Evocative and able to generate self reflection**
  - "Fearful. Because that's terrifying that a mirror can recognise my gender,
age and emotion. Like, that's insane." - Cindy

And, with the most promise of being an achievable concept for an installation that user's resonated with, we decided to iterate further on the idea, making it the basis for our final prototype.

## 4. Defining problem around Black Mirror

From this analysis we re-defined our problem to the Black mirror problem:

- **Generate empathy through reflection of the users own experience in a way that positions the user to think critically about the way mass surveillance is employed and the effect it has on minorities**

- **Bring to light the inherent bias in these algorithmic systems and the way it re-enforces existing exclusivity in urban environments**

- **Create an experience that is memorable and shocking enough to generate an impetus for change in the viewer as well as an avenue for the viewer to take action**

And fleshed out our concept to include an array of screens that included cryptic information on the user, predicted by an array of machine learning algorithms analysing the users face.

## 5. Multivariate desirability study 

In order to better understand the aesthetics required to communicate the issue we designed a Multivariate Desirability Study.

We explain the concept and its intended message before prompting our testers to speak on what kind of design, mood and look they think would communicate this message best by showing them a number of options on screen.  We further ask our user to elaborate on their choice by justifying why they like and dislike each choice.

This was conducted on four participants and we ran through decisions from frame finishings to the aesthetics of the contents of the screen.

<EmbeddedMultiImage :data="[{ src: '/face-d_tect/testing-ab-results.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'fullwidth'}]" />

#### Multivariate desirability study findings

1. **Play on themes of threatening secrecy**
    - "The same feeling that you weren’t meant to look at this... this has another purpose and don’t know what it is" - Anastasia
2. **Build a sense of mysterious power and helplessness**
    - "I’d want it to make you feel insignificant and tiny." - Jodie
3. **Personify the installation, give it intent and agenda**
    - "Makes it feel more alive if it has those hesitations like ooh I’m thinking about it." - Anastasia

From these results I made concept art of the final display both help us communicate our idea as well as aid us in visualising and understanding the mood of the final installation.
<EmbeddedMultiImage :data="[{ src: '/face-d_tect/concept-art-black-mirror-hifi.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'fullwidth'}]" />

## 6. Physical build

Nathan was primarily responsible for the physical construction of the wall + mounting screens.  He began with three sheets of plywood which he mounted hinges so the wall could be create a concave around the user before applying a rough coat of paint to reinforce the user-unfriendly aesthetic.

<EmbeddedMultiImage :data="[{ src: '/face-d_tect/building-phsyical-wall.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}, { src: '/face-d_tect/building-phsyical-wall-final.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}]" />

Once in our designated presentation area we used the mounting holes on the backs of the screens to fit each screen securely to the wall.


## 7. Technical Implementation
I designed the system to be split into 3 logical components:

1. A control centre that was responsible for managing the dataflow, logic and communication of the display.  It receives webcam input and passes it through openFrameworks addon [ofxFaceTracker](https://github.com/kylemcdonald/ofxFaceTracker) to find users faces and cuts out the regions of interest, saving the images via a named [FIFO pipe](https://github.com/antimodular/ofxFifo).

2. The python processes run an [OSC server](https://pypi.org/project/osc4py3/) and when alerted that a new face was present, read the face and ran it through their respective algorithms.  These algorithms used pre-trained models and neural network architectures such as Convolutional Neural Networks, MobileNetV2 an Inceptionv3 from libraries such as [Keras](https://keras.io/) and  [TensorFlow](https://www.tensorflow.org/) to predicted characteristics of users before passing the results back to the control centre.

3. A number of [Raspberry Pi](https://www.raspberrypi.org/)'s responsible for handling input data, formatted by the control centre, via an [OSC server](http://www.sojamo.de/libraries/oscP5/) and rendering it in a [Processing](https://processing.org/) sketch.

<EmbeddedImage src="/face-d_tect-technical-implementation.png" alt="Diagram of each process of this project, showing a control centre that recieves webcam input, passes a cutout of the user's face to each neural network, recieves the returned value and passes it to each display process." type="fullwidth" />

As for the physical implementation, we collected second hand screens from services like Facebook Marketplace and gumtree and used a plethora of adapters to fit our Raspberry Pis to the range of inputs these screens required.  Each computer communicated on a local network area network over static IPs stored in an environment file.

## 8. Screen design

Benjie was responsible for designing the interface of each screen of the display.  He designed and annotated user-interface flows in [Figma](https://www.figma.com/). 
<EmbeddedMultiImage :data="[
{ src: '/face-d_tect/concept-screen-ascii.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'},
{ src: '/face-d_tect/concept-screen-emotion.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'},
{ src: '/face-d_tect/concept-screen-face.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'},
{ src: '/face-d_tect/concept-screen-gender.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}, 
{ src: '/face-d_tect/concept-screen-list.jpg', alt: 'Exploring ideas for the narrative of the static visualisation', type: 'halfwidth'}]" 
/>

It was the job of Beth and I to develop these screens into [Processing](https://processing.org/) sketches.  Furtheremore, I was tasked with connecting the required machine learning models and implementing the communication between processes and between computers to make this display function.

<br>
<br>
<br>
<br>

# Showcase

#### Presentation video

<EmbeddedYoutube src="https://www.youtube.com/embed/MklBujekyRk" type="fullwidth" />

<video style="width: 100%" autoplay loop muted playsinline src="/face-d_tect/final-physical-implementation.mp4"></video>
