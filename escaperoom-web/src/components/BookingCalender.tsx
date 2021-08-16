import React from 'react'
import { BookingsEntity } from '../generated/graphql';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface Props {
  bookingEntries: BookingsEntity[]
}

export default function BookingCalender({ bookingEntries }: Props) {
  const events = bookingEntries.map((booking) => {
    const startDate = new Date(booking.dateAndTime);
    const endDate = new Date(booking.dateAndTime);
    endDate.setHours(endDate.getHours() + 1);
    console.log(startDate, endDate,);
    const title = booking.team ? booking.team.name : "Available";

    return { id: booking.id, title, start: startDate, end: endDate }
  });
  const now = new Date()
  const minDate = now;
  minDate.setHours(0, 0, 0, 0)
  const localizer = momentLocalizer(moment)

  return (
    <Calendar
      style={{ height: 800 }}
      events={events}
      step={60}
      showMultiDayTimes
      defaultDate={now}
      localizer={localizer}
      views={['week', 'day', 'agenda']}
      defaultView={'day'}
      min={now}
      onSelectEvent={event => location.href = `bookRoom/${event.id}`}
    />
  );
}
