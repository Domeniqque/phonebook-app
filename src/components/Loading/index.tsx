import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading: React.FC = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 5000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        opacity: 0.6,
      }}
    >
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default Loading;
