import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 16px;
`;

export const SectionDetails = styled.View`
  margin: 14px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const SectionBio = styled.View`
  justify-content: center;
`;

export const SectionBioName = styled.Text`
  font-size: 26px;
  font-weight: bold;
`;

export const SectionBioComplement = styled.Text`
  font-size: 20px;
  margin: 4px 0;
  max-width: 90%;
`;

export const EditBioButton = styled.TouchableOpacity`
  margin: auto 0;
  padding: 10px;
`;

export const DeleteButton = styled.TouchableOpacity`
  margin-right: 6px;
  padding: 10px 12px;
`;
