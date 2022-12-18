// import { ChromeMessage, Sender } from

// const messagesFromReactAppListener = (
//   message: ChromeMessage,
//   sender,
//   response
// ) => {
//   console.log("[content.js]. Message received", {
//     message,
//     sender,
//   });

//   if (sender.id !== chrome.runtime.id || message.from !== Sender.React) return;
// };

// /**
//  * Fired when a message is sent from either an extension process or a content script.
//  */
// chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
