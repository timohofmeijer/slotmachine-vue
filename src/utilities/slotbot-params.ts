const urlParams = new URLSearchParams(window.location.search)
export const SLOTBOT = urlParams.get('slotbot') === 'true'
export const SLOTBOT_SHOW = urlParams.get('show') === 'true'
