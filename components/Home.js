import React,{useEffect, useState, useRef} from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity,SafeAreaView, Dimensions, SafeAreaViewBase, FlatList, Animated, } from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  usePlaybackState, 
  State ,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getState } from 'react-native-track-player/lib/trackPlayer';
const songs = [
  {
    id: 1,
    artwork: require('../assets/track1(khnh).jpg'),
    title: 'Kal Ho Na Ho',
    artist: 'Shankar Ehsaan loy, Sonu Nigam',
    //url: "https://open.spotify.com/embed/track/251PNRmJU9KcUnFQAB5t6I?utm_source=generator",
    //url:'https://songwhip.com/shankarehsaanloy/kal-ho-naa-ho',
    url: require('C:/Users/ADITYA M/Music_player/musicalaid/music/KalHoNaaHo.mp3'),
    duration: 321,
  },
  {
    id: 2,
    title: 'Em Sandheham ledhu',
    artist: 'Kalyani Malik, Sunitha',
    artwork: require('../assets/track2(esl).jpg'),
    //url:"https://songwhip.com/kalyanimalik/em-sandeham-ledu",
    url: require('C:/Users/ADITYA M/Music_player/musicalaid/music/Emsandehamledu.mp3'),
    duration: 228,
  },
  {
    id: 3,
    title: 'On My Way',
    artist: 'Alan Walker, Faruko and Sabrina',
    artwork: require('../assets/track3(omw).jpg'),
    //url: "https://open.spotify.com/embed/track/4n7jnSxVLd8QioibtTDBDq?utm_source=generator",
    url: require('C:/Users/ADITYA M/Music_player/musicalaid/music/OnMyWay.mp3'),
    duration: 193,
  },
];

const {width,height}=Dimensions.get('window');
const setupPlayer = async ()=>{
  try{
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: false,
        alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
      });
      await TrackPlayer.add(songs);
   }catch(e){
     console.log(e)
   }
};
const tooglePlayback= async playBackState => {
  //console.log(TrackPlayer.getState()==State.Playing);
  if (await TrackPlayer.getState() === State.Playing) {
    console.log(playBackState===State.Playing, playBackState);
    TrackPlayer.pause();
  } else {
    console.log(TrackPlayer.getState()===State.Paused, playBackState);  
    TrackPlayer.play();
  }
};




export default function Home({setScreen}){
  const playBackState= usePlaybackState();
  //const isPlaying = playBackState === State.Playing;
  const progress=useProgress();
  const[songIndex, setSongIndex]=useState(0);
  const [repeatMode, setRepeatMode]=useState('off')
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();

  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  
  const playIcon= async => {
    if(playBackState.state == 'playing'){
      return 'ios-pause-circle';
    }
    else{
      return 'ios-play-circle';
    }
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event =>{
    if(event.type === Event.PlaybackTrackChanged && event.nextTrack !==null){
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artwork, artist} = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });
  

  const repeatIcon=()=>{
    if(repeatMode =='off'){
      return 'repeat-off';
    }
    if(repeatMode =='track'){
      return 'repeat-once';
    }
    if(repeatMode =='repeat'){
      return 'repeat';
    }
  };
  const changeRepeatMode =()=>{
    if(repeatMode =='off'){
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }
    if(repeatMode =='track'){
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }
    if(repeatMode =='repeat'){
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(()=>{
      setupPlayer();
      scrollX.addListener(({value}) =>{
        //console.log(`ScrollX : ${value} | Device Width : ${width} `);
        const index= Math.round(value / width);
        skipTo(index);
        setSongIndex(index);

        //console.log(index);
      });
      if (playBackState === 'playing' || playBackState === 3) {
        playBackState.current = 'playing';
      } else if (playBackState === 'paused' || playBackState === 2) {
        isPlaying.current = 'paused';
      } else {
        playBackState.current = 'loading';
      }
      // return () =>{
      //     scrollX.removeAllListeners();
      //     TrackPlayer.destroy();
      // };
  },[playBackState]);

  const skipToNext=()=>{
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };
  const skipToPrevious=()=>{
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
   
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const renderSongs =({item,index}) =>{
    return (
      <Animated.View style={styles.mainimgwrapper}>
        <View style={[styles.imagewrapper, styles.elevation]}>
              <Image
                source={item.artwork}
                //source={trackArtwork}
                style={styles.Img}
              />
        </View>
      </Animated.View>
    )
  }
  return(
  <SafeAreaView style={styles.container}>
      <View style={styles.imgcontainer}>
        {/* <View style={[styles.imagewrapper, styles.elevation]}>
          <Image
            // source={songs.image}
            source={require('../assets/track2(omw).jpg')}
            style={styles.Img}
          />
        </View> */}
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          data={songs}
          keyExtractor={item=>item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent : {
                  contentOffset : {x : scrollX}
                }
              }
            ],
            {useNativeDriver: true},
          )}
        />
      </View>
      {/* music player section */}
      <View style={styles.maincontainer}>
        {/* Image */}
        {/* Title & Artist Name */}
        <View>
          <Text style={[styles.songCon, styles.songTitle]}>
            {/* {songs[songIndex].title}  */}
            {trackTitle} 
          </Text>
          <Text style={[styles.songCon, styles.songArtist]}>
             {/* {songs[songIndex].artist}   */}
             {trackArtist}
          </Text>
        </View>

        {/* songslider */}
        <View>
          <Slider
            style={styles.progressbar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#46C2CB"
            minimumTrackTintColor="#46C2CB"
            maximumTrackTintColor="#A3C7D6"
            onSlidingComplete={async value=>{
              await TrackPlayer.seekTo(value);
            }} 
          />

          {/* Progress Durations */}
          <View style={styles.progresslevelduration}>
            <Text style={styles.progresslabeltext}>
              {/* {new Date(progress.position * 1000)
                .toLocaleTimeString()
                .substring(3)} */}
                {millisToMinutesAndSeconds(progress.position * 1000)}
            </Text>
            <Text style={styles.progresslabeltext}>
              {/* {new Date((progress.duration - progress.position) * 1000)
                .toLocaleTimeString()
                .substring(3)} */}
                {millisToMinutesAndSeconds((progress.duration - progress.position) * 1000,)}
            </Text>
          </View>
        </View>

        {/* music control */}
        <View style={styles.musicControlsContainer}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Icon name="play-skip-back-outline" size={35} color="#46C2CB" />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => togglePlayBack(playBackState)}> */}
          
          <TouchableOpacity onPress={() => tooglePlayback(playBackState)}>
            <Icon
             
              // name={
              //  playBackState.current=== 'playing' 
              //   ?'ios-play-circle'
              //   :'ios-pause-circle' 
              // }
              name={`${playIcon(playBackState)}`}
              size={75}
              color="#46C2CB"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={skipToNext}>
            <Icon
              name="play-skip-forward-outline"
              size={35}
              color="#46C2CB"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* bottom section */}
      <View style={styles.bottomSection}>
        <View style={styles.bottomIconContainer}>
          <TouchableOpacity onPress={() => {} }>
            <Icon name="heart-outline" size={30} color="#888888" />
          </TouchableOpacity>

         <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={30}
              color={repeatMode !== 'off' ? '#46C2CB' : '#888888'}
              //color="#888888"
            />
          </TouchableOpacity> 

          <TouchableOpacity onPress={() => setScreen("StartRecording")}>
            <Icon name="musical-note-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Icon name="ellipsis-horizontal" size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    maincontainer:{
      // width:width,
      // alignItems:'center',
      // paddingVertical:15,
      // borderTopColor:'#393E46',
      // borderWidth:1,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center',
      margin:5,
    },
    bottomSection: {
      borderTopColor: '#393E46',
      borderWidth: 1,
      width: width,
      alignItems: 'center',
      paddingVertical: 15,
    },
  
    bottomIconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    imgcontainer: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
    },
    imagewrapper:{
      width:300,
      height: 340,
    },
    mainimgwrapper:{
      width:width,
      justifyContent:'center',
      alignItems:'center',
    },
    Img: {
      width: "80%",
      height: "80%",  
      borderRadius: 15,
      alignContent: 'center',
      margin:50,
    },
    title: {
      fontSize: 30,
      color: "#fff"
    },
    elevation: {
      elevation: 5,
      shadowColor:'#fff',
      shadowOffset:{
        height:5,
        width:5,
      },
      shadowRadius:3.84,
      shadowOpacity:0.5,
    },
    songCon:{
      textAlign:'center',
      color:'#fff',
    },
    songTitle:{
      fontSize:18,
      fontWeight:'600',
      
    },
    songArtist:{
      fontSize:16,
      fontWeight:'300',
    },
    progressbar:{
      width:350,
      height:40,
      marginTop:25,
      flexDirection:'row',
    },
    progresslevelduration:{
        width:340,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    progresslabeltext:{
        color:'#fff',
    },
    musicControlsContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginTop: 5,
       width: '50%',
    },

});