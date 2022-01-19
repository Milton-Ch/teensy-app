import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

export default class InputNumberArrows extends React.Component {
    
  state = {
    value: 0
  }

  updateValue = (valueChanged) => {
    this.props.onValueChanged(valueChanged);  
    this.setState({
      value: valueChanged
    });      
  }

  incrementValue = () => {
    this.props.onValueChanged(this.state.value + 1);
    this.setState({
      value: this.state.value +1
    });        
  }

  decrementValue = () => {
    this.props.onValueChanged(this.state.value - 1);
    this.setState({
      value: this.state.value -1
    });        
  }

  constructor(props) {
    super(props);   
    this.state = {
      value: props.value,
    };     
  }    

  render() { 
        return (
            <View style={{flex: 1,flexDirection: 'row', width: 250}}>                  
              <TextInput
                  label={this.props.label}
                  mode='outlined'
                  value={this.state.value}
                  onChangeText={value => this.updateValue(value)}                      
                  style={{height: 50, width: this.props.width?this.props.width:170, maxHeight: 50}}/>
              
              <View style={{flex: 1, flexDirection: 'column'}}>
                  <IconButton
                      icon={require('../assets/arrow-up.png')}
                      size={16}
                      onPress={() => this.incrementValue()}
                      style={{width:30, marginTop: 5}}
                      />       
                  <IconButton
                      icon={require('../assets/arrow-down.png')}
                      size={16}
                      onPress={() => this.decrementValue()}
                      style={{width:30, marginTop: -5}}
                      />                    
              </View>
            </View>
          );
    }
}

InputNumberArrows.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.number.isRequired, onValueChanged: PropTypes.func.isRequired, width: PropTypes.number };



