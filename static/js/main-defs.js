(function(self){
    "use strict";

    self.CD = self.CD || {};
    var CD = self.CD;
    CD.rooms = (function(){
        return [ 
            {   name: "EntryWay",
                path: "rooms/EntryWay.png",
                portals: [{ to: "kitten" }]
            },
            {   name: "kitten",
                path: "rooms/kitten.jpg",
                portals: [{ to: "EntryWay"}]
            }
        ];
    })();
})( (typeof window === "undefined")?self:window);

(function(self){    
    "use strict";

    self.CD = self.CD || {};    
    var CD = self.CD;
    CD.sprites = (function(){
        return [
        ];
    })();
})( (typeof window === "undefined")?self:window);

(function(self){
    "use strict";
    self.CD = self.CD || {};
    var CD = self.CD;
    CD.sprites = (function(){
        return [
        ];
    })();
})( (typeof window === "undefined")?self:window);
