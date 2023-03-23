import { defineStore } from 'pinia'
import { audioCtx, loadFiles } from './sound-audio-context'

import { SLOTBOT, SLOTBOT_SHOW } from '@/utilities/slotbot-params'

export enum Sounds {
  insertCoin = 'insertCoin',
  spin = 'spin',
  spinEnd = 'spinEnd',
  lock = 'lock',
  takeWin = 'takeWin',
  denied = 'denied',
  win = 'win',
  cashWin = 'cashWin',
  bigWin = 'bigWin'
  // barWin = 'barWin'
}

type Sound = {
  buffer: any
  trackSource?: any
  offset?: number
  currentTime?: number
}

type AppSounds = {
  [Sounds.insertCoin]: Sound
  [Sounds.spin]: Sound
  [Sounds.spinEnd]: Sound
  [Sounds.lock]: Sound
  [Sounds.takeWin]: Sound
  [Sounds.denied]: Sound
  [Sounds.win]: Sound
  [Sounds.cashWin]: Sound
  [Sounds.bigWin]: Sound
  // [Sounds.barWin]: Sound
}

const appSoundData = [
  {
    name: Sounds.insertCoin,
    url: 'https://cdn.freesound.org/previews/113/113095_1966560-lq.mp3'
  },
  {
    name: Sounds.spin,
    offset: 3,
    url: 'https://cdn.freesound.org/previews/120/120373_824230-lq.mp3'
  },
  {
    name: Sounds.spinEnd,
    url: 'https://cdn.freesound.org/previews/145/145441_2615119-lq.mp3'
  },
  {
    name: Sounds.lock,
    url: 'https://cdn.freesound.org/previews/56/56246_91374-lq.mp3'
  },
  {
    name: Sounds.takeWin,
    url: 'https://cdn.freesound.org/previews/383/383205_5549581-lq.mp3'
  },
  {
    name: Sounds.denied,
    url: 'https://cdn.freesound.org/previews/565/565133_1038806-lq.mp3'
  },
  {
    name: Sounds.win,
    url: 'https://cdn.freesound.org/previews/387/387232_1474204-lq.mp3'
  },
  {
    name: Sounds.cashWin,
    url: 'https://cdn.freesound.org/previews/337/337049_3232293-lq.mp3'
  },
  {
    name: Sounds.bigWin,
    url: 'https://cdn.freesound.org/previews/270/270319_5123851-lq.mp3'
  }
  // {
  //   name: Sounds.barWin,
  //   url: 'https://cdn.freesound.org/previews/337/337049_3232293-lq.mp3'
  // }
]

export const useSoundStore = defineStore('sounds', {
  state: () => ({ sounds: {} as AppSounds, soundsLoaded: false }),
  actions: {
    loadSounds() {
      loadFiles(appSoundData).then((audioFileBuffers) => {
        audioFileBuffers.map((buffer, index) => {
          const { name, offset = 0 } = appSoundData[index]
          this.sounds[name] = {
            offset,
            buffer
          }
        })
        this.soundsLoaded = true
      })
    },
    playSound(name: Sounds) {
      if (SLOTBOT) {
        if (SLOTBOT_SHOW) {
          if (
            name === Sounds.lock ||
            name === Sounds.denied ||
            name === Sounds.win ||
            name === Sounds.cashWin ||
            name === Sounds.bigWin
          ) {
            // Allow these sounds when SLOTBOT_SHOW
          } else return
        } else return
      }
      const sound = this.sounds[name]
      // this.audio.sounds.insertCoin.currentTime = 0
      sound.trackSource = audioCtx.createBufferSource()
      sound.trackSource.buffer = sound.buffer
      sound.trackSource.connect(audioCtx.destination)
      sound.trackSource.start(0, sound.offset)
    },
    pauseSound(name: Sounds) {
      const { trackSource } = this.sounds[name]
      if (trackSource) trackSource.stop()
    }
  }
})
