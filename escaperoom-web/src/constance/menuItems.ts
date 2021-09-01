
export interface menuItem {
  displayName: string,
  route: string
}

export const customerLinks: menuItem[] = [
  {
    displayName: "Home",
    route: '/'
  },
  {
    displayName: "Rooms",
    route: '/rooms'
  },
  {
    displayName: "Bookings",
    route: '/bookRoom'
  },
]

export const adminLinks: menuItem[] = [
  {
    displayName: "Upcoming Bookings",
    route: '/admin'
  },
  {
    displayName: "Book Multiple Rooms",
    route: '/admin/createRooms'
  },
]