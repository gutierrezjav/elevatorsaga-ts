class Requester {
  currentT: number;
  currentCb: ((t: number) => void) | null;
  timeStep: number;

  constructor(timeStep: number) {
    this.currentT = 0.0;
    this.currentCb = null;
    this.timeStep = timeStep;
  }

  register(cb: (t: number) => void) {
    this.currentCb = cb;
  }

  trigger() {
    this.currentT += this.timeStep;
    if (this.currentCb !== null) {
      this.currentCb(this.currentT);
    }
  }
}

const limitNumber = function (num: number, min: number, max: number) {
  return Math.min(max, Math.max(num, min));
};

const epsilonEquals = function (a: number, b: number) {
  return Math.abs(a - b) < 0.00000001;
};

const deprecationWarning = function (name: string) {
  console.warn("You are using a deprecated feature scheduled for removal: " + name);
};

const createBoolPassthroughFunction = function (
  owner: any,
  obj: { [x: string]: any; trigger: (arg0: string, arg1: any) => void },
  objPropertyName: string
) {
  return function (val: any) {
    if (typeof val !== "undefined") {
      obj[objPropertyName] = val ? true : false;
      obj.trigger("change:" + objPropertyName, obj[objPropertyName]);
      return owner;
    } else {
      return obj[objPropertyName];
    }
  };
};

const distanceNeededToAchieveSpeed = function (
  currentSpeed: number,
  targetSpeed: number,
  acceleration: number
) {
  // v² = u² + 2a * d
  const requiredDistance =
    (Math.pow(targetSpeed, 2) - Math.pow(currentSpeed, 2)) / (2 * acceleration);
  return requiredDistance;
};
const accelerationNeededToAchieveChangeDistance = function (
  currentSpeed: number,
  targetSpeed: number,
  distance: number
) {
  // v² = u² + 2a * d
  const requiredAcceleration =
    0.5 * ((Math.pow(targetSpeed, 2) - Math.pow(currentSpeed, 2)) / distance);
  return requiredAcceleration;
};

// Fake frame requester helper used for testing and fitness simulations
const createFrameRequester = function (timeStep: number) {
  return new Requester(timeStep);
};

const getCodeObjFromCode = function (code: string) {
  if (code.trim().substr(0, 1) == "{" && code.trim().substr(-1, 1) == "}") {
    code = "(" + code + ")";
  }
  /* jslint evil:true */
  const obj = eval(code);
  /* jshint evil:false */
  if (typeof obj.init !== "function") {
    throw "Code must contain an init function";
  }
  if (typeof obj.update !== "function") {
    throw "Code must contain an update function";
  }
  return obj;
};
