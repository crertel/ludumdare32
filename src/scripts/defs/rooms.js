(function(self){
    "use strict";

    self.CD = self.CD || {};
    var CD = self.CD;
    CD.rooms = (function(){
        return [
            { 
                name: "ToBackyard",
                path: "rooms/ToBackyard.png",
                portals: [{to: "Kitchen"}],
                objects: []
            },
            {
                name: "Kitchen",
                path: "rooms/Kitchen.png",
                portals: [{to: "LivingRoom", x:800, y:200}],
                objects: [{x:450, y:500, name:"@SPAWN"},
                          {x:800, y:500, name:"cat_bowl"} ]
            },
            {
                name: "LivingRoom",
                path: "rooms/LivingRoom.png",
                portals: [{to: "DoorWay"},
                          {to:"Kitchen"}],
                objects: []
            },
            {
                name: "DoorWay",
                path: "rooms/DoorWay.png",
                portals: [{to: "LivingRoom"} ],
                objects: []
            }
        ];
    })();
})( (typeof window === "undefined")?self:window);
