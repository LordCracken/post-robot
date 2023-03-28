import randomPick from '../util/randomPick.mjs';

class VillageState {
  constructor(place, parcels, roads) {
    this.place = place;
    this.parcels = parcels;
    this.roads = roads;
  }

  static random(roads, parcelCount = 5) {
    const parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      const address = randomPick(Object.keys(roads));
      let place;

      do {
        place = randomPick(Object.keys(roads));
      } while (place === address);

      parcels.push({ place, address });
    }

    return new VillageState('Post Office', parcels, roads);
  }

  move(destination) {
    if (!this.roads[this.place].includes(destination)) return this;

    const updatedParcels = this.parcels.map(p => {
      if (p.place !== this.place) return p;
      return { place: destination, address: p.address };
    });
    const undeliveredParcels = updatedParcels.filter(p => p.place !== p.address);

    return new VillageState(destination, undeliveredParcels);
  }
}

export default VillageState;
