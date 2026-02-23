import { Image } from 'expo-image';
import { StyleSheet, Text } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          <Text>Explore</Text>
        </ThemedText>
      </ThemedView>
      <ThemedText type="default"><Text>This app includes example code to help you get started.</Text></ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText type='default'>
          <Text>This app has two screens:{' '}</Text>
          <ThemedText type="defaultSemiBold"><Text>app/(tabs)/index.tsx</Text></ThemedText> <Text>and{' '}</Text>
          <ThemedText type="defaultSemiBold"><Text>app/(tabs)/explore.tsx</Text></ThemedText>
        </ThemedText>
        <ThemedText>
          <Text>The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}sets up the tab navigator.</Text>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link"><Text>Learn more</Text></ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          <Text> You can open this project on Android, iOS, and the web. To open the web version, press{' '}
            <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.</Text>
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          <Text>For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
            <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
            different screen densities</Text>
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
      </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
