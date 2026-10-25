"use strict";import{WebRtcReceiver as r}from"./receiver.js";import{WebRtcSender as o}from"./sender.js";export function createWebRtcProtocol(e={}){return{protocol:"webrtc",name:"WebRtcProtocol",sender:new o,receiver:new r(e)}}export const WebRtcProtocol=createWebRtcProtocol();export{WebRtcReceiver}from"./receiver.js";export{WebRtcSender}from"./sender.js";
//# sourceMappingURL=index.js.map
