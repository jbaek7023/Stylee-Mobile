import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, Radio } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {FontAwesome} from '../../assets/icons';

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
        return (<Radio selected={true} />)
      }
    } else if(selectionType===2) {
      if(_.includes(selectedSeasonIds, id)) {
          return (<Radio selected={true} />)
      }
    } else if(selectionType===3) {
      if(this.props.gender===value) {
        return (<Radio selected={true} />)
      }
    } else if(selectionType===4) {
      if(_.includes(selectedSizeIds, id)) {
        return (<Radio selected={true} />);
      }
    } else if(selectionType===5) {
      if(_.includes(selectedColorIds, id)) {
        return (<Radio selected={true} />);
      }
    } else if(selectionType===6){
      if(this.props.clothType===value) {
        return (<Radio selected={true} />)
      }
    }
    return (<Radio selected={false} />);
  }

  _getColorStyle = (color) => {
    return {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: color
    };
  }

  _renderItem = ({item}) => {
    let {value, id} = item;
    let checked = false;
    if(this.props.selectionType===1) {
      checked = (this.props.bigType===value) ? true : false;
    } else if (this.props.selectionType===3) {
      checked = (this.props.gender===value) ? true : false;
    }
    return (
      <View>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => this.props.selectAction(value, id)}>
          <RkText rkType="primary3">{value}</RkText>
          <Radio selected={checked} />
        </TouchableOpacity>
      </View>
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
      if(id==6) {
        if(_.includes(this.state.selectedSeasonIds, id)) {
          this.setState({selectedSeasonIds: []})
        } else {
          this.setState({selectedSeasonIds : [6]});
        }
      } else {
        if(_.includes(this.state.selectedSeasonIds, id)) {
          let newSelectedSeasonIds = _.filter(this.state.selectedSeasonIds, (curObject) => {
            return curObject !== id;
          });
          this.setState({selectedSeasonIds : newSelectedSeasonIds});
        } else {
          let newSelectedSeasonIds = [...this.state.selectedSeasonIds, id];
          newSelectedSeasonIds = _.filter(newSelectedSeasonIds, (curObject) => {
            console.log(curObject !== 6);
            return curObject !== 6;
          });
          this.setState({selectedSeasonIds : newSelectedSeasonIds});
        }
      }

    }
    // season Select Action
    this.props.seasonSelectAction(id);
  }

  _renderItemForMultiple = ({item}) => {
    let {id, value, name} = item;
    if(this.props.selectionType!==5) {
      let checked = false;
      if(this.props.selectionType===2) {
        checked = (_.includes(this.state.selectedSeasonIds, id)) ? true : false;
      } else if(this.props.selectionType===4) {
        checked = (_.includes(this.state.selectedSizeIds, id)) ? true : false;
      }
      return (
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => {this._handleMultipleItemPress(id)}}>
          <RkText rkType="primary3">{value}</RkText>
          <Radio selected={checked} />
        </TouchableOpacity>
      );
    } else {
      let checked = (_.includes(this.state.selectedColorIds, id)) ? true : false;
      return (
       <TouchableOpacity
         style={styles.itemStyle}
         onPress={() => this._handleMultipleItemPress(id)}>
         <View style={colorCircleStyle(value)} />
         <RkText rkType="primary3">{name}</RkText>
         <Radio selected={checked} />
       </TouchableOpacity>
      );
    }
  }

  _renderHeader = (selectionType) => {
    let text = 'Type';
    if (selectionType==2) {
      text = 'Season';
    } else if (selectionType==3) {
      text = 'Gender';
    } else if (selectionType==4) {
      text = 'Size';
    } else if (selectionType==5) {
      text = 'Color';
    }
    return (
      <View style={{height:40, alignItems: 'center'}}>
        <RkText rkType="header3">{text}</RkText>
        <TouchableOpacity style={{position: 'absolute', right:5}} onPress={()=>this.props.hideSelector()}>
          <RkText rkType="awesome modalClose">{FontAwesome.delete}</RkText>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    let { isSelectorVisible } = this.props;
    let { selectionType } = this.props;
    let multiple = _.includes([2, 4, 5] , selectionType)
    if(!multiple) {
      return (
        <Modal
          isVisible={isSelectorVisible}
          onBackdropPress = {() => this.props.hideSelector()}
          animationInTiming={1}
          >
          <View style={styles.modalContainer}>
            <FlatList
              ListHeaderComponent={this._renderHeader(selectionType)}
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
          onBackdropPress = {() => this.props.hideSelector()}
          animationInTiming={1}>
          <View style={styles.modalContainer}>
            <FlatList
              ListHeaderComponent={this._renderHeader(selectionType)}
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
    borderRadius: 10,
  },
  seperator: {
    backgroundColor: 'black',
    height: 0.5
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  }
}));

export default connect(null, actions)(SelectorModal);
