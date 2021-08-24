export interface escapeRoom {
  name: string,
  value: number,
  description: string,
}

export const escapeRooms: escapeRoom[] = [
  { name: 'The Serial Killer Dungeon', value: 0, description: 'A serial killer has taken you hostage can you escape before its too late.' },
  { name: 'The Sinking Ship', value: 1, description: 'A fishing trip goes horrible wrong when a rogue wave flips your boat. Can you get to the life boat before you mate a watery grave.' },
  { name: 'The Lost Space Ship', value: 2, description: 'When a meteor crashes into your spaceship you only have mins to make it to the escape pot before all the oxygen in the ship is gone' },
]

export interface roomTime {
  value: string,
  fullDisplayName: string,
  startTime: string,
}

export const roomTimes = [
  { value: '10:00:00', fullDisplayName: '10:00 AM - 11:00 AM', startTime: '10:00 AM' },
  { value: '11:30:00', fullDisplayName: '11:30 AM - 12:30 PM', startTime: '11:30 AM' },
  { value: '13:00:00', fullDisplayName: '1:00 PM - 2:00 PM', startTime: '1:00 PM' },
  { value: '14:30:00', fullDisplayName: '2:30 PM - 3:30 PM', startTime: '2:30 PM' },
  { value: '16:00:00', fullDisplayName: '4:00 PM - 5:00 PM', startTime: '4:00 PM' },
  { value: '17:30:00', fullDisplayName: '5:30 PM - 6:30 PM', startTime: '5:30 PM' },
]

export const bookingStatus = {
  open: 1,
  booked: 2,
  closed: 3,
  completed: 4,
}