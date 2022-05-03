import React, { useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';

const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 84;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const NUMBER_OF_ITEMS = 100;

const items = Array(NUMBER_OF_ITEMS)
  .fill(null)
  .map((_, i) => (
    <Item isAlt={!!(i % 2)} key={i}>
      {i + 1}
    </Item>
  ));

function AnimatedHeaderScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const graphOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE - 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const titlePaddingBottom = scrollY.interpolate({
    inputRange: [0, 50, HEADER_SCROLL_DISTANCE],
    outputRange: [40, 20, 0],
    extrapolate: 'clamp',
  });

  const titleFontSize = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [16, 32],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View
          style={[styles.title, { paddingBottom: titlePaddingBottom }]}
        >
          <Animated.Text style={{ fontSize: titleFontSize }}>
            Header
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.graph, { opacity: graphOpacity }]} />
      </Animated.View>
      <ScrollView
        bounces={false}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={(event) =>
          scrollY.setValue(event.nativeEvent.contentOffset.y)
        }
      >
        {items}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#62d1bc',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    textAlign: 'center',
    paddingTop: 20,
  },
  graph: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

function Item({
  isAlt = false,
  children,
}: {
  isAlt?: boolean;
  children: string | number;
}) {
  return (
    <View
      style={{
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: isAlt ? 'white' : 'lightgray',
      }}
    >
      <Text>{children}</Text>
    </View>
  );
}

export { AnimatedHeaderScreen };
