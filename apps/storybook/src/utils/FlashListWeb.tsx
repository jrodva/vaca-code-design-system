// Web compatibility shim for @shopify/flash-list.
// FlashList requires native measurement APIs unavailable in browsers.
// Storybook runs on react-native-web, so we delegate to FlatList which works fine.
import { FlatList, type FlatListProps } from 'react-native'

export function FlashList<T>(props: FlatListProps<T>) {
  return <FlatList {...props} />
}
