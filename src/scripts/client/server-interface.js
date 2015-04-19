(function(CC) {
    "use strict";
    CC.server = (function(){
        var worker = null;
        var currScene = {};

        function handleServerMessage( msg ){
            msg = msg.data || {};
            switch (msg.type) {
                case "log": console.log(msg.data); break;
                case "sceneUpdate": currScene = msg.data; break;
                default: console.log("Unknown message ", msg); break;
            }
        }

        function init(){
            worker = new Worker("js/main-server.min.js");
            worker.onmessage = handleServerMessage;
        }

        function handleInput(evt) {
            switch (evt.action) {
                case "start": worker.postMessage( {type: "startGame" } ); break;
                case "stop": worker.postMessage( {type: "stopGame"});break;
                default: worker.postMessage( { type: "input", data: evt } ); break;
            }
        }

        function getScene(){
            return currScene;
        }

        return {
            init: init,
            handleInput: handleInput,
            getScene: getScene
        };
    })();
})(window.CC);
