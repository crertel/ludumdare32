(function(CC){
    "use strict";
    
    CC.cache = (function(){
    var spriteCache = Object.create(null);
    var soundCache = Object.create(null);

    function fetchFileAsync( path, onSuccess ) {
        var r = new XMLHttpRequest();
        r.open("GET", path, true);
        r.responseType = "blob";
        r.onreadystatechange = function () {
            if (r.readyState !== 4 || r.status !== 200) {
                return;
            }

            onSuccess(r.response);
        };
        r.send();
    }

    function addSprite( name, path ) {
        spriteCache[name] = null;
        fetchFileAsync(path, function(blob){
            var img = new Image();
            img.src = window.URL.createObjectURL( blob);
            spriteCache[name] = img;
        });
    }

    function addSound( name, path ) {
        spriteCache[name] = null;
        fetchFileAsync(path, function(blob){
            // TODOTODO
            // load sound
            soundCache[name] = blob;
        });
    }

    function getSprite( name ){ 
        return spriteCache[name];
    }

    function getSound( name ) {
        return soundCache[name];
    }

    return {
        addSprite: addSprite,
        getSprite: getSprite,
        addSound: addSound,
        getSound: getSound
    };
    })();
})(window.CC);
