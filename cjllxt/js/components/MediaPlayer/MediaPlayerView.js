import React, {PropTypes} from 'react';

import ReactNative, {
  StyleSheet,
  View,
  NativeModules,
  requireNativeComponent,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
var SystemInfo=NativeModules.SystemInfoAndroid;
import Controls from './Controls';
const UIManager = NativeModules.UIManager;
const RCT_MEDIA_PLAYER_VIEW_REF = "RCTMediaPlayerView";
const RCTMediaPlayerView = requireNativeComponent('RCTMediaPlayerView', {
  name: 'RCTMediaPlayerView',
  propTypes: {
    ...View.propTypes,
    src: PropTypes.string,
    autoplay: PropTypes.bool,
    preload: PropTypes.string,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    onPlayerPaused: PropTypes.func,
    onPlayerPlaying: PropTypes.func,
    onPlayerFinished: PropTypes.func,
    onPlayerBuffering: PropTypes.func,
    onPlayerBufferOK: PropTypes.func,
    onPlayerProgress: PropTypes.func,
    onPlayerBufferChange: PropTypes.func
  }
});

export default class MediaPlayerView extends React.Component {

  static propTypes = {
    ...RCTMediaPlayerView.propTypes,
    controls: PropTypes.bool,
    poster: PropTypes.string
  }

  static defaultProps = {
    autoplay: false,
    controls: true,
    preload: 'none',
    loop: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      showControl:false,
      showPlayOrPauseBtn:true,
      buffering: false,
      playing: false,
      muted:false,
      current: 0,
      total: 0,
      width: 0,
      height: 0,
      showPoster: true,
      modalVisible:false
    };
  }

  componentWillUnmount() {
    console.log('componentWillUnmount...');
    this.stop();
  }

  render() {
    let posterView;
    if(this.props.poster && this.state.width && this.state.height && this.state.showPoster) {
      posterView = (
        <Image
          style={{
          position: 'absolute',
          left: 0, right: 0, top: 0, bottom: 0,
          backgroundColor: 'transparent',
          width: this.state.width,
          height: this.state.height,
          resizeMode: 'contain'
          }}
          source={{uri: this.props.poster}}/>
      );
    }

    let controlsView;
    if (this.props.controls) {
      controlsView = (
        <Controls
          ref="mediaPlayControls"
          buffering={this.state.buffering}
          showControl={this.state.showControl}
          playing={this.state.playing}
          current={this.state.current}
          total={this.state.total}
          muted={this.state.muted}
          onSeekTo={this.seekTo.bind(this)}
          onFullScreen={this.setFullScreen.bind(this)}
          onPauseOrPlay={() => {
            if(this.state.playing) {
              this.pause();
            } else {
              this.play();
            }
          }}
          onMuted={()=>{
              this.setState({muted:!this.state.muted})
          }}
          bufferRanges={this.state.bufferRanges}
        />
      );
    }

    return (
      <View
        style={this.props.style}
        onLayout={this._onLayout.bind(this)}>
        <Modal
            ref={(modal)=>this.modal=modal}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={this.setNotFullScreen.bind(this)}
        >
          <View style={{backgroundColor:'#000',flex:1}}></View>
        </Modal>
        <RCTMediaPlayerView
          {...this.props}
          muted={this.state.muted}
          style={{flex: 1, alignSelf: 'stretch'}}
          ref={RCT_MEDIA_PLAYER_VIEW_REF}
          onPlayerPlaying={this._onPlayerPlaying.bind(this)}
          onPlayerProgress={this._onPlayerProgress.bind(this)}
          onPlayerPaused={this._onPlayerPaused.bind(this)}
          onPlayerBuffering={this._onPlayerBuffering.bind(this)}
          onPlayerBufferOK={this._onPlayerBufferOK.bind(this)}
          onPlayerFinished={this._onPlayerFinished.bind(this)}
          onPlayerBufferChange={this._onPlayerBufferChange.bind(this)}
        />
        <TouchableOpacity
            style={{
              position:"absolute",
              top:0,
              left:0,
              width:this.props.style.width,
              height:this.props.style.height
            }}
            activeOpacity={1}
            onPress={()=>{
              if(!this.state.buffering&&this.state.current>0) {
                if (this.state.showPlayOrPauseBtn) {
                  this.setState({
                    showPlayOrPauseBtn: false,
                    showControl: false
                  })
                } else {
                  this.setState({
                    showPlayOrPauseBtn: true,
                    showControl: true
                  })
                }
              }
            }}
        >
          <View style={{flex:1,opacity:0}}></View>
        </TouchableOpacity>
        {posterView}
        {controlsView}
        {this.state.showPlayOrPauseBtn?<TouchableOpacity
            style={{
              position:'absolute',
              top:(this.props.style.height-48)/2,
              left:(this.props.style.width-48)/2
            }}
            activeOpacity={1}
            onPress={()=> {
              if (this.state.playing) {
                this.pause();
              } else {
                this.play();
              }
            }}
        >
           <View style={{
              backgroundColor:'#333',
              opacity:0.8,
              width:48,
              height:48,
              padding:14,
              borderRadius:24
               }}>
             <Image
                 style={{width: 20, height: 20, resizeMode: 'contain'}}
                 source={this.state.playing ? {uri:'media_player_pause'} : {uri:'media_player_play'}}/>
            </View>
          </TouchableOpacity>:null}
      </View>
    );
  }

  _onLayout(e) {
    const {width, height} = e.nativeEvent.layout;
    this.setState({width, height});

    this.props.onLayout && this.props.onLayout(e);
  }

  pause() {
    UIManager.dispatchViewManagerCommand(
      this._getMediaPlayerViewHandle(),
      UIManager.RCTMediaPlayerView.Commands.pause,
      null
    );
  }

  play() {
    UIManager.dispatchViewManagerCommand(
      this._getMediaPlayerViewHandle(),
      UIManager.RCTMediaPlayerView.Commands.play,
      null
    );
  }

  stop() {
    UIManager.dispatchViewManagerCommand(
      this._getMediaPlayerViewHandle(),
      UIManager.RCTMediaPlayerView.Commands.stop,
      null
    );
  }

  seekTo(timeMs) {
    if(this.state.current>0)
      this.setState({showPoster: false})
    else
      this.setState({showPoster: true})
    let args = [timeMs];
    UIManager.dispatchViewManagerCommand(
      this._getMediaPlayerViewHandle(),
      UIManager.RCTMediaPlayerView.Commands.seekTo,
      args
    );
  }
  setFullScreen(){
     this.setState({modalVisible:true});
     SystemInfo.setFullScreen(true)
     SystemInfo.setLandscape(true)
  }
  setNotFullScreen(){
    this.setState({modalVisible:false});
    SystemInfo.setFullScreen(false)
    SystemInfo.setLandscape(false)
  }

  _getMediaPlayerViewHandle() {
    return ReactNative.findNodeHandle(this.refs[RCT_MEDIA_PLAYER_VIEW_REF]);
  }

  _onPlayerBuffering() {
    if(this.state.current>0)
      this.setState({showPoster: false})
    this.props.onPlayerBuffering && this.props.onPlayerBuffering();
    if (this.props.controls) {
      this.setState({
        buffering: true,
        showControl:false,
        showPlayOrPauseBtn:false
      });
    }
  }

  _onPlayerBufferChange(e) {
    this.props.onPlayerBuffering && this.props.onPlayerBuffering(e);

    if (this.props.controls) {
      this.setState({
        bufferRanges: e.nativeEvent.ranges
      });
    }
  }

  _onPlayerBufferOK() {
    this.setState({showPoster: false})
    this.props.onPlayerBufferOK && this.props.onPlayerBufferOK();
    if (this.props.controls) {
      this.setState({
        buffering: false,
        showControl:true,
        showPlayOrPauseBtn:true
      });
    }
  }


  _onPlayerPlaying() {
    this.props.onPlayerPlaying && this.props.onPlayerPlaying();
    if (this.props.controls) {
      this.setState({
        buffering: false,
        playing: true,
        showControl:false,
        showPlayOrPauseBtn:false
      });
    }
  }

  _onPlayerPaused() {
    this.props.onPlayerPaused && this.props.onPlayerPaused();

    if (this.props.controls) {
      this.setState({
        playing: false,
        showControl:true,
        showPlayOrPauseBtn:true
      });
    }
  }

  _onPlayerFinished() {
    this.props.onPlayerFinished && this.props.onPlayerFinished();

    if (this.props.controls) {
      this.setState({
        current:0,
        playing: false,
        buffering: false,
        showControl:false,
        showPlayOrPauseBtn:true
      });
    }
  }

  _onPlayerProgress(event) {
    let current = event.nativeEvent.current; //in ms
    let total = event.nativeEvent.total; //in ms

    this.props.onPlayerProgress && this.props.onPlayerProgress(current, total);

    if (this.props.controls) {
      this.setState({
        current: current,
        total: total
      });
    }
  }
}