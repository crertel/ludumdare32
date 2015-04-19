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
                
                var scale = dt*k_playerMoveSpeed * Math.sqrt(x*x + y*y);
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
