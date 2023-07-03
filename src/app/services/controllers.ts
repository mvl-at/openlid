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

export const controllers = {
  members: {
    root: '/members', photo: (username: string) => `${controllers.members.root}/${username}/photo`
  }, archive: {
    scores: {
      root: '/scores',
      searches: () => `${controllers.archive.scores.root}/searches`
    },
    statistics: {
      root: '/statistics', counts: () => `${controllers.archive.statistics.root}/counts`
    }
  }, documents: {
    root: '/documents', blackboard: {
      root: () => `${controllers.documents.root}/blackboard`,
      document: (document: string) => `${controllers.documents.blackboard.root()}/${document}`,
      image: (filename: string) => `${controllers.documents.blackboard.root()}/assets/${filename}`
    }
  },
  calendar: {
    root: '/calendar'
  },
  self: {
    root: '/users',
    auth: () => `${controllers.self.root}/auth`,
    refresh: () => `${controllers.self.root}/renewal`,
    info: () => `${controllers.self.root}/self`,
    executiveRoles: () => `${controllers.self.root}/executives`
  }
}
