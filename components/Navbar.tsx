import React, {useRef, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {
  HomeIcon,
  CompassIcon,
  BookmarkIcon,
  UserIcon,
} from 'lucide-react-native';
import {useColorScheme} from '../hooks/useColorScheme';

const tabs = [
  {name: 'Home', Icon: HomeIcon},
  {name: 'Explore', Icon: CompassIcon},
  {name: 'Bookmarks', Icon: BookmarkIcon},
  {name: 'Profile', Icon: UserIcon},
];

export default function Navbar({state, navigation}: any) {
  const theme = useColorScheme();
  const currentRouteName = state.routes[state.index].name;

  const scaleAnims = useRef(
    Object.fromEntries(tabs.map(tab => [tab.name, new Animated.Value(1)])),
  ).current;

  useEffect(() => {
    tabs.forEach(tab => {
      const isActive = currentRouteName === tab.name;
      Animated.spring(scaleAnims[tab.name], {
        toValue: isActive ? 1.3 : 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }).start();
    });
  }, [currentRouteName]);

  return (
    <View style={[styles.navbar, {backgroundColor: theme.background}]}>
      {tabs.map(tab => {
        const isActive = currentRouteName === tab.name;
        const AnimatedIcon = Animated.createAnimatedComponent(tab.Icon);

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            style={styles.iconWrapper}
            activeOpacity={0.7}>
            <Animated.View
              style={{
                alignItems: 'center',
                transform: [{scale: scaleAnims[tab.name]}],
              }}>
              <AnimatedIcon
                color={isActive ? theme.primary : theme.text}
                size={26}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && (
                <View style={[styles.dot, {backgroundColor: theme.primary}]} />
              )}
            </Animated.View>
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
    paddingVertical: 14,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
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
