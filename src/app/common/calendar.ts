/*
 * OpenLid, the frontend of the Musikverein Leopoldsdorf.
 * Copyright (C) 2023  Richard Stöckl
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 */

export type Calendar = CalendarEvent[]
export interface CalendarEvent {
  summary: CalendarEventValue,
  description?: CalendarEventValue,
  dtstart: CalendarEventValue,
  dtend?: CalendarEventValue,
  location: CalendarEventValue
}

export interface CalendarEventValue {
  value: string | null,
  params: object
}

export enum CalendarType {
  PUBLIC = "public",
  INTERNAL = "internal",
}

export function eventStart(event: CalendarEvent) {
  const stringStart = event.dtstart.value;
  if (!stringStart) {
    return null;
  }
  const start = new Date();
  start.setFullYear(parseInt(stringStart.substring(0, 4)), parseInt(stringStart.substring(4, 6))-1, parseInt(stringStart.substring(6, 8)));
  start.setHours(parseInt(stringStart.substring(9, 11)), parseInt(stringStart.substring(11, 13)));
  return start;
}
