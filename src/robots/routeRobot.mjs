import mailRoute from './mailRoute.json' assert { type: 'json' };

function routeRobot(state, roads, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

export default routeRobot;
