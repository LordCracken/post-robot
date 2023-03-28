import roads from './roads.json' assert { type: 'json' };

import buildGraph from './scripts/buildGraph';

const roadGraph = buildGraph(roads);
const village = new VillageState();
