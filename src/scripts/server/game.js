(function () {
    "use strict";

    self.CS = self.CS || {};

    (function(CS){

        CS.game = (function(){

            function init() {
                console.log("Initialized game.");
                console.log(CD);
            }

            function getScene() {
                return {};
            }            

            return {
                init: init,
                getScene: getScene
            };
        })();
    })(self.CS);
})(self);
