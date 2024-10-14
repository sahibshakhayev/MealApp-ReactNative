import React from 'react';
import { FlatList } from 'react-native';

const CustomList = ({ children }) => (
    <FlatList
        data={[]}
        keyExtractor={() => "key"}
        renderItem={null}
        ListHeaderComponent={<>{children}</>}
    />
);

export default CustomList;
