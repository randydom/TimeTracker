import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as trayActions from '../actions/trayActions'

import { TrayAppPage } from '../components/tray/TrayAppPage.jsx';

function mapStateToProps(store) {
  return {
    stories: store.storyList.stories,
    timer: store.timer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(trayActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrayAppPage)
