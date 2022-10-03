/*
 * OpenLid, the frontend of the Musikverein Leopoldsdorf.
 * Copyright (C) 2021  Richard Stöckl
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

export interface Crew {
  musicians: Register[];
  sutlers: Member[];
  honoraryMembers: Member[];
}

export interface Member {
  username: string;
  firstName: string;
  lastName: string;
  name: string;
  active: boolean;
  joining: number;
  gender: string;
  titles: string[] | null;

  official: boolean | null;
  listed: boolean | null;

  sensitives: DetailedMember | null;
}

export interface DetailedMember {
  fullUsername: string,
  commonName: string,
  mail: string[];
  mobile: string[];
  whatsapp: boolean | null;
  birthday: Date;
  address: Address | null;
}

export interface Address {
  street: string,
  houseNumber: string,
  postalCode: string,
  city: string,
  state: string,
  countryCode: string,
}

export interface Register {
  name: string;
  namePlural: string;
  members: Member[] | null;
}
