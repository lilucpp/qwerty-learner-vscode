import { getConfig } from './utils'
import { platform } from 'os'
interface NativeModule {
  playerPlay(voiceUrl: string, callback: () => void): void
}

let PLATFORM = 'mac'
switch (platform()) {
  case 'win32':
    PLATFORM = 'win32'
    break
  default:
    PLATFORM = 'mac'
    break
}

const NATIVE = require(`node-loader!./rodio/${PLATFORM}.node`) as NativeModule

type VoiceType = 'us' | 'uk' | 'close'

export const getVoiceType = () => {
  const voiceType: VoiceType = getConfig('voiceType')
  let type
  switch (voiceType) {
    case 'us':
      type = 2
      break
    case 'uk':
      type = 1
      break
    case 'close':
      type = ''
      break
    default:
      type = ''
      break
  }
  return type
}

export const voicePlayer = (word: string, type: string | number, callback: () => void) => {
  NATIVE.playerPlay(`https://dict.youdao.com/dictvoice?audio=${word}&type=${type}`, callback)
}