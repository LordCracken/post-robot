import findRoute from '../util/findRoute.mjs';

function goalOrientedRobot({ place, parcels }, route, roads) {
  if (route.length === 0) {
    let parcel = parcels[0];

    if (parcel.place !== place) {
      route = findRoute(roads, place, parcel.place);
    } else {
      route = findRoute(roads, place, parcel.address);
    }
  }

  return { direction: route[0], memory: route.slice(1) };
}

export default goalOrientedRobot;
