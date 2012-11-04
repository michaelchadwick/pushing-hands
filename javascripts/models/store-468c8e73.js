(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}},t={}.hasOwnProperty,n=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};ph.Store=function(t){function r(){return this.addTick=e(this.addTick,this),r.__super__.constructor.apply(this,arguments)}return n(r,t),r.prototype.defaults={highScore:0,gamesPlayed:0,totalTime:0,autoPlayMusic:!0,playSoundEffects:!0},r.prototype.initialize=function(){return this.set({currentTime:0}),this.set({gamesPlayed:this.get("gamesPlayed")+1}),this.on("change",this.persist,this),this.timer=new Timer,this.timer.every(1,this.addTick),this.timer.start()},r.prototype.persist=function(e){return amplify.store("pushing-hands",this.toJSON())},r.prototype.toggleAutoPlay=function(){return this.set({autoPlayMusic:!this.get("autoPlayMusic")})},r.prototype.toggleSoundEffects=function(){return this.set({playSoundEffects:!this.get("playSoundEffects")})},r.prototype.resetStats=function(){if(confirm("Are you sure you want to permanently reset your stats?"))return this.timer.reset(),this.set({highScore:0,gamesPlayed:1,currentTime:0,totalTime:0}),this.timer.start()},r.prototype.addTick=function(){var e;return e=this.timer.ticks(),this.set({currentTime:e,totalTime:this.get("totalTime")+1})},r}(Backbone.Model)}).call(this);