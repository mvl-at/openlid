import {Environment} from "./environment.model";

export const environment: Environment = {
  production: true, barrelUrl: "https://barrel.mvl.at/api/v1", footer: {
    links: [{
      name: "GitHub", link: "https://github.com/mvl-at/", icon: "book"
    }, {
      name: "Facebook", link: "https://www.facebook.com/mvleopoldsdorf/", icon: "person"
    }, {
      name: "Instagram", link: "https://www.instagram.com/mvleopoldsdorf/", icon: "photo_camera"
    },], phone: "+43 2216 3160", address: "Kempfendorf 2, A-2285 Leopoldsdorf i.M.", email: "obmann@mvl.at",
  }, executiveRoles: {
    archive: "Archivar",
    root: "Verzeichnisverwalter",
  },
  passwordResetLink: "https://selfservice.mvl.at/index.php?action=sendtoken",
  orchestra: {
    seats: [["Klarinette"], [], ["Flöte"], ["Tenorhorn", "Horn"], [], ["Flügelhorn"], ["Tuba", "Posaune"], [], ["Trompete"], [], ["Schlagwerk"], []]
  }
};
