(function(self){
    "use strict";

    self.CD = self.CD || {};
    var CD = self.CD;
    CD.rooms = (function(){
        return [
            {
                name: "Kitchen",
                path: "rooms/Kitchen.png",
                portals: [{to: "LivingRoom"}]
            },
            {
                name: "LivingRoom",
                path: "rooms/LivingRoom.png",
                portals: [{to: "DoorWay"}, { to:"Kitchen"}]
            },
            {
                name: "DoorWay",
                path: "rooms/DoorWay.png",
                portals: [{to: "LivingRoom"}, {to:"EntryWay"} ]
            }
        ];
    })();
})( (typeof window === "undefined")?self:window);
