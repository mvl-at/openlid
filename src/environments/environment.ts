// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false, barrelUrl: 'http://localhost:1926/api/v1', footer: {
    links: [{
      name: 'GitHub', link: 'https://github.com/example/', icon: 'book'
    }, {
      name: 'Facebook', link: 'https://www.facebook.com/example/', icon: 'person'
    }, {
      name: 'Instagram', link: 'https://www.instagram.com/example/', icon: 'photo_camera'
    },], phone: '+43 2216 1234', address: 'Karlsplatz 1, A-1010 Wien', email: 'admin@example.org',
  },
  executiveRoles: {
    archive: 'Archivar',
    root: 'Verzeichnisverwalter',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
