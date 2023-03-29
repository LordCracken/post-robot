'use strict';
import places from './places.json' assert { type: 'json' };

let active = null;

const placeKeys = Object.keys(places);
const speed = 2;

class Animation {
  constructor(worldState, robot, robotState, roads) {
    this.worldState = worldState;
    this.robot = robot;
    this.robotState = robotState;
    this.roads = roads;
    this.turn = 0;

    let outer = window.__sandbox ? window.__sandbox.output.div : document.body,
      doc = outer.ownerDocument;
    this.node = outer.appendChild(doc.createElement('main'));
    this.map = this.node.appendChild(doc.createElement('img'));
    this.map.src = 'img/village2x.png';
    this.map.style.cssText = 'vertical-align: -8px';
    this.robotElt = this.node.appendChild(doc.createElement('div'));
    this.robotElt.style.cssText = `position: absolute; transition: left ${0.8 / speed}s, top ${
      0.8 / speed
    }s;`;
    let robotPic = this.robotElt.appendChild(doc.createElement('img'));
    robotPic.src = 'img/robot_moving2x.gif';
    this.parcels = [];

    this.text = this.node.appendChild(doc.createElement('span'));
    this.button = this.node.appendChild(doc.createElement('button'));
    this.button.textContent = 'Stop';

    this.button.addEventListener('click', () => this.clicked());
    this.schedule();

    this.updateView();
    this.updateParcels();

    this.robotElt.addEventListener('transitionend', () => this.updateParcels());
  }

  updateView() {
    let pos = places[this.worldState.place];
    this.robotElt.style.top = pos.y - 38 + 'px';
    this.robotElt.style.left = pos.x - 16 + 'px';

    this.text.textContent = ` Turn ${this.turn} `;
  }

  updateParcels() {
    while (this.parcels.length) this.parcels.pop().remove();
    let heights = {};
    for (let { place, address } of this.worldState.parcels) {
      let height = heights[place] || (heights[place] = 0);
      heights[place] += 14;
      let node = document.createElement('div');
      let offset = placeKeys.indexOf(address) * 16;
      node.style.cssText =
        'position: absolute; height: 16px; width: 16px; background-image: url(img/parcel2x.png); background-position: 0 -' +
        offset +
        'px';
      if (place === this.worldState.place) {
        node.style.left = '25px';
        node.style.bottom = 20 + height + 'px';
        this.robotElt.appendChild(node);
      } else {
        let pos = places[place];
        node.style.left = pos.x - 5 + 'px';
        node.style.top = pos.y - 10 - height + 'px';
        this.node.appendChild(node);
      }
      this.parcels.push(node);
    }
  }

  tick() {
    let { direction, memory } = this.robot(this.worldState, this.roads, this.robotState);
    this.worldState = this.worldState.move(direction);
    this.robotState = memory;
    this.turn++;
    this.updateView();
    if (this.worldState.parcels.length === 0) {
      this.button.remove();
      this.text.textContent = ` Finished after ${this.turn} turns`;
      this.robotElt.firstChild.src = 'img/robot_idle2x.png';
    } else {
      this.schedule();
    }
  }

  schedule() {
    this.timeout = setTimeout(() => this.tick(), 1000 / speed);
  }

  clicked() {
    if (this.timeout == null) {
      this.schedule();
      this.button.textContent = 'Stop';
      this.robotElt.firstChild.src = 'img/robot_moving2x.gif';
    } else {
      clearTimeout(this.timeout);
      this.timeout = null;
      this.button.textContent = 'Start';
      this.robotElt.firstChild.src = 'img/robot_idle2x.png';
    }
  }
}

window.runRobotAnimation = function (worldState, robot, robotState, roads) {
  if (active && active.timeout != null) clearTimeout(active.timeout);
  active = new Animation(worldState, robot, robotState, roads);
};
