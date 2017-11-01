import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SelectorModal extends Component {
  state = {
    selectedSeasonIds: this.props.selectedSeasonIds,
    selectedSizeIds: this.props.selectedSizeIds,
    selectedColorIds: this.props.selectedColorIds,
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  _renderCheck = (id, value) => {
    let { selectionType } = this.props;
    let { selectedSeasonIds, selectedSizeIds, selectedColorIds } = this.state;

    if(selectionType===1) {
      if(this.props.bigType===value) {
        return (<RkText>Check</RkText>)
      }
    } else if(selectionType===2) {
      if(_.includes(selectedSeasonIds, id)) {
          return (<RkText>Check</RkText>)
      }
    } else if(selectionType===3) {
      if(this.props.gender===value) {
        return (<RkText>Check</RkText>)
      }
    } else if(selectionType===4) {
      if(_.includes(selectedSizeIds, id)) {
        return (<RkText>Check </RkText>);
      }
    } else if(selectionType===5) {
      if(_.includes(selectedColorIds, id)) {
        return (<RkText>Check </RkText>);
      }
    } else if(selectionType===6){
      if(this.props.clothType===value) {
        return (<RkText>Check</RkText>)
      }
    }
    return (<RkText></RkText>);
  }

  _getColorStyle = (color) => {
    console.log(color);
    return {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: color
    };
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => this.props.selectAction(item.value, item.id)}>
        <RkText>{item.value}</RkText>
        { this._renderCheck(item.id, item.value) }
      </TouchableOpacity>
    );
  }

  _handleMultipleItemPress = (id) => {
    let { selectionType } = this.props;
    // Add or Delete states in the modal
    if(selectionType===4) {
      if(_.includes(this.state.selectedSizeIds, id)) {
        let newSelectedSizeIds = _.filter(this.state.selectedSizeIds, (curObject) => {
            return curObject !== id;
        });
        this.setState({selectedSizeIds : newSelectedSizeIds});
      } else {
        let newSelectedSizeIds = [...this.state.selectedSizeIds, id];
        this.setState({selectedSizeIds : newSelectedSizeIds});
      }
    } else if (selectionType===5) {
      if(_.includes(this.state.selectedColorIds, id)) {
        let newSelectedColorIds = _.filter(this.state.selectedColorIds, (curObject) => {
            return curObject !== id;
        });
        this.setState({selectedColorIds : newSelectedColorIds});
      } else {
        let newSelectedColorIds = [...this.state.selectedColorIds, id];
        this.setState({selectedColorIds : newSelectedColorIds});
      }
    } else {
      if(_.includes(this.state.selectedSeasonIds, id)) {
        let newSelectedSeasonIds = _.filter(this.state.selectedSeasonIds, (curObject) => {
            return curObject !== id;
        });
        this.setState({selectedSeasonIds : newSelectedSeasonIds});
      } else {
        let newSelectedSeasonIds = [...this.state.selectedSeasonIds, id];
        this.setState({selectedSeasonIds : newSelectedSeasonIds});
      }
    }
    // season Select Action
    this.props.seasonSelectAction(id);
  }

  _renderItemForMultiple = ({item}) => {
    if(this.props.selectionType!==5) {
      return (
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => {this._handleMultipleItemPress(item.id)}}>
          <RkText>{item.value}</RkText>
          { this._renderCheck(item.id, item.value) }
        </TouchableOpacity>
      );
    } else {
      return (
       <TouchableOpacity
         style={styles.itemStyle}
         onPress={() => this._handleMultipleItemPress(item.id)}>
         <View style={colorCircleStyle(item.value)} />
         <RkText>{item.name}</RkText>
         { this._renderCheck(item.id, item.value) }
       </TouchableOpacity>
      );
    }
  }

  render() {
    let { isSelectorVisible } = this.props;
    let { selectionType } = this.props;
    let multiple = _.includes([2, 4, 5] , selectionType)
    if(!multiple) {
      return (
        <Modal
          isVisible={isSelectorVisible}
          onBackdropPress = {() => this.props.hideSelector()}>
          <View style={styles.modalContainer}>
            <FlatList
              style={styles.root}
              data={this.props.items}
              ItemSeparatorComponent={this._renderSeparator}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal
          isVisible={isSelectorVisible}
          onBackdropPress = {() => this.props.hideSelector()}>
          <View style={styles.modalContainer}>
            <FlatList
              style={styles.root}
              data={this.props.items}
              extraData={[this.state.selectedSeasonIds, this.state.selectedColorIds, this.state.selectedSizeIds]}
              ItemSeparatorComponent={this._renderSeparator}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItemForMultiple}/>
          </View>
        </Modal>
      );
    }
  }
};

function colorCircleStyle(colorCode) {
   return {
     backgroundColor: colorCode,
     width: 24,
     height: 24,
     borderRadius: 12,
   }
 }

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  seperator: {
    backgroundColor: 'black',
    height: 0.5
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5
  }
}));

export default connect(null, actions)(SelectorModal);
