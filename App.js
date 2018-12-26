/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,Image,ActionSheetIOS} from 'react-native';
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
                      photo: 'https://dspncdn.com/a1/media/originals/e3/ba/fe/e3bafea9cf160061aafeb215824b4751.jpg',
                      caption: 'Broadchurch Scene',
                    },
                    {
                      photo:
                        'https://dspncdn.com/a1/media/originals/bf/c5/8d/bfc58dca85e651894c992c7ecc27c65b.jpg',
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
          this.setState(prevState => ({
            galleryList : prevState.galleryList.filter(item => !prevState.mediaSelected.includes(item.photo)),
          }));
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
      flex: 1,
  },


  topRightContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
    top: 40,
  },
});
