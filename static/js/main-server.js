(function(CC){
    "use strict";

    CC.server = (function(){
        var currScene = {};

        function init() {
            console.log("Initialized game server.");
        }

        function getScene() {
            return {};
        }
        
        return {
            init: init,
            getScene: getScene
        };
    })();
})(window.CC);
