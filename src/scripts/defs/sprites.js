(function(self){
    "use strict";
    self.CD = self.CD || {};
    var CD = self.CD;
    CD.sprites = (function(){
        return [
                {
                    "type": "sprite",
                    "name": "cat",
                    "path" : "sprites/kitty_cells.png",
                    "animations": {
                                    "walkDown":  [
                                                    { "x": 2, "y": 0, "w": 41, "h": 60, "dt": 200},
                                                    { "x": 45, "y": 0, "w": 44, "h": 60, "dt": 200},
                                                    { "x": 90, "y": 0, "w": 43, "h": 60, "dt": 200},
                                                    { "x": 134, "y": 0, "w": 44, "h": 60, "dt": 200}
                                                ],
                                    "walkUp": [
                                                    { "x": 3, "y": 127, "w": 40, "h": 55, "dt": 200},
                                                    { "x": 42, "y": 127, "w": 40, "h": 55, "dt": 200},
                                                    { "x": 84, "y": 127, "w": 36, "h": 55, "dt": 200},
                                                    { "x": 122, "y": 127, "w": 160, "h": 55, "dt": 200}
                                                ],
                                    "walkRight": [
                                                    { "x": 3, "y": 66, "w": 61, "h": 56, "dt": 200},
                                                    { "x": 66, "y": 66, "w": 60, "h": 56, "dt": 200},
                                                    { "x": 127, "y": 66, "w": 81, "h": 56, "dt": 200},
                                                    { "x": 190, "y": 66, "w": 60, "h": 56, "dt": 200}
                                                ],
                                    "walkLeft":[                                                    
                                                    { "x": 3, "y": 186, "w": 60, "h": 51, "dt": 200},
                                                    { "x": 65, "y": 186, "w": 61, "h": 51, "dt": 200},
                                                    { "x": 128, "y": 186, "w": 59, "h": 51, "dt": 200},
                                                    { "x": 189, "y": 186, "w": 57, "h": 51, "dt": 200}
                                                ]
                                }
                }
        ];
    })();
})( (typeof window === "undefined")?self:window);
