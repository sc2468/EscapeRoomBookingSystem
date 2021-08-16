export const roomBackgroundSelector = (roomId: number) => {
  switch (roomId) {
    case 0:
      return "http://localhost:3000/assets/killerbackground.jpg";
    case 1:
      return "http://localhost:3000/assets/sinkingShip.jpg";
    case 2:
      return "http://localhost:3000/assets/spacecrash.jpg";
    default:
      return "http://localhost:3000/assets/killerbackground.jpg";
  }
}