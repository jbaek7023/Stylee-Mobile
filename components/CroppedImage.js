import React, { Component } from 'react';
import { Image, View } from 'react-native';

class CroppedImage extends Component {
  render() {
    return (
      <View style={[{
        overflow: 'hidden',
        height: this.props.cropHeight,
        width: this.props.cropWidth,
        backgroundColor: 'transparent'
        }, this.props.style]}>
        <Image 
          fadeDuration={0}
          style={{
            position: 'absolute',
            top: this.props.cropTop * -1,
            left: this.props.cropLeft * -1,
            width: this.props.width,
            height: this.props.height
          }}
          source={this.props.source}
          resizeMode={this.props.resizeMode}>
          {this.props.children}
        </Image>
      </View>
    );
  }
}

export default CroppedImage;
