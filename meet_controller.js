"use strict";
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var icon = 'notmuted.png' // default icon for notification
    var message = 'Could not locate Mute control in Google Meeting.' // default notification message
    // find mute or unmute button on this Meeting page. only one of these will exist at a time
    const muteButton = document.querySelector("[aria-label='Desativar microfone (ctrl + d)']")
    const unmuteButton = document.querySelector("[aria-label='Ativar microfone (ctrl + d)']")

    // function for muting
    const muteMic = () => {
        const btn = muteButton
        if (btn !== null) {
            btn.click()
            message = 'Microphone is OFF'
            icon = 'muted.png'
            sendResponse({
                notification:
                {
                    type: 'basic',
                    iconUrl: icon,
                    title: message,
                    message: ''
                }
            })
        }
    }

    // function for unmuting
    const unmuteMic = () => {
        const btn = unmuteButton
        if (btn !== null) {
            btn.click()
            message = 'Microphone is ON'
            icon = 'notmuted.png'
            sendResponse({
                notification:
                {
                    type: 'basic',
                    iconUrl: icon,
                    title: message,
                    message: ''
                }
            })
        }
    }

    if (request.command === 'toggle_mic_all_tabs') {
        if (muteButton !== null) { // if the mute button exists, then the Mic is currently unmuted.
            muteMic()
        }
        else { // … and vice-versa.
            unmuteMic()
        }
    }
})
