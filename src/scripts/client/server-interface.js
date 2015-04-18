(function(CC) {
    "use strict";
    CC.server = (function(){
        function init(){
            console.log("Initialized server.");
        }

        function handleInput(evt) {
            console.log("Event: ", evt);
        }

        function getScene(){
            return {};
        }

        return {
            init: init,
            handleInput: handleInput,
            getScene: getScene
        };
    })();
})(window.CC);
