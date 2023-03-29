import roads from '../roads.json' assert { type: 'json' };
import VillageState from './village.mjs';
import buildGraph from '../util/buildGraph.mjs';

const roadGraph = buildGraph(roads);

function countSteps(state, robot, memory) {
  let steps = 0;

  while (state.parcels.length) {
    const action = robot(state, roadGraph, memory);

    state = state.move(action.direction);
    memory = action.memory;
    steps++;
  }

  return steps;
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let counter1 = 0,
    counter2 = 0;

  for (let i = 0; i < 100; i++) {
    const village = VillageState.random(roadGraph);
    counter1 += countSteps(village, robot1, memory1);
    counter2 += countSteps(village, robot2, memory2);
  }

  const average1 = Math.round(counter1 / 100);
  const average2 = Math.round(counter2 / 100);

  console.log(`${robot1.name}: ${average1}, ${robot2.name}: ${average2}`);
}

export default compareRobots;
