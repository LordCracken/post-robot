function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length) {
      console.log(`Выполнено за ${turn} ходов`);
      break;
    }

    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Переход в направлени ${action.direction}`);
  }
}

export default runRobot;
