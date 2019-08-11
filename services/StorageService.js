import { AsyncStorage } from "react-native"

export const StorageService = {
  getSessionId: async () => AsyncStorage.getItem('sessionId'),
  saveSessionId: async sessionId => AsyncStorage.setItem('sessionId', sessionId),
  saveMany: async (obj = {}) => AsyncStorage.multiSet(Object.keys(obj).map(k => [k, obj[k]])),
  getMany: async (arr = []) => AsyncStorage.multiGet(arr).then(res => res.reduce((obj, [key, value]) => ({...obj, [key]: value }), {}))
}