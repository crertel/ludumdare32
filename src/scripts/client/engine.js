(function(CC){
    "use strict";
    CC.engine = (function(){
        var inputHandler = function(){};

        var k_right = 68;
        var k_left = 65;
        var k_up = 87;
        var k_down = 83;

        var ctx;

        function dispatchKeyUp(e) {
            var evt;
            switch(e.which) {
                case k_down: evt = { action: "down" };  break;
                case k_left: evt = { action: "left" };  break;                             
                case k_up:   evt = { action: "up" };    break;
                case k_right:evt = { action: "right" }; break;
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

            var currAsset = { path: "<<PATH>>", name: "NAME" };
            drawAssetLoading( currAsset.name, currAsset.path, loadedCount, totalAssetCount);

        }

        function onInput( cb ) {
            inputHandler = cb;
        }

        function drawScene( scene ) {
            //TODOTODO draw scene
            
            // draw room
            
            // draw items
            
            // draw text
            
            // draw hud
        }

        return {
            init: init,
            onInput: onInput,
            drawScene: drawScene,
            precacheAssets: precacheAssets
        };
    })();
})(window.CC);