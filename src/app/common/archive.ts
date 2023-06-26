/*
 * OpenLid, the frontend of the Musikverein Leopoldsdorf.
 * Copyright (C) 2021-2022  Richard Stöckl
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

export interface Pagination<E> {
  total_rows: number,
  offset: number,
  rows: PaginationRow<E>[],
}

export interface PaginationRow<E> {
  id: string,
  key: string,
  value: any,
  doc: E,
}

export interface SearchResult<E> {
  docs: E[],
  bookmark: string,
}

export interface DatabaseOperationResponse {
  ok: boolean,
  id: string,
  rev: string,
}

export interface Score {
  _id: string | null;
  _rev: string | null;
  title: string;
  subtitles: string[];
  alias: string[];
  genres: string[];
  composers: string[];
  arrangers: string[];
  publisher: string | null;
  location: string | null;
  pages: Page[];
  back_title: string | null;
  conductor_score: boolean;
  grade: string | null;
  annotation: string | null;
  legacy_ids: number[];
}

export interface Page {
  book: string;
  begin: PageNumber;
  end: PageNumber | null;
}

export interface PageNumber {
  prefix: string | null;
  number: number;
  suffix: string | null;
}

export interface ScoreFilter {
  searchTerm: string | null;
  regex: boolean;
  attributes: string[];
  book: string | null;
  location: string | null;
  sort: string | null;
  ascending: boolean | null;
}

export function isEmpty(filter: ScoreFilter): boolean {
  return !filter.searchTerm && !filter.book && !filter.location && !filter.sort;
}

export type CountStatistic = Statistic<string, number>

export enum CountStatisticSubject {
  Genres = 'genres',
  Composers = 'composers',
  Arrangers = 'arrangers',
  Publishers = 'publishers',
  Locations = 'locations',
}

export interface Statistic<E, A> {
  rows: StatisticRow<E, A>[];
}

export interface StatisticRow<E, A> {
  key: E;
  value: A;
}
