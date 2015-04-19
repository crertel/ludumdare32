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
            var global_objects = [];
            var spawnID = 1;
            var p_player;

            function spawnObject( room, name, x, y) {
                var obj = {
                    x: x,
                    y: y,
                    name: name,
                    room: room,
                    id: spawnID
                };
                room.objects.push(p_player);
                global_objects.push(obj);
                spawnID++;
            }

            function spawnPlayer( room, x, y ) {
                p_player = {
                    x: x,
                    y: y,
                    name: "@PLAYER",
                    room: room,
                    id: 0
                };
                room.objects.push(p_player);
                global_objects.push(p_player);
            }

            function loadWorld( CD ) {
                // load rooms
                var rooms = Object.create(null);
                CD.rooms.forEach( function (room) {
                    rooms[room.name] = rooms[room.name] || Object.create(null);
                    var outRoom = rooms[room.name];
                    outRoom.name = room.name;
                    outRoom.connections = Object.create(null);
                    room.portals.forEach( function( portal ) {
                        rooms[portal.to] = rooms[portal.to] || Object.create(null);
                        outRoom.connections[portal.to] = rooms[portal.to];
                    });

                    outRoom.objects = [];  // not a hash, because objects may repeat
                    room.objects.forEach( function(obj) {
                        if(obj.name === "@SPAWN"){
                            currScene = outRoom;
                            spawnPlayer(outRoom, obj.x, obj.y);
                        } else {
                            spawnObject(outRoom, obj.name, obj.x, obj.y);
                        }                        
                    });

                    console.log("Loaded room ", room.name);
                });

            }

            function init() {
                console.log("Initialized game.");
            }

            function getSceneSnapshot() {
                var ret = Object.create(null);
                ret.name = currScene.name;
                ret.objects = currScene.objects;
                return ret;
            }

            var k_playerMoveSpeed = 0.2; // px/ms
            function update( dt ) {
                var x = 0; 
                var y = 0;
                if (p_movingUp) { y = -1; }
                if (p_movingDown) { y = 1; }
                if (p_movingLeft) { x = -1; }
                if (p_movingRight) { x = 1; }

                p_player.anim = "idle";
                if (x > 0) { p_player.anim = "walkLeft"; }
                if (x < 0) { p_player.anim = "walkRight"; }
                if (y > 0) { p_player.anim = "walkDown"; }
                if (y < 0) { p_player.anim = "walkUp"; }
                
                var scale = dt*k_playerMoveSpeed / ( Math.sqrt(x*x + y*y) || 1);
                p_player.x += x*scale;
                p_player.y += y*scale;
            }

            var p_movingUp = false;
            var p_movingDown = false;
            var p_movingLeft = false;
            var p_movingRight = false;

            function handleInput(evt){
                switch(evt.action) {
                    case "startUp": p_movingUp = true; break;
                    case "startDown": p_movingDown = true; break;
                    case "startLeft": p_movingLeft = true; break;
                    case "startRight": p_movingRight = true; break;
                    case "stopUp": p_movingUp = false; break;
                    case "stopDown": p_movingDown = false; break;
                    case "stopLeft": p_movingLeft = false; break;
                    case "stopRight": p_movingRight = false; break;
                    default: break;
                }
            }

            return {
                init: init,
                update: update,
                handleInput: handleInput,
                getSceneSnapshot: getSceneSnapshot,
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
            var k_logicRate = 50; // 20 Hz
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
                    CS.game.update(dt);
                    self.postMessage( {
                        type: "sceneUpdate",
                        data: {
                                room: CS.game.getSceneSnapshot()
                            }
                    });
                }
            }

            function handleInput( evt ) {
                CS.game.handleInput(evt);
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
                init: init
            };
        })();

        CS.server.init();
    })(self.CS, self.CD);
})(self);
