(function(CC) {
    "use strict";
    CC.server = (function(){
        function init(){
            console.log("Initialized server.");
        }

        return {
            init: init
        };
    })();
})(window.CC);
