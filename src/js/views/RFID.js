import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import Icon from '../components/Icon';
import * as coreActions from '../services/core/actions';
import * as uiActions from '../services/ui/actions';
import * as pusherActions from '../services/pusher/actions';
import * as mopidyActions from '../services/mopidy/actions';
import * as lastfmActions from '../services/lastfm/actions';
import * as spotifyActions from '../services/spotify/actions';
import { i18n, I18n, languagesAvailable } from '../locale';
import TagControls from '../components/TagControl';

class RFID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagID: '',
      currentTagID: null,      
    };
  }

  componentDidMount() {
    const { uiActions: { setWindowTitle } } = this.props;
    setWindowTitle(i18n('rfid.title'));
  }

  componentDidUpdate = () => {    
  }

  onLanguageChange = (language) => {
    const { uiActions: { setLanguage } } = this.props;
    setLanguage(language);
  }

  render = () => {  
    return (      
      <div className="view settings-view">
        <Header>
          <I18n path="rfid.title">
            <Icon name="nfc" type="material" />
          </I18n>
        </Header>

        <section className="content-wrapper">
          <h4 className="underline">
            <I18n path="rfid.title" />
            <a name="tag" />
          </h4>          

          <TagControls />  

        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  coreActions: bindActionCreators(coreActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
  pusherActions: bindActionCreators(pusherActions, dispatch),
  mopidyActions: bindActionCreators(mopidyActions, dispatch),
  lastfmActions: bindActionCreators(lastfmActions, dispatch),
  spotifyActions: bindActionCreators(spotifyActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RFID);
