import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  HomeIcon,
  CompassIcon,
  BookmarkIcon,
  UserIcon,
} from 'lucide-react-native';
import {useContext} from 'react';
import {ThemeContext} from '../contexts/ThemeContext';

const tabs = [
  {name: 'Home', Icon: HomeIcon},
  {name: 'Explore', Icon: CompassIcon},
  {name: 'Bookmarks', Icon: BookmarkIcon},
];

export default function Navbar({state, navigation}: any) {
  const {theme} = useContext(ThemeContext);
  const currentRouteName = state.routes[state.index].name;

  return (
    <View
      style={[
        styles.navbar,
        {backgroundColor: theme.background},
        {borderColor: theme.border},
      ]}>
      {tabs.map(tab => {
        const isActive = currentRouteName === tab.name;
        const IconComponent = tab.Icon;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            style={styles.iconWrapper}
            activeOpacity={0.6}>
            <View style={{alignItems: 'center'}}>
              <IconComponent
                color={isActive ? theme.primary : theme.text}
                size={28}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {isActive && (
                <View style={[styles.dot, {backgroundColor: theme.primary}]} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    borderTopWidth: 0.5,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
});
