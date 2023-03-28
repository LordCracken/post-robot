function findRoute(graph, from, to) {
  const work = [{ at: from, route: [] }];

  for (let i = 0; i < work.length; i++) {
    const { at, route } = work[i];

    for (let place of graph[at]) {
      if (place === to) return [...route, place];
      if (!work.some(w => w.at === place)) {
        work.push({ at: place, route: [...route, place] });
      }
    }
  }
}

export default findRoute;
