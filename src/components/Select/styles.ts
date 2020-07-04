import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';

export interface SelectItem {
  label: string;
  value: string;
}

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

export const PickerContainer = styled.View.attrs({
  contentContainerStyle: () => css`
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: #fff;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
})``;

export const PickerContent = styled.SafeAreaView`
  margin: 0 16px;
`;

export const PickerHeader = styled.View`
  position: relative;
`;

export const PickerClose = styled.TouchableOpacity`
  position: absolute;
  padding: 14px;
  top: 10px;
  right: 0px;
`;

export const PickerTitle = styled.Text`
  font-weight: bold;
  font-size: 28px;
  margin-top: 26px;
  margin-bottom: 25px;
`;

export const Filter = styled.View`
  width: 100%;
  height: 64px;
  padding: 0 16px;
  margin: 20px 0;
  background: #eee;
  border-color: #eee;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #000;

  flex-direction: row;
  align-items: center;
`;

export const FilterInput = styled.TextInput.attrs({
  focusable: true,
})`
  color: #000;
  font-size: 20px;
`;

export const PickerList = styled(FlatList as new () => FlatList<SelectItem>)`
  margin-top: 16px;
`;

export const PickerItem = styled.TouchableOpacity`
  height: 70px;
  width: 100%;
  padding: 0 10px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PickerItemText = styled.Text`
  font-size: 24px;
`;

export const Divisor = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
`;
