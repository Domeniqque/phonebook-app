import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 10px 0;
`;

export const Label = styled.Text`
  font-size: 22px;
  font-weight: bold;
  padding-right: 12px;
`;

export const SelectButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
`;

export const SelectButtonText = styled.Text`
  font-size: 22px;
  margin-right: 12px;
`;

export const PickerBlackdrop = styled.TouchableOpacity`
  position: absolute;
  bottom: -200px;
  right: 0;
  left: 0;
  top: -200px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
`;

export const pickerStyle = StyleSheet.create({
  select: {
    height: 350,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    marginBottom: -100,
    backgroundColor: '#fff',
    zIndex: 5000,
  },
});
