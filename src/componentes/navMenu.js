import Home from "../pages/Home";
import BuildBrowser from "../pages/BuildBrowser";
import BuildCreator from "../pages/BuildCreator";
import BuildDelete from "../pages/BuildDelete";


export const navlist = [
    { desc: 'Builds Summary', link: '', component: Home },
    { desc: 'Classes',
      submenu: [
          { desc: 'Assassin', link: 'BuildBrowser', component: BuildBrowser },
          { desc: 'Hunter', link: 'BuildBrowser', component: BuildBrowser },
          { desc: 'Ronin', link: 'BuildBrowser', component: BuildBrowser },
          { desc: 'Samurai', link: 'BuildBrowser', component: BuildBrowser },
      ],
  },
    { desc: 'Browse Builds', link: 'BuildBrowser', component: BuildBrowser},
    { desc: 'Create New Build', link: 'BuildCreator', component: BuildCreator},
    { desc: 'Delete Builds', link: 'BuildDelete', component: BuildDelete},
  ];