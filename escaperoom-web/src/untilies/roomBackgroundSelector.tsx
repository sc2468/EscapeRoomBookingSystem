export const roomBackgroundSelector = (roomId: number) => {
  switch (roomId) {
    case 1:
      return "url('/assets/killerbackground.jpg')";
    case 2:
      return "url('/assets/killerbackground.jpg')";
    case 3:
      return "url('/assets/killerbackground.jpg')";
    default:
      return "url('/assets/killerbackground.jpg')";
  }
}