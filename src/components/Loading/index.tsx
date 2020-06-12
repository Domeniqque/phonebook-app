import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default Loading;
