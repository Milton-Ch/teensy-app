import * as React from 'react';
import { StyleSheet, Text, View, Picker, Image } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
import InputNumberArrows from './components/InputNumberArrows';

//const db= openDatabase({
//  name: 'db_teensy',
//});

export default function App() { 

  const [user_id, setUserId] = React.useState('AB01');
  const [trial_num, setTrialNum] = React.useState('1');

  const [as_ped_direction, setAsPedDirection] = React.useState('0');
  const [as_max_speed, setAsMaxSpeed] = React.useState(45);
  const [as_min_speed, setAsMinSpeed] = React.useState(20);
  const [as_variation_form, setAsVariationForm] = React.useState('0');
  const [as_variation_period, setAsVariationPeriod] = React.useState(30);

  const [res_max_resistance_left, setResMaxResistanceLeft] = React.useState(4);
  const [res_min_resistance_left, setResMinResistanceLeft] = React.useState(2);
  const [res_variation_form_left, setResVariationFormLeft] = React.useState('0');
  const [res_variation_period_left, setResVariationPeriodLeft] = React.useState(30);
  const [res_cycling_from_left, setResCyclingFromLeft] = React.useState(0);
  const [res_cycling_to_left, setResCyclingToLeft] = React.useState(135);
  const [res_repetitions_left, setResRepetitionsLeft] = React.useState(0);  
  const [res_max_resistance_right, setResMaxResistanceRight] = React.useState(4);
  const [res_min_resistance_right, setResMinResistanceRight] = React.useState(2);
  const [res_variation_form_right, setResVariationFormRight] = React.useState('0');
  const [res_variation_period_right, setResVariationPeriodRight] = React.useState(30);
  const [res_cycling_from_right, setResCyclingFromRight] = React.useState(180);
  const [res_cycling_to_right, setResCyclingToRight] = React.useState(270);
  const [res_repetitions_right, setResRepetitionsRight] = React.useState(30);  

  const [exercise_time, setExerciseTime] = React.useState(15);  
  const [road_feel, setRoadFeel] = React.useState('0');
  const [record_sequence, setRecordSequence] = React.useState('0');
  const [save_sequence, setSaveSequence] = React.useState('');


  
  const createTables = () =>{
    db.transaction(txn => {
      'CREATE TABLE IF NOT EXISTS seq (id INTEGER PRIMARY KEY AUTOINCRENET, name VARCHAR(50)) '
    });
  };

  React.useEffect(()=>{
    //createTables();
  }, []);

  const nextPedDirectionUp = () =>{
    const ind = vPedDirection.indexOf(as_ped_direction);
    if(ind>=vPedDirection.length-1){
      return vPedDirection[0];
    } else {
      return vPedDirection[ind + 1];
    }
  };

  const nextPedDirectionDown = () =>{
    const ind = vPedDirection.indexOf(as_ped_direction);
    if(ind<=0){
      return vPedDirection[vPedDirection.length-1];
    } else {
      return vPedDirection[ind - 1];
    }
  };

  return(
    <View style={styles.container_rows}>            
      <View style={styles.container_columns}>
        <View style={styles.box_vertical}>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginTop:20, textAlign: 'center', color: 'green'}}>Assistance</Text>
          <Text style={{fontSize: 15}}>Pedalling Direction</Text>
          <Picker
            selectedValue={as_ped_direction}
            style={{ height: 45, width: 170 }}
            onValueChange={(itemValue, itemIndex) => setAsPedDirection(itemValue)}>
            <Picker.Item label="Forward" value="0" />
            <Picker.Item label="Backward" value="1" />
          </Picker>          
          <InputNumberArrows label={'Max Speed(rpm)'} value={as_max_speed} onValueChanged={val => setAsMaxSpeed(val)}/>
          <InputNumberArrows label={'Min Speed(rpm)'} value={as_min_speed} onValueChanged={val => setAsMinSpeed(val)}/>
          <Text style={{fontSize: 15}}>Variation Form</Text>
          <Picker
            selectedValue={as_variation_form}
            style={{ height: 45, width: 200 }}
            onValueChange={(itemValue, itemIndex) => setAsVariationForm(itemValue)}>
            <Picker.Item label="Forward" value="0" />
            <Picker.Item label="Backward" value="1" />
          </Picker>              
          <InputNumberArrows label={'Variation Period(sec)'} value={as_variation_period} onValueChanged={val => setAsVariationPeriod(val)}/>
    </View>
        <View style={styles.box_horizontal_columns} >
          <View style={{flex: 1, flexDirection: 'column', minWidth: 500}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginTop:20, textAlign: 'center', color: 'red'}}>Resistance</Text>          
          <View style={styles.container_columns}>
            <View style={styles.container_rows}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Left</Text>
              <InputNumberArrows label={'Max Resistance (N-m)'} value={res_max_resistance_left} onValueChanged={val => setResMaxResistanceLeft(val)}/>
              <InputNumberArrows label={'Min Resistance (N-m)'} value={res_min_resistance_left} onValueChanged={val => setResMinResistanceLeft(val)}/>
              <Text style={{fontSize: 15}}>Variation Form</Text>
              <Picker
                selectedValue={res_variation_form_left}
                style={{ height: 45, width: 200 }}
                onValueChange={(itemValue, itemIndex) => setResVariationFormLeft(itemValue)}>
                <Picker.Item label="None" value="0" />
                <Picker.Item label="Variation 1" value="1" />
                <Picker.Item label="Variation 2" value="2" />
              </Picker>              
              <InputNumberArrows label={'Variation Period (sec)'} value={res_variation_period_left} onValueChanged={val => setResVariationPeriodLeft(val)}/>
              <Text style={{fontSize: 15}}>Cycling range</Text>
              <View style={{flex: 1,flexDirection: 'row', width: 250}}>
                  <InputNumberArrows label={'from'} width={75} value={res_cycling_from_left} onValueChanged={val => setResCyclingFromLeft(val)}/>
                  <InputNumberArrows label={'to'} width={75} value={res_cycling_to_left} onValueChanged={val => setResCyclingToLeft(val)}/>
              </View>
              <InputNumberArrows label={'Repetitions'} value={res_repetitions_left} onValueChanged={val => setResMaxResistanceLeft(val)}/>              
            </View>
            <View style={styles.container_rows}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Right</Text>
              <InputNumberArrows label={'Max Resistance (N-m)'} value={res_max_resistance_right} onValueChanged={val => setResMaxResistanceRight(val)}/>
              <InputNumberArrows label={'Min Resistance (N-m)'} value={res_min_resistance_right} onValueChanged={val => setResMinResistanceRight(val)}/>
              <Text style={{fontSize: 15}}>Variation Form</Text>
              <Picker
                selectedValue={res_variation_form_right}
                style={{ height: 45, width: 200 }}
                onValueChange={(itemValue, itemIndex) => setResVariationFormRight(itemValue)}>
                <Picker.Item label="None" value="0" />
                <Picker.Item label="Variation 1" value="1" />
                <Picker.Item label="Variation 2" value="2" />
              </Picker>              
              <InputNumberArrows label={'Variation Period (sec)'} value={res_variation_period_right} onValueChanged={val => setResVariationPeriodRight(val)}/>
              <Text style={{fontSize: 15}}>Cycling range</Text>
              <View style={{flex: 1,flexDirection: 'row', width: 250}}>
                  <InputNumberArrows label={'from'} width={75} value={res_cycling_from_right} onValueChanged={val => setResCyclingFromRight(val)}/>
                  <InputNumberArrows label={'to'} width={75} value={res_cycling_to_right} onValueChanged={val => setResCyclingToRight(val)}/>
              </View>
              <InputNumberArrows label={'Repetitions'} value={res_repetitions_right} onValueChanged={val => setResMaxResistanceRight(val)}/>              
            </View>
          </View>
        </View>
        </View>
        <View style={styles.box_vertical}>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginTop:20, textAlign: 'center', color: 'green'}}>Start/Stop</Text>
          <View style={{flex: 1,flexDirection: 'row', width: 250}}>                  
                  <TextInput
                      label="UserID"
                      mode='outlined'
                      value={user_id}                                   
                      onChangeText={text => setUserId(text)}
                      style={{height: 50, width: 120, maxHeight:50}}                      
                    />                 
                     <TextInput
                      label="Trial Num"
                      mode='outlined'
                      value={trial_num}
                      editable={false}                     
                      style={{height: 50, width: 120, maxHeight: 50, marginLeft: 5}}
                    />        
          </View>  

          <InputNumberArrows label={'Exercise time(min)'} value={exercise_time} onValueChanged={val => setExerciseTime(val)}/>
          
          <Text style={{fontSize: 15}}>Road feel</Text>
          <Picker
            selectedValue={road_feel}
            style={{ height: 45, width: 200 }}
            onValueChange={(itemValue, itemIndex) => setRoadFeel(itemValue)}>
            <Picker.Item label="Asphalt" value="0" />
            <Picker.Item label="Cobblestone" value="1" />
            <Picker.Item label="Other" value="2" />
          </Picker>      

          <Text style={{fontSize: 15}}>Record Sequence</Text>
          <Picker
            selectedValue={record_sequence}
            style={{ height: 45, width: 200 }}
            onValueChange={(itemValue, itemIndex) => setRecordSequence(itemValue)}>
            <Picker.Item label="Yes" value="0" />
            <Picker.Item label="No" value="1" />
          </Picker>              
         
          <View style={{flex: 1,flexDirection: 'row', width: 250}}>                  
                  <TextInput
                      label="Save Sequence"
                      mode='outlined'
                      value={save_sequence}
                      onChangeText={text => setSaveSequence(text)}                      
                      style={{height: 50, width: 240, maxHeight: 50}}
                    />                 
          </View>
          <View style={{flex: 1,flexDirection: 'row', width: 250, height:35}}>                  
          <Button icon="content-save" mode="contained" onPress={() => console.log('Pressed Save')} style={{width: 100, height:35}}>
            Save
          </Button>
          <Button icon="play-circle" mode="contained" onPress={() => console.log('Pressed Start')} style={{width: 120, height: 35, marginLeft:5}}>
            Start
          </Button>    
          </View>
          
        </View>
      </View>
      <View style={{flex: 1,flexDirection: 'row'}}>
        <Text> Choose sequences:</Text>
        <Text> Selected Sequences:</Text>
      </View>
    </View>
    );  
}

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 25  ,
    backgroundColor: 'black'        
  },
  container_rows: {
    flex: 1,
    flexDirection: 'column'       
  },
  container_columns: {
    flex: 1,
    flexDirection: 'row'       
  },
  box_vertical: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    padding: 10,
    margin:5,
    width: 250,
    minWidth: 250,
  },
  box_horizontal: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    padding: 10,
    margin:5,
    height: 200
  },
  box_horizontal_columns: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    padding: 10,
    margin:5,   
    minWidth: 500 
  },
});
