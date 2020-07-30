import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 30px 0;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 4px 10px;
  border-width: 1px;
  border-color: #000;
  border-radius: 12px;
`;

export const AddButtonText = styled.Text`
  font-size: 14px;
`;

export const Content = styled.View`
  margin: 20px 0;
  width: 100%;
`;

export const NoteItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  max-width: 100%;
`;

export const NoteText = styled.Text`
  font-size: 20px;
  padding-bottom: 10px;
  padding-top: 6px;
  width: 85%;
`;

export const NoteContent = styled.View`
  flex: 1;
`;

export const NoteDate = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const DeleteNote = styled.TouchableOpacity`
  padding: 10px;
`;
