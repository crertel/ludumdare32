(function (self) {
    "use strict";
    self.importScripts("./main-defs.min.js");
})(self);

(function () {
    "use strict";

    self.CS = self.CS || {};
    (function(CS){

        CS.game = (function(){
            var currScene;

            function loadWorld( CD ) {
                // load rooms
                var rooms = Object.create(null);
                CD.rooms.forEach( function (room) {
                    rooms[room.name] = rooms[room.name] || Object.create(null);
                    rooms[room.name].connections = Object.create(null);
                    room.portals.forEach( function( portal ) {
                        rooms[portal.to] = rooms[portal.to] || Object.create(null);
                        rooms[room.name].connections[portal.to] = rooms[portal.to];
                    });
                    console.log("Loaded room ", room.name);
                });

                currScene = rooms[ CD.rooms[0].name ];
            }

            function init() {
                console.log("Initialized game.");
            }

            function getScene() {
                return currScene;
            }

            function update( dt ) {
                dt;
            }


            return {
                init: init,
                update: update,
                getScene: getScene,
                loadWorld: loadWorld
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

    (function(CS, CD){

        CS.server = (function(){
            var isRunning = false;
            var k_logicRate = 2000; // 10 Hz
            var lastTime = Date.now();
            var currTime = Date.now();
            var dt = 0;
            var runTimeout;

            function init() {
                console.log("Initialized server.");
                self.onmessage = handleMessage;
                CS.game.init();
                CS.game.loadWorld(CD);                
            }

            function start() {
                lastTime = Date.now();
                currTime = Date.now();
                isRunning = true;
                run();
            }

            function stop() {
                isRunning = false;
            }

            function run() {
                self.clearTimeout(runTimeout);
                if (isRunning) {
                    currTime = Date.now();
                    dt = currTime - lastTime;
                    lastTime = currTime;
                    runTimeout =  self.setTimeout( run, k_logicRate );
                    console.log("run");
                }
            }

            function getScene() {
                return CS.game.getScene();
            }

            function handleInput( evt ) {
                console.log(evt);
            }

            function handleMessage( msg ) {
                msg = msg.data || {};
                switch (msg.type) {
                    case "input": handleInput(msg.data); break;
                    case "startGame": start(); break;
                    case "stopGame": stop(); break;
                    default: break;
                }
            }
            
            return {
                init: init,
                getScene: getScene
            };
        })();

        CS.server.init();
    })(self.CS, self.CD);
})(self);
