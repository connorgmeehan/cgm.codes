
class Vec3 {
  data = new Array(3);
  constructor (xyz) {
    this.data[0] = xyz[0];
    this.data[1] = xyz[1];
    this.data[2] = xyz[2];
  }
  add = (other) =>  new Vec3(this.data.map((d, i) => d + other.data[i]));
  subtract = (other) =>  new Vec3(this.data.map((d, i) => d - other.data[i]));
  multiply = (other) =>  new Vec3(this.data.map((d, i) => d * other.data[i]));
  divide = (other) =>  new Vec3(this.data.map((d, i) => d / other.data[i]));
  addAll = (num) => new Vec3(this.data.map(d => d + num));
  subtractAll = (num) => new Vec3(this.data.map(d => d - num));
  multiplyAll = (num) => new Vec3(this.data.map(d => d * num));
  divideAll = (num) => new Vec3(this.data.map(d => d / num));
  cross = (other) => new Vec3(
    this.data[1]*other.data[2] - this.data[2]*other.data[1],
    this.data[2]*other.data[0] - this.data[0]*other.data[2],
    this.data[0]*other.data[1] - this.data[1]*other.data[0]
  );
  magnitude = () => Math.cbrt(this.x*this.x + this.y*this.y-this.z*this.z);
  normalize = () => this.divideAll(this.magnitude());
  rotate = (pitch, roll, yaw) => {
    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);

    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);

    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);

    var Axx = cosa*cosb;
    var Axy = cosa*sinb*sinc - sina*cosc;
    var Axz = cosa*sinb*cosc + sina*sinc;

    var Ayx = sina*cosb;
    var Ayy = sina*sinb*sinc + cosa*cosc;
    var Ayz = sina*sinb*cosc - cosa*sinc;

    var Azx = -sinb;
    var Azy = cosb*sinc;
    var Azz = cosb*cosc;

    return new Vec3([
      Axx*this.x + Axy*this.y + Axz*this.z,
      Ayx*this.x + Ayy*this.y + Ayz*this.z,
      Azx*this.x + Azy*this.y + Azz*this.z,
    ]);
}

  get x() {
    return this.data[0];
  }

  get y() {
    return this.data[1];
  }

  get z() {
    return this.data[2];
  }
}

export default Vec3;