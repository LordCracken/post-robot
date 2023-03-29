import roads from './roads.json' assert { type: 'json' };

import VillageState from './scripts/village.mjs';
import buildGraph from './util/buildGraph.mjs';

import goalOrientedRobot from './robots/goalOrientedRobot.mjs';
import randomRobot from './robots/randomRobot.mjs';
import routeRobot from './robots/routeRobot.mjs';

import compareRobots from './scripts/compareRobots.mjs';

const roadGraph = buildGraph(roads);
const village = VillageState.random(roadGraph);

window.runRobotAnimation(village, goalOrientedRobot, [], roadGraph);
compareRobots(randomRobot, [], goalOrientedRobot, []);
compareRobots(routeRobot, [], goalOrientedRobot, []);
