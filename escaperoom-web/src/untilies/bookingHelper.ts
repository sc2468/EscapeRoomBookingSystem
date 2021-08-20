import { bookingStatus } from "../constance";
import { BookingsEntity } from "../generated/graphql";

export const getBookingStatus = (booking: bookingStatusObject | BookingsEntity) => {
  switch (booking.status) {
    case bookingStatus.open:
      return "Open";
    case bookingStatus.closed:
      return "Closed"
    case bookingStatus.booked:
      return "Booked"
    case bookingStatus.completed:
      return "Complete"
    default:
      return "Unavailable"
  }
}

export const getStatusBooking = (roomMap: bookingStatusObject[], time: string): bookingStatusObject | undefined => {
  const filterStatus = roomMap.filter(room => room.time === time);
  if (filterStatus.length === 1) {
    return filterStatus[0];
  }
  return undefined;
}

export const getStatusRoomMap = (dateHashMap: BookingStatusDateMap, roomId: number, date: Date): bookingStatusObject[] => {
  const dateObject = dateHashMap[date.toLocaleDateString()];
  if (dateObject && dateObject[roomId]) {
    return dateObject[roomId.toString()];
  }
  return [];
}

export interface bookingStatusObject {
  id: string,
  time: string,
  status: number
}

export interface roomBookingStatusMap {
  [key: string]: bookingStatusObject[]
}

export interface BookingStatusDateMap {
  [key: string]: roomBookingStatusMap[]
}

export const createStatusDateHashMap = (bookingEntries: BookingsEntity[]): BookingStatusDateMap => bookingEntries.reduce((current, booking) => {
  const bookingDate = booking.date
  if (current[bookingDate]) {
    if (current[bookingDate][booking.roomId]) {
      current[bookingDate][booking.roomId].push({ id: booking.id, time: booking.time, status: booking.status });
    } else {
      current[bookingDate][booking.roomId] = [{ id: booking.id, time: booking.time, status: booking.status }]
    }
  } else {
    current[bookingDate] = { [booking.roomId]: [{ id: booking.id, time: booking.time, status: booking.status }] }
  }
  console.log(current);
  return current;
}, {});


export interface roomBookingMap {
  [key: string]: BookingsEntity[]
}

export interface BookingDateMap {
  [key: string]: roomBookingMap[]
}

export const getRoomMap = (dateHashMap: BookingDateMap, roomId: number, date: Date): BookingsEntity[] => {
  const dateObject = dateHashMap[date.toLocaleDateString()];
  if (dateObject && dateObject[roomId]) {
    return dateObject[roomId.toString()];
  }
  return [];
}

export const createBookingDateHashMap = (bookingEntries: BookingsEntity[]): BookingDateMap => bookingEntries.reduce((current, booking) => {
  const bookingDate = booking.date
  if (current[bookingDate]) {
    if (current[bookingDate][booking.roomId]) {
      current[bookingDate][booking.roomId].push(booking);
    } else {
      current[bookingDate][booking.roomId] = [booking]
    }
  } else {
    current[bookingDate] = { [booking.roomId]: [booking] }
  }
  return current;
}, {});


export const getBooking = (roomMap: BookingsEntity[], time: string): BookingsEntity | undefined => {
  const filterStatus = roomMap.filter(room => room.time === time);
  if (filterStatus.length === 1) {
    return filterStatus[0];
  }
  return undefined;
}