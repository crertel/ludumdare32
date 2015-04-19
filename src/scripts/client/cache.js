(function(CC){
    "use strict";
    
    CC.cache = (function(){
    var imageCache = Object.create(null);
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

    function addImage( name, path, success ) {
        imageCache[name] = null;
        fetchFileAsync(path, function(blob){
            var img = new Image();
            img.src = window.URL.createObjectURL( blob);
            imageCache[name] = img;
            success();
        });
    }

    function addSound( name, path, success) {
        soundCache[name] = null;
        fetchFileAsync(path, function(blob){
            // TODOTODO
            // load sound
            soundCache[name] = blob;
            success();
        });
    }

    function getImage( name ){ 
        return imageCache[name];
    }

    function getSound( name ) {
        return soundCache[name];
    }

    return {
        addImage: addImage,
        getImage: getImage,
        addSound: addSound,
        getSound: getSound,
    };
    })();
})(window.CC);
