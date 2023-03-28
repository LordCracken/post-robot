import roads from './roads.json' assert { type: 'json' };

import VillageState from './scripts/village';
import buildGraph from './scripts/buildGraph';

const roadGraph = buildGraph(roads);
const village = new VillageState();
