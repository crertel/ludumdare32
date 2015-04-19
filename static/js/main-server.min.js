(function (self) {
    "use strict";
    self.importScripts("./main-defs.min.js");
})(self);

(function () {
    "use strict";

    self.CS = self.CS || {};

    (function(CS){

        CS.game = (function(){

            function init() {
                console.log("Initialized game.");
                console.log(CD);
            }

            function getScene() {
                return {};
            }            

            return {
                init: init,
                getScene: getScene
            };
        })();
    })(self.CS);
})(self);

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
                console.log("Initialized server.");
                self.onmessage = handleMessage;
            }

            function getScene() {
                return CS.game.getScene();
            }

            function handleMessage( msg ) {
                msg = msg.data || {};
                console.log( msg );
            }
            
            return {
                init: init,
                getScene: getScene
            };
        })();

        CS.server.init();
        CS.game.init();
    })(self.CS);
})(self);
