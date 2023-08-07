import { Alert } from "react-native";

interface GlobalAlertButton<T> {
  title?: T,
  style?: string,
  callback?: () => void
}

interface GlobalAlert<T> {
  title?: T,
  desc?: T,
  style?: string,
  buttons: GlobalAlertButton<T>[]
}

const GlobalAlert = <T extends string>( prams: GlobalAlert<T> ) => {
  const { title, desc, buttons } = prams;
  const defaultTexts = [ '취소', '확인' ];

  const defaultButtons: GlobalAlertButton<T>[] = buttons.map(( button, index ) => {
    if (!button.text) {
      return {
        ...button,
        text: defaultTexts[index]
      }
    }
  });
  
  Alert.alert(
    title,
    desc,
    defaultButtons
  )
}

export { GlobalAlert };