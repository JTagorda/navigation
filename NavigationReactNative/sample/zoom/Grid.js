import React from 'react';
import {StyleSheet, ScrollView, Text, View, TouchableHighlight} from 'react-native';
import {SharedElement} from 'navigation-react-native';
import ZoomShared from './ZoomShared';

const colors = [
  'maroon', 'red', 'crimson', 'orange', 'brown', 'sienna', 'olive',
  'purple', 'fuchsia', 'indigo', 'green', 'navy', 'blue', 'teal', 'black'
];

export default class Grid extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {url, crumbs} = props.stateNavigator.stateContext;
    this.url = url;
    this.crumbs = crumbs;
  }
  shouldComponentUpdate(props) {
    return this.url === props.stateNavigator.stateContext.url;
  }
  render() {
    const {stateNavigator} = this.props;
    return (
      <View style={styles.grid}>
        <ZoomShared stateNavigator={stateNavigator} />
        <ScrollView>
          <View style={styles.colors}>
            {colors.map(color => (
              <SharedElement
                key={color}
                name={color}
                data={{color}}
                stateNavigator={stateNavigator}>
                <TouchableHighlight
                  style={[
                    {backgroundColor: color},
                    styles.color
                  ]}
                  underlayColor={color}
                  onPress={() => {
                    if (this.url === stateNavigator.stateContext.url)
                      stateNavigator.navigate('detail', {color});
                  }}>
                  <View>
                    <SharedElement
                      name={`text${color}`}
                      data={{color, fontSize: 20, fontColor: '#fff'}}
                      stateNavigator={stateNavigator}>
                      <Text style={styles.text}>{color}</Text>
                    </SharedElement>
                  </View>
                </TouchableHighlight>
              </SharedElement>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    backgroundColor: '#fff',
  },
  colors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50,
  },
  color: {
    width: 100,
    height: 150,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});