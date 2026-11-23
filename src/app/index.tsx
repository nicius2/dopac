import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const Screen = withUniwind(SafeAreaView);

export default function HomeScreen() {
  return (
    <Screen className="flex-1 items-center justify-center bg-background">
      <Text className="text-5xl font-semibold text-foreground">dopac</Text>
    </Screen>
  );
}
