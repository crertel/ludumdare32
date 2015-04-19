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
                    rooms[room.name].name = room.name;
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

            function getSceneSnapshot() {
                var ret = Object.create(null);
                ret.name = currScene.name;
                return ret;
            }

            function update( dt ) {
                dt;
            }


            return {
                init: init,
                update: update,
                getSceneSnapshot: getSceneSnapshot,
                loadWorld: loadWorld
            };
        })();
    })(self.CS);
})(self);
