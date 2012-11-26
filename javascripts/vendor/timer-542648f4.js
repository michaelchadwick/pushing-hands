/*
 * Timer.js: A periodic timer for Node.js and the browser.
 *
 * Copyright (c) 2012 Arthur Klepchukov, Jarvis Badgley, Florian Schäfer
 * Licensed under the BSD license (BSD_LICENSE.txt)
 *
 * Version: 0.0.1
 *
 */
(function(e,t){typeof exports=="object"?module.exports=t():typeof define=="function"&&define.amd?define(t):e.Timer=t()})(this,function(){function e(e){if(typeof e=="string"){isNaN(parseInt(e,10))&&(e="1"+e);var t=e.replace(/[^a-z0-9\.]/g,"").match(/(?:(\d+(?:\.\d+)?)(?:days?|d))?(?:(\d+(?:\.\d+)?)(?:hours?|hrs?|h))?(?:(\d+(?:\.\d+)?)(?:minutes?|mins?|m\b))?(?:(\d+(?:\.\d+)?)(?:seconds?|secs?|s))?(?:(\d+(?:\.\d+)?)(?:milliseconds?|ms))?/);if(t[0])return parseFloat(t[1]||0)*864e5+parseFloat(t[2]||0)*36e5+parseFloat(t[3]||0)*6e4+parseFloat(t[4]||0)*1e3+parseInt(t[5]||0,10);if(!isNaN(parseInt(e,10)))return parseInt(e,10)}return typeof e=="number"?e:0}function t(e,t){return parseInt(e/t,10)||1}function n(t){if(this instanceof n==0)return new n(t);this._notifications=[],this._resolution=e(t)||1e3,this._running=!1,this._ticks=0,this._timer=null}return n.prototype={start:function(){var e=this;return this._running||(this._running=!this._running,setTimeout(function t(){e._ticks++;for(var n=0,r=e._notifications.length;n<r;n++)e._notifications[n]&&e._ticks%e._notifications[n].ticks===0&&e._notifications[n].callback.call(e._notifications[n],{ticks:e._ticks,resolution:e._resolution});e._running&&(e._timer=setTimeout(t,e._resolution))},this._resolution)),this},stop:function(){return this._running&&(this._running=!this._running,clearTimeout(this._timer)),this},reset:function(){return this.stop(),this._ticks=0,this},clear:function(){return this.reset(),this._notifications=[],this},ticks:function(){return this._ticks},resolution:function(){return this._resolution},running:function(){return this._running},bind:function(n,r){if(n&&r){var i=t(e(n),this._resolution);this._notifications.push({ticks:i,callback:r})}return this},unbind:function(e){if(!e)this._notifications=[];else for(var t=0,n=this._notifications.length;t<n;t++)this._notifications[t]&&this._notifications[t].callback===e&&this._notifications.splice(t,1);return this}},n.prototype.every=n.prototype.bind,n.prototype.after=function(e,t){var r=this;n.prototype.bind.call(r,e,function i(){n.prototype.unbind.call(r,i),t.apply(this,arguments)})},n});