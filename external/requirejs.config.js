requirejs.config({
    baseUrl: "../",
    "paths": {
        "baseframevendor": "dist/baseframevendor",
        "react": "dist/reactvendor",
        "react-bootstrap": "dist/bootvendor",
        "redux": "dist/reduxvendor",
        "app": "/build/app",
         "jquery": "/external/jquery/jquery.min",
        "materialuivendor":"dist/materialuivendor",
        "envdevlop":"dist/envdevlop",
        "q":"/external/qbase/q",
        "jquerymobile": "/external/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min",
        // "home": "/build/home",
    },
    waitSeconds:60,
    "shim": {
        // "app": [ "react-bootstrap" ],
        "react-bootstrap": [ "react" ],
        "redux":[ "react" ],
        "materialuivendor":[ "react" ],

    }
});


// (function clientWidth() {
//     try{
//         var dpr =1, scale =1;
//         var isIPhone = window.navigator.appVersion.match(/iphone/gi);
//         var isIpdad = window.navigator.appVersion.match(/ipad/gi);
//         //设备像素比
//         var devicePixelRatio = window.devicePixelRatio+0;
//         var clientWidth=document.documentElement.clientWidth+0;
//         var clientHight=document.documentElement.clientHeight +0;
//         alert("clientWidth:"+clientWidth+" clientHight: "+clientHight+
//             " devicePixelRatio: "+devicePixelRatio+
//             " isIPhone:"+isIPhone+" isIpdad:"+isIpdad)
//
//
//     }catch(err){
//         return;
//     }
// })();

// (function fixedDevice() {
//     try{
//         var dpr =1, scale =1;
//         var isIPhone = window.navigator.appVersion.match(/iphone/gi);
//         var isIpdad = window.navigator.appVersion.match(/ipad/gi);
//         var devicePixelRatio = window.devicePixelRatio+0;
//         var clientWidth=document.documentElement.clientWidth+0;
//         var clientHight=document.documentElement.clientHeight +0;
//         alert("clientWidth:"+clientWidth+" clientHight: "+clientHight+
//             " devicePixelRatio: "+devicePixelRatio+
//             " isIPhone:"+isIPhone+" isIpdad:"+isIpdad)
//         对iPhone4修改
//         devicePixelRatio===1.5
//         var fixed=isIPhone&&clientWidth===320&&clientHight<400;//||devicePixelRatio===1.5
//
//         if(fixed){
//
//             scale = 0.7;
//
//
//             var metaEl = "";
//             metaEl = window.document.createElement('meta');
//             metaEl.setAttribute('name', 'viewport');
//             metaEl.setAttribute('content', 'width=device-width, initial-scale=' +
//                 scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
//             var header=window.document.getElementsByTagName("head");
//             if (header[0]) {
//                 header[0].appendChild(metaEl);
//             }else{
//                 document.write('<meta name="viewport" content="width=device-width, initial-scale = '
//                     +scale+', ' +
//                     'maximum-scale = '+scale+', ' +
//                     'maximum-scale = '+scale+', target-densitydpi=device-dpi">');
//             }
//         }
//
//     }catch(err){
//         return;
//     }
// })()
(function () {
    // document.write(' <img id="imageHome" class="imageHome" src="/external/images/conver.jpg"/>');

})();
require(["baseframevendor"],function (baseframevendor) {
    // try{
    //     document.getElementById("imageHome").remove();
    //     document.getElementById("spinner").remove();
    // }catch(e){
    //     console.log("Loading app error.")
    // }
    require( ["react","redux"],function (react,redux){
        console.log("react redux");
        console.log("app bootstrap..");
        try{
            require(["app"] ,function(app){
                console.log("app loading..");
                // document.getElementById("imageHome").remove();
                $(".imageHome").remove();
                $(".pos").remove();
                // $(".imageHome").remove();
            })
        }catch(e){
            console.log("Loading app error.")
        }
    });

    // require( ["react","redux","react-bootstrap"],function (react,redux,bootstrap){
    //     console.log("react redux");
    //     console.log("app bootstrap..");
    //     try{
    //         require(["app"] ,function(app){
    //             console.log("app loading..");
    //             // document.getElementById("imageHome").remove();
    //             $(".imageHome").remove();
    //             $(".pos").remove();
    //             // $(".imageHome").remove();
    //         })
    //     }catch(e){
    //         console.log("Loading app error.")
    //     }
    // });
    // require( ['react-bootstrap'],function (bootstrap){
    //     console.log("app bootstrap..");
    //     try{
    //         require(["app"] ,function(app){
    //             console.log("app loading..");
    //             //$(".pos").remove();
    //         })
    //     }catch(e){
    //         console.log("Loading app error.")
    //     }
    // });
    require( ["jquery"],function ($){
        console.log("jquery...");
    });

    // require( ["jquerymobile"],function (jquerymobile){
    //     console.log("jquerymobile...");
    // });

});


