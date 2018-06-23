import MainContainer from '../containers/MainContainer/MainContainer';
import MusicCheckListContainer from '../containers/MusicCheckContainer/MusicCheckListContainer';
import PanelContainer from '../containers/PanelContainer/PanelContainer';
import UpdatePanelPage from '../containers/PanelContainer/UpdatePanelPage';
import MusicCheckPage from '../containers/MusicCheckContainer/MusicCheckPage';
import SecondCheckPanelPage from '../containers/MusicCheckContainer/SecondCheckPanelPage';
import MusicContainer from '../containers/MusicContainer/MusicContainer';
import SceneContainer from '../containers/MusicContainer/SceneContainer';
import HotMusicContainer from '../containers/MusicContainer/HotMusicContainer';
import NewMusicContainer from '../containers/MusicContainer/NewMusicContainer';
import SupermarketMusicContainer from '../containers/MusicContainer/SupermarketMusicContainer';
import MakerContainer from '../containers/MusicContainer/MakerContainer';
import MakeMusicContainer from '../containers/MusicContainer/MakeMusicContainer';
import MusicListPage from '../containers/MusicContainer/MusicListPage';
import UploadMusicPage from '../containers/MusicContainer/UploadMusicPage';
import AddSuperMusicPage from '../containers/MusicContainer/AddSuperMusicPage';
import RoomMaintenanceList from '../containers/RoomMaintenance/RoomMaintenanceList';
import SceneMaintenanceList from '../containers/RoomMaintenance/SceneMaintenanceList';
import SongsMaintenanceList from '../containers/RoomMaintenance/SongsMaintenanceList';
import AddMaintainPerson from '../containers/RoleContainer/AddRole';
import maintainPersonList from '../containers/RoleContainer/RoleList';
import ClientLoginAccountPage from '../containers/StatisticalContainer/ClientLoginAccountPage';
import MusicStatisticalPage from '../containers/StatisticalContainer/MusicStatisticalPage';
import PersonInfo from '../containers/MeContainer/PersonInfo';
import ModifyPassword from '../containers/MeContainer/ModifyPassword';
import EditInformation from '../containers/MeContainer/EditInformation';
export default {
  path: '/',
  component:MainContainer,
  indexRoute: { component: MusicContainer },
  childRoutes: [
    { path: 'MusicCheckListContainer', component: MusicCheckListContainer },
    { path: 'PanelMaintainContainer', component: PanelContainer },
    { path: 'UpdatePanelPage', component: UpdatePanelPage },
    { path: 'MusicCheckPage', component:MusicCheckPage},
    { path: 'SecondCheckPanelPage', component:SecondCheckPanelPage},
    { path: 'MusicContainer', component: MusicContainer },
    { path:'RoomMaintenanceList',component:RoomMaintenanceList},
    { path:'SceneMaintenanceList',component:SceneMaintenanceList},
    { path:'SongsMaintenanceList',component:SongsMaintenanceList},
    { path: 'AddMaintainPerson', component: AddMaintainPerson },
    { path: 'maintainPersonList', component: maintainPersonList },
    { path: 'SceneContainer', component: SceneContainer },
    { path: 'HotMusicContainer', component: HotMusicContainer },
    { path: 'NewMusicContainer', component: NewMusicContainer },
    { path: 'SupermarketMusicContainer', component: SupermarketMusicContainer },
    { path: 'MakerContainer', component: MakerContainer },
    { path: 'MakeMusicContainer', component: MakeMusicContainer },
    { path: 'MusicListPage', component: MusicListPage },
    { path: 'UploadMusicPage', component: UploadMusicPage },
    { path: 'AddSuperMusicPage', component: AddSuperMusicPage },
    { path: 'clientLoginAccount', component: ClientLoginAccountPage },
    { path: 'musicStatistical', component: MusicStatisticalPage },
    { path: 'PersonInfo', component: PersonInfo },
    { path: 'ModifyPassword', component: ModifyPassword },
    { path: 'EditInformation', component: EditInformation }
  ]
}

/*
export default { 
  path: '/',
    getComponent: (location, cb) => {
    require.ensure([], (require) => {
      cb(null, require('../containers/MainContainer/MainContainer').default)
    })
  },
  indexRoute: {
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../containers/CommunistContainer/CommunistSelect').default)
        })
      }
  },
  childRoutes: [
    { path: '/3',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../containers/CommunistContainer/CommunistSelect').default)
        })
      }
    },
    { path: '/2',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../containers/CommunistContainer/CommunistContainer').default)
        })
      }
    },
    { path: '/1',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../containers/CommunistContainer/CommunistStatistics').default)
        })
      }
    }
  ]
}
*/