const AudioContext = window.AudioContext // || window.webkitAudioContext
export const audioCtx = new AudioContext()

// https://github.com/mdn/webaudio-examples/blob/master/multi-track/index.html
export const loadFiles = async (filesArray: any[]): Promise<AudioBuffer[]> => {
  const promises = [] as any[]
  filesArray.forEach(async (fileObject) => {
    const { url } = fileObject
    const trackPromise = loadFile(url)
    promises.push(trackPromise)
  })
  const audioFileBuffers = await Promise.all(promises)
  return audioFileBuffers
}

const loadFile = async (filePath: string): Promise<AudioBuffer> => {
  const track = await getFile(filePath)
  return track
}

const getFile = async (filepath: string): Promise<AudioBuffer> => {
  const response = await fetch(filepath)
  const arrayBuffer = await response.arrayBuffer()
  const promise = (await new Promise((resolve, reject) => {
    // Safari does not support decodeAudioData without callbacks : (
    audioCtx.decodeAudioData(
      arrayBuffer,
      (buffer) => {
        resolve(buffer)
      },
      (error) => {
        reject(error)
      }
    )
  })) as AudioBuffer
  return promise
}
