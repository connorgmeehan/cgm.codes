---
{
  "title": "Sea of Tweets",
  "shortdescription": "Visualising the difference between Hillary Clinton and Donald Trumps realworld and twitter Presence in an animated themed datavisualisation.",
  "date": "2017-11-15",
  "image": "/sea-of-tweets-showcase.png",
  "video": "/sea-of-tweets-showcase.webm",
  "team": [
    { "name": "Jessica Da", "link": "https://github.com/JessicaDa" }
  ],
  "iframe": {
    "url": "https://sea-of-tweets.netlify.com",
    "fullwidth": true,
  },
  "git": "https://github.com/connorgmeehan/sea-of-tweets-js",
  "duration": "3 months",
  "description": "Sea of Tweets was an interactive data visualisation on the 2016 presidential election comparing the Democratic and Republican primary candidates real-world and twitter presence.  It made use of the Huffington Post pollster and Twitter APIs to get tweets and the sentiment towards each candidate.  This was the project that started my journey and interest in creative coding.",
  "tags": ["JavaScript", "APIs"],
}
---

import EmbeddedImage from '~/components/EmbeddedImage';

## Showcase

<EmbeddedImage src="/sea-of-tweets-showcase.png" alt="Image of final assessment showing cartoon renditions of Donald Trump and Hillary Clinton." type="fullwidth" />

###### The sea is a bar chart visualising sentiment towards each candidate, including the ~5% undecided at the time the results were recorded and each boat represents 100,000 followers.

<EmbeddedImage src="/sea-of-tweets-sea.png" alt="Image of final assessment showing cartoon renditions of Donald Trump and Hillary Clinton." type="fullwidth" />


###### The sky represents the twitter presence, accumulates the total number of likes on each tweet and compares it between the candidates.
<EmbeddedImage src="/sea-of-tweets-sky.png" alt="Image of final assessment showing cartoon renditions of Donald Trump and Hillary Clinton." type="fullwidth" />

###### Each candidate takes turns saying a tweet, these were queried each hour from the twitter API, however to preserve the functioning of this demo, this currently runs of a cached response from 2017.
<EmbeddedImage src="/sea-of-tweets-tweet.png" alt="Image of final assessment showing cartoon renditions of Donald Trump and Hillary Clinton." type="fullwidth" />

###### The ammount of likes in each tweet is counted in a balloon, one candidate will win and cheer, the other will burst into tears and their balloon will deflate.
<EmbeddedImage src="/sea-of-tweets-balloon.png" alt="Image of final assessment showing cartoon renditions of Donald Trump and Hillary Clinton." type="fullwidth" />
