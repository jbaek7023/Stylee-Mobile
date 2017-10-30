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

  _renderCheck = (id) => {
    let { selectionType, selectedSeasonIds, selectedSizeIds, selectedColorIds } = this.props;
    if(selectionType===1) {

    } else if(selectionType===2) {
      if(_.includes(this.state.selectedSeasonIds, id)) {
        return (<RkText>Check </RkText>);
      }
    } else if(selectionType===3) {

    } else if(selectionType===4) {
      if(_.includes(this.state.selectedSizeIds, id)) {
        return (<RkText>Check </RkText>);
      }
    } else if(selectionType===5) {
      if(_.includes(this.state.selectedColorIds, id)) {
        return (<RkText>Check </RkText>);
      }
    } else if(selectionType===6){

    }
    return (<RkText> </RkText>);
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => this.props.selectAction(item.value, item.id)}>
        <RkText>{item.value}</RkText>
        { this._renderCheck(item.id) }
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
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => {this._handleMultipleItemPress(item.id)}}>
        <RkText>{item.value}</RkText>
        { this._renderCheck(item.id) }
      </TouchableOpacity>
    );
  }

  render() {
    let { isSelectorVisible } = this.props;
    let { multiple } = this.props;
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
              ItemSeparatorComponent={this._renderSeparator}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItemForMultiple}/>
          </View>
        </Modal>
      );
    }
  }
};

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
