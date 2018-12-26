/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';

export default class App extends Component<Props> {

      static navigationOptions = {
        title: 'Image Gallery',
      };

      constructor(props) {
          super(props)
          this.state = {
            filesList : [],
            mediaSelected: [],
            base64URI: null,
            galleryList: [
                {
                   photo:'http://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg',
                    caption: 'Grotto of the Madonna',
                    },
                    {
                      photo: 'http://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg',
                      caption: 'Broadchurch Scene',
                    },
                    {
                      photo:
                        'http://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg',
                        caption: 'Beautiful Eyes',
                    },
              ]
          }
      }


      onActionButton = (media, index) => {
          if (Platform.OS === 'ios') {
            ActionSheetIOS.showShareActionSheetWithOptions(
              {
                url: media.photo,
                message: media.caption,
              },
              () => {},
              () => {},
            );
          } else {
            alert(`handle sharing on android for ${media.photo}, index: ${index}`);
          }
        };

        handleSelection = async (media, index, isSelected) => {
          if (isSelected == true) {
              this.state.mediaSelected.push(media.photo);
          } else {
           this.state.mediaSelected.splice(this.state.mediaSelected.indexOf(media.photo), 1);
          }
           console.warn(this.state.mediaSelected);
        }

        deleteImageFile = () => {
        console.warn(this.state.mediaSelected);
        this.state.mediaSelected.forEach((file) =>{
            let tempgalleryList = this.state.galleryList.filter(item => item.photo !== file);
            this.setState({ galleryList : tempgalleryList })
          })
        }

       renderDelete(){
         const { galleryList } = this.state;
         if(galleryList.length>0){
           return(
             <View style={styles.topRightContainer}>
             <TouchableOpacity style={{alignItems: 'center',right: 10}} onPress={this.deleteImageFile}>
               <Image
                 style={{width: 24, height: 24}}
                 source={require('./assets/images/ic_delete.png')}
               />
               </TouchableOpacity>
             </View>
           )
         }
       }

       goBack() {
         const { navigation } = this.props;
         navigation.pop;
       }

      render() {
        const { galleryList } = this.state;
          return (
              <View style={styles.container}>
                  <View style={{flex: 1}}>
                  <PhotoBrowser
                      mediaList={galleryList}
                      enableGrid={true}
                      displayNavArrows={true}
                      displaySelectionButtons={true}
                      displayActionButton={true}
                      onActionButton={this.onActionButton}
                      displayTopBar = {true}
                      onSelectionChanged={this.handleSelection}
                      startOnGrid={true}
                      initialIndex={0}
                  />
                  </View>
                  {this.renderDelete()}
              </View>
          )
      }
  }


const styles = StyleSheet.create({
  container: {
      flex: 1
  },


  topRightContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
    top: 40,
  },
});
