(function(CC,CD){
    "use strict";
    CC.engine = (function(){
        var inputHandler = function(){};

        var k_right = 68;
        var k_left = 65;
        var k_up = 87;
        var k_down = 83;
        var k_stop = 27;
        var k_start = 13;

        var ctx;

        function dispatchKeyUp(e) {
            var evt;
            switch(e.which) {
                case k_down: evt = { action: "stopDown" };  break;
                case k_left: evt = { action: "stopLeft" };  break;                             
                case k_up:   evt = { action: "stopUp" };    break;
                case k_right:evt = { action: "stopRight" }; break;
                case k_start:evt = { action: "start" }; break;
                case k_stop: evt = { action: "stop" }; break;
                default: /* weird key */ break;
            }
            if (evt) {
                evt.time = Date.now();
                inputHandler(evt);
            }
        }
        function dispatchKeyDown(e) {
            var evt;
            switch(e.which) {
                case k_down: evt = { action: "startDown" };  break;
                case k_left: evt = { action: "startLeft" };  break;                             
                case k_up:   evt = { action: "startUp" };    break;
                case k_right:evt = { action: "startRight" }; break;
                default: /* weird key */ break;
            }
            if (evt) {
                evt.time = Date.now();
                inputHandler(evt);
            }
        }

        function init() {
            // setup input handlers
            window.onkeyup = dispatchKeyUp;
            window.onkeydown = dispatchKeyDown;

            // grab drawing context
            ctx = document.getElementById("game-window").getContext('2d');
            
            console.log("Initialized engine.");
        }

        function drawAssetLoading( assetName, assetPath, currCount, totalCount ) {
            ctx.save();
            ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "#0F0";
            ctx.font = "48px sans-serif";
            
            var assetString = "Loading asset " + (currCount) + " of " + totalCount;
            ctx.fillText( assetString,
                          ctx.canvas.width/2 - ctx.measureText(assetString).width/2,
                          ctx.canvas.height/2);

            ctx.font = "24px sans-serif";            
            var nameString = assetName + " (" + assetPath + ")";
            ctx.fillText( nameString,
                          ctx.canvas.width/2 - ctx.measureText(nameString).width/2,
                          ctx.canvas.height/2 + 34);

            var k_loadingBarWidth = 300;
            var k_loadingBarHeight = 40;
            ctx.strokeStyle = "#009";
            ctx.lineWidth = 10;
            ctx.strokeRect(ctx.canvas.width/2 - k_loadingBarWidth / 2,
                           ctx.canvas.height/2 + 20 + 34,
                           k_loadingBarWidth,
                           k_loadingBarHeight);
            ctx.fillStyle = "#00C";
            ctx.fillRect(ctx.canvas.width/2 - k_loadingBarWidth / 2 + 5,
                         ctx.canvas.height/2 + 20 + 5 + 34,
                         k_loadingBarWidth - 10,
                         k_loadingBarHeight - 10);            

            ctx.restore();
        }

        function precacheAssets(cache, defs) {
            defs = defs || {};
            var sounds = defs.sounds || [];
            var sprites = defs.sprites || [];
            var rooms = defs.rooms || [];

            // calculate number of things
            var totalAssetCount = sounds.length + sprites.length + rooms.length;
            var loadedCount = 0;
          
            rooms.forEach( function (room) {
                CC.cache.addImage( room.name, room.path, function _cachedRoom() {
                  drawAssetLoading( room.name, room.path, loadedCount, totalAssetCount);
                  console.log("Cached room ", room.name);
                  loadedCount++;
                });
            });
            
            sprites.forEach( function (sprite) {
                CC.cache.addImage( sprite.name, sprite.path, function _cachedSprite() {
                  drawAssetLoading( sprite.name, sprite.path, loadedCount, totalAssetCount);
                  loadedCount++;
                });
            });

            sounds.forEach( function( sound ) {
//              drawAssetLoading( sound.name, sound.path, loadedCount, totalAssetCount);
              loadedCount++;
            });
        }

        function onInput( cb ) {
            inputHandler = cb;
        }

        function drawSprite( name, animation, x, y,t ) {
            var sprite = CC.cache.getImage( name );

            var spriteDef;
            for (var i = 0; i < CD.sprites.length; i++) {
                if (CD.sprites[i].name === name) {
                    spriteDef = CD.sprites[i];
                    break;
                }
            }

            if (!spriteDef || !spriteDef.animations[animation]) {
                ctx.drawImage( sprite, x, y);
            } else {
                var frames = spriteDef.animations[animation];
                ctx.drawImage( sprite,
                               frames[0].x,
                               frames[0].y,
                               frames[0].w,
                               frames[0].h,
                               x,
                               y,
                               frames[0].w,
                               frames[0].h);
            }
        }

        function drawScene( scene ) {
            //TODOTODO draw scene
            ctx.save();
            ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
            
            // draw room
            if (scene.room) {
                var room = CC.cache.getImage( scene.room.name );
                ctx.drawImage( room, 0,0, ctx.canvas.width, ctx.canvas.height);
                
                // draw sprites
                if (scene.room.objects) {
                    scene.room.objects.forEach( function _renderObject( object ) {
                        if (object.name !== "@PLAYER") {
                            var sprite = CC.cache.getImage( object.name );
//                            ctx.drawImage( sprite, object.x, object.y);
                        } else {
                            ctx.fillStyle = "#0F0";
                            drawSprite("cat", object.anim, object.x, object.y,0);
//                            ctx.fillRect( object.x, object.y, 20, 20);
                           
                        }
                    });
                }
            }
            
            
            // draw text
            if (scene.text) {
                scene.text.forEach( function _renderText( text ) {
                });
            }
            
            // draw hud
            if (scene.hud) {
            }
           
            ctx.restore();
        }

        return {
            init: init,
            onInput: onInput,
            drawScene: drawScene,
            precacheAssets: precacheAssets
        };
    })();
})(window.CC,window.CD);
