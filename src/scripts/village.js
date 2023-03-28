class VillageState {
  constructor(place, parcels, roads) {
    this.place = place;
    this.parcels = parcels;
    this.roads = roads;
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
