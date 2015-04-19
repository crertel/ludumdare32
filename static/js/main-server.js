(function () {
    "use strict";

    self.CS = self.CS || {};
    self.log = function () {
        var args = [];
        for (var i = 0 ; i < arguments.length; i++){
            if (typeof arguments[i] === "object") {
                args.push(JSON.stringify(arguments[i]));
            } else {
                args.push(arguments[i]);
            }
        }
        self.postMessage( {
            type: "log",
            data: args.join("")
        });
    };

    var console = console || {};
    console.log = console.log || self.log;

    (function(CS){

        CS.server = (function(){
            var currScene = {};

            function init() {
                console.log("Initialized game server.");
                self.onmessage = handleMessage;
            }

            function getScene() {
                return {};
            }

            function handleMessage( msg ) {
                msg = msg.data || {};
                console.log("Server: ", msg);
            }
            
            return {
                init: init,
                getScene: getScene
            };
        })();

        CS.server.init();
    })(self.CS);
})(self);
