import  {start,end,add_many,mul_many,
    multicastCollection,multicastPrint,
    descriptorCollection,deprecateSimpleMyClass,
    decoratorParamMyClass,decoratorMult,
    promisifySimple,decoratorPromisify,
    decoratorReadonly,decoratorClassPromisify,
    decoratorClassPromisifyWithWrapper,
    decorateArmour,readWithGen,asyncFS,
    genFS,thunkifyFS,thunkifyRunFS,runFetch
} from '../../misrs'
module.exports = function(gulp, plugins) {
    function getData(error,data) {
        if(error){
            console.log("error->",error);
        }else{
            console.log(data);
        };
    }
    return function(done) {

        start();
        end();
        /*
        var add=add_many(2,4);
        var mul=mul_many(2,4);
        var mult=multicastCollection(['1','2','3']);
        mult.loggerPrint();
        console.log("mult over");
        function myPrint(item) {
            console.log("myItem is->",item)
        }
        let mPrint=multicastPrint(myPrint);
        mPrint(['4','5','6','7','8','9']);

        console.log("mPrint over");
        let mult =descriptorCollection('11','12','13');
        mult.loggerPrint();
        mult=descriptorCollection(['14','15','16']);
        mult.loggerPrint();

        console.log("descriptorCollection over");
        let simpleMyClass=deprecateSimpleMyClass();
        simpleMyClass.old_method();

        console.log("deprecateSimpleMyClass over");
        let simpleParamMyClass=decoratorParamMyClass();
        simpleParamMyClass.new_method();
        simpleParamMyClass.old_method();

        console.log("decoratorMult over");
        let decoratorSimpleMult=decoratorMult([1,2,3]);
        decoratorSimpleMult.loggerPrint();

        let data=promisifySimple("http://web.jobbole.com/84247/");
        data.then(function(data){
            console.log(data);
        });

        console.log("promisifySimple over");
        let data=decoratorPromisify("http://web.jobbole.com/84247/");
        data.then(function(data){
            console.log(data);
        }).catch(function (err) {
            console.log(err);
        });

        console.log("decoratorPromisify over");
        let foo=decoratorReadonly();
        foo.bar();
        //foo.bar = 2;    //Error
        foo.bar();

        console.log("decoratorReadonly over");
        let decoratorClassData=decoratorClassPromisify("http://web.jobbole.com/84247/");

        decoratorClassData.then(function(data){
            console.log(data);
        });

        console.log("decoratorClassPromisifyWithWrapper over");
        let decoratorClassWrappData=decoratorClassPromisifyWithWrapper("http://web.jobbole.com/84247/");

        decoratorClassWrappData.then(function(data){
            console.log(data);
        });

        decorateArmour();
        readWithGen(getData);


        console.log("readWithGen over");
        asyncFS(getData);

         genFS(getData);
         thunkifyFS(getData);

         genFS(getData);
         thunkifyRunFS(getData)
         **/
        console.log("genFS over");
        runFetch(getData)
;
        console.log("all over");

    };
};