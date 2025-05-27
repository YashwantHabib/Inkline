import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';
import {
  HomeIcon,
  CompassIcon,
  BookmarkIcon,
  UserIcon,
} from 'lucide-react-native';

const tabs = [
  {name: 'Home', Icon: HomeIcon},
  {name: 'Explore', Icon: CompassIcon},
  {name: 'Bookmarks', Icon: BookmarkIcon},
  {name: 'Profile', Icon: UserIcon},
];

export default function Navbar() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const theme = useColorScheme();

  return (
    <View style={[styles.navbar, {backgroundColor: theme.background}]}>
      {tabs.map(tab => {
        const isActive = route.name === tab.name;

        const scaleAnim = React.useRef(
          new Animated.Value(isActive ? 1.2 : 1),
        ).current;

        React.useEffect(() => {
          Animated.timing(scaleAnim, {
            toValue: isActive ? 1.2 : 1,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }).start();
        }, [isActive]);

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate('Tabs', {screen: tab.name})}
            style={styles.iconWrapper}
            activeOpacity={0.7}>
            <Animated.View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isActive
                    ? theme.primary + '15' // subtle bg
                    : 'transparent',
                  transform: [{scale: scaleAnim}],
                },
              ]}>
              <tab.Icon
                color={isActive ? theme.primary : theme.text}
                size={26}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
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
  iconCircle: {
    padding: 12,
    borderRadius: 30,
  },
});
