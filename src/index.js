import roads from './roads.json' assert { type: 'json' };

import VillageState from './scripts/village.mjs';
import goalOrientedRobot from './scripts/goalOrientedRobot.mjs';
import buildGraph from './util/buildGraph.mjs';

const roadGraph = buildGraph(roads);
const village = VillageState.random(roadGraph);

window.runRobotAnimation(village, goalOrientedRobot, [], roadGraph);
