(function(CC) {
    "use strict";
    CC.server = (function(){
        var worker = null;

        function handleServerMessage( msg ){
            msg = msg.data || {};
            switch (msg.type) {
                case "log": console.log("Server: ", msg.data); break;
                default: console.log("Unknown message ", msg); break;
            }
        }

        function init(){
            worker = new Worker("js/main-server.min.js");
            worker.onmessage = handleServerMessage;
        }

        function handleInput(evt) {
            worker.postMessage( { type: "input", data: evt } );
        }

        function getScene(){
            return {};
        }

        return {
            init: init,
            handleInput: handleInput,
            getScene: getScene
        };
    })();
})(window.CC);
