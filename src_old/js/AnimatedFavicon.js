
class AnimatedFavicon {
  constructor (path) {
    console.log('AnimatedFavicon running on /', path);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/${path}`, true);
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.startAnimation(JSON.parse(xhr.responseText));
        } else {
          console.error(xhr.statusText);
        }
      }
    }
    xhr.onerror = function () {
      console.error(xhr.statusText);
    };
    xhr.send(null);
  }

  startAnimation (response) {
    console.log('starting animation');
    this.data = response.data;
    this.index = 0;

    this.link = document.createElement('link');
    this.link.rel = 'shortcut icon';
    document.head.appendChild(this.link);


    this.interval = setInterval(() => {
      this.index = (this.index + 1) % this.data.length;
      this.link.href = `data:image/gif;base64,${this.data[this.index]}`;
    }, 100);
  }

  draw () {
    
  }

  kill () {
    clearInterval(this.interval);
  }
}

export default AnimatedFavicon;
