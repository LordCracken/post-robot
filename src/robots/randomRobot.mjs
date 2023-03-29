import randomPick from '../util/randomPick.mjs';

function randomRobot(state, roads) {
  return { direction: randomPick(roads[state.place]) };
}

export default randomRobot;
