import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  RkText,
} from 'react-native-ui-kitten';

import { items } from '../utils/items';

export default class DetailRender extends Component {
  _renderType = (type) => {
    if(type) {
      return (
        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary2">Type</RkText><RkText rkType="primary3">{type}</RkText>
        </View>
      );
    }
    return <View />
  }

  _renderArray = (seasonArray) => {
    if(seasonArray.length==0) {
      return '-'
    }
    let seasonList = seasonArray.map((season) => {
      return ' ' + items[season].value;
    })
    return seasonList
  }

  _renderSeasons = (seasons) => {
    if(seasons) {
      let seasonArray = null;
      try {
        seasonArray = JSON.parse(seasons);
      }
      catch (e) {
        console.log(e);
      }
      if(seasonArray) {
        if(seasonArray.length==0) return <View />;
        return (
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary2">Seasons</RkText><RkText rkType="primary3">{this._renderArray(seasonArray)}</RkText>
          </View>
        );
      }
    }
    return <View />
  }

  _renderGender = (gender) => {
    if(gender) {
      return (
        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary2">Gender</RkText><RkText rkType="primary3">{gender}</RkText>
        </View>
      );
    }
    return <View />
  }

  _renderSizes = (sizes) => {
    if(sizes) {
      let sizeArray = null;
      try {
        sizeArray = JSON.parse(sizes);
      }
      catch (e) {
        console.log(e);
      }
      if(sizeArray) {
        if(sizeArray.length==0) return <View />;
        return (
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary2">Size</RkText><RkText rkType="primary3">{this._renderArray(sizeArray)}</RkText>
          </View>
        );
      }
    }
    return <View />
  }

  _renderColorArray = (colorArray) => {
    if(colorArray.length==0) {
      return '-'
    }
    let colorList = colorArray.map((color) => {
      return ' ' + items[color].name;
    })
    return colorList
  }

  _renderColors = (colors) => {
    if(colors) {
      let colorArray = null;
      try {
        colorArray = JSON.parse(colors);
      }
      catch (e) {
        console.log(e);
      }
      if(colorArray) {
        if(colorArray.length==0) return <View />;
        return (
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary2">Color</RkText><RkText rkType="primary3">{this._renderColorArray(colorArray)}</RkText>
          </View>
        );
      }
    }
    return <View />
  }

  _renderBrand = (brand) => {
    if(brand) {
      return (
        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary2">Brand</RkText><RkText rkType="primary3">{brand}</RkText>
        </View>
      );
    }
    return <View />
  }

  _renderLocation = (location) => {
    if(location) {
      return (
        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary2">Location</RkText><RkText rkType="primary3">{location}</RkText>
        </View>
      );
    }
    return <View />
  }

  _renderLink = (link) => {
    if(link) {
      return (
        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary2">Link</RkText><RkText rkType="primary3">{link}</RkText>
        </View>
      );
    }
    return <View />
  }

  _renderInWardrobe = (inWardrobe) => {
    if(inWardrobe) {
      return (
        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary2">In Wardrobe?</RkText><RkText rkType="primary3">Yes</RkText>
        </View>
      );
    } else {
      return (
        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary2">In Wardrobe?</RkText><RkText rkType="primary3">No</RkText>
        </View>
      );
    }
    return <View />
  }

  render() {
    let {
      type, seasons, gender, sizes, colors, brand, location, link, inWardrobe
    } = this.props;

    return (
      <View style={{marginBottom: 10}}>
        <View style={styles.headContainer}>
          <RkText rkType="header5">Detail</RkText>
        </View>
        {this._renderType(type)}
        {this._renderSeasons(seasons)}
        {this._renderGender(gender)}
        {this._renderSizes(sizes)}
        {this._renderColors(colors)}
        {this._renderBrand(brand)}
        {this._renderLocation(location)}
        {this._renderLink(link)}
        {this._renderInWardrobe(inWardrobe)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dContainer: {
    padding: 10
  },
  headContainer: {
    padding: 10,
    backgroundColor: '#f5f5f8'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 0,
    paddingLeft:20
  },
});
