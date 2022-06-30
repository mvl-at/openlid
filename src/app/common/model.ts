/*
 * Lid, the frontend of the Musikverein Leopoldsdorf.
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
}

export interface DetailedMember extends Member {
  birthday: Date;
  mailAddresses: string[];
  mobiles: string[];
  countryCode: string | null;
  province: string | null;
  postalCode: string | null;
  locality: string | null;
  houseIdentifier: string | null;
  whatsapp: boolean | null;
  groups: string[];
}

export interface Author {
  id: number;
  name: string;
  composerOf: Score[] | null;
  arrangerOf: Score[] | null;
}

export interface Book {
  id: number;
  name: string;
  annotation: string | null;
  pages: Page[] | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Grade {
  id: number;
  name: string;
}

export interface Page {
  id: PageId;
  score: Score;
  book: Book;
  begin: PageNumber;
  end: PageNumber;
}

export interface PageId {
  scoreId: number;
  bookId: number;
}

export interface PageNumber {
  prefix: string | null;
  number: number;
  suffix: string | null;
}

export interface Register {
  name: string;
  namePlural: string;
  members: Member[] | null;
}

export interface Score {
  id: number;
  title: string;
  genres: Genre[];
  composers: Author[];
  arrangers: Author[];
  publisher: string;
  grade: Grade | null;
  subTitles: string | null;
  conductorScore: boolean;
  backOf: Score | null;
}

export interface ScoreLocation {
  id: number;
  name: string;
}

export interface ScoreRetention {
  id: ScoreRetentionId;
}

export interface ScoreRetentionId {
  scoreId: number;
  scoreLocationId: number;
}
