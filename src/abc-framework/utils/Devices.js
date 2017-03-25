export function devicePixelRatio() {
    try{
        const isIPhone = window.navigator.appVersion.match(/iphone/gi);
        const clientWidth=document.documentElement.clientWidth;
        const dpr=window.devicePixelRatio;

        return {
                isIPhone:isIPhone,
                clientWidth:clientWidth,
                dpr:dpr
        }
    }catch (err){
        return {
            isIPhone:"no",
            clientWidth:"no"
        };
    }
}

export function fixedDevice() {
       try{
            var win= window;
            var dpr =1, scale =1;
            var isIPhone = win.navigator.appVersion.match(/iphone/gi);
            var devicePixelRatio = win.devicePixelRatio;
            // if (isIPhone) {
            //     // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            //     if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
            //         dpr = 3;
            //     } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
            //         dpr = 2;
            //     } else {
            //         dpr = 1;
            //     }
            // } else {
            //     // 其他设备下，仍旧使用1倍的方案
            //     dpr = devicePixelRatio;
            // }
            scale = 1 / devicePixelRatio;

            //
            var metaEl = "";
            metaEl = window.document.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            metaEl.setAttribute('content', 'initial-scale=' +
                scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
            var header=window.document.getElementsByTagName("head");
            if (header[0]) {
                header[0].appendChild(metaEl);
            }else{
                document.write('<meta name="viewport" content="width=device-width, initial-scale = '
                    +scale+', ' +
                    'maximum-scale = '+scale+', ' +
                    'maximum-scale = '+scale+', target-densitydpi=device-dpi">');
            }
        }catch(err){
                return;
        }
}

export function clientWidth() {

    var client='xs';//屏幕大小480
    try{
         //480   763     Phone/
        //768   1024    pad mini,Small screen / tablet
        //1280  800     Medium screen / desktop
        //1440  900     Large screen / wide desktop
        const width=document.documentElement.clientWidth;
        const isIPhone = window.navigator.appVersion.match(/iphone/gi);
        const ipad= window.navigator.appVersion.match(/ipad/gi);
         //设备像素比
        const devicePixelRatio = window.devicePixelRatio+0;
        if(width<=480){
            client='xs';
        }else if(width>480&&width<=768){
            client='sm'
        }else if(width>768&&width<=1280){
            client='md'
        }else if(width>1280&&width<=1440){
            client='lg'
        }
        return client;
    }catch(err){
        return xs;//手机
    }
}

export function deviceType() {

    var client={xs:1,//480手机
                mobile:1,//是
                sm:"",
                md:"",
                lg:"",
                ipad:""
                }
    try{
        //480   763     Phone/
        //768   1024    pad mini,Small screen / tablet
        //1280  800     Medium screen / desktop
        //1440  900     Large screen / wide desktop
        const width=document.documentElement.clientWidth;
        const isIPhone = window.navigator.appVersion.match(/iphone/gi);
        const ipad= window.navigator.appVersion.match(/ipad/gi);
        //设备像素比
        const devicePixelRatio = window.devicePixelRatio+0;
        //appple-6plus-v
        // @screen-xpv:                     400px;//apple-6plus 竖屏
        // @screen-xpvx:                    420px;//apple-6plus 竖屏
        if(devicePixelRatio===0){
            client.mobile="";
        }
        if(width<=480){
            client.xs='1';
        }else if(width>480&&width<=768){
            client.sm='1'
            client.ipad=''
        }else if(width>768&&width<=1280){
            client.md='1'
            client.ipad='1'

            client.mobile=''
        }else if(width>1280){
            client.lg='1'
            client.mobile=''
            client.ipad=''
        }
        return client;
    }catch(err){
        return client;//手机
    }
}


// var g;
// if (typeof window !== "undefined") {
//
//     g = window;
//     try{
//         if(window){
//             g.addEventListener("onorientationchange" in window ?
//                     "orientationchange" : "resize", clientWidth, false);
//         }
//     }catch (err){
//         console.log("err,",err);
//     }
// } else if (typeof global !== "undefined") {
//     g = global;
// } else if (typeof self !== "undefined") {
//     g = self;
// } else {
//    g = this;
// }

export default function Devices  () {
    try{

    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

    var deviceIsIOSAll=deviceIsIOS||deviceIsIOS4||deviceIsIOSWithBadTarget;
    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
       return  {
           deviceIsWindowsPhone,
           deviceIsAndroid,
           deviceIsIOS,
           deviceIsIOS4,
           deviceIsIOSWithBadTarget,
           deviceIsBlackBerry10,
           deviceIsIOSAll
        }
    }catch(err){
        return  {
            deviceIsWindowsPhone:false,
            deviceIsAndroid:false,
            deviceIsIOS:false,
            deviceIsIOS4:false,
            deviceIsIOSWithBadTarget:false,
            deviceIsBlackBerry10:false,
            deviceIsIOSAll:false
        }
    }
}