var Schema = require('./schema');

var Model=require('./model');


var BlogPost = new Schema(
    {
        name: "BlogPost",
        obj: {
            title: String,
            id: Number
        }
    });

// var BlogPostCommon = new Schema({
//     name: "BlogPost",
//     obj: {
//         title: String,
//         id: Number
//     }
// });
/**
 * Pre hook.
 */

BlogPost.pre('save', function(next, done) {//simple-pre-save

    console.log("pre save");
    //console.log("arguments,\n",arguments);
    //next(new Error("Error"));
    next();
});

BlogPost.post('save', function(data, done) {//simple-post-save
    console.log("hooks post save,");
    //console.log("arguments,\n",arguments);
    done();
});

BlogPost.post('save', function(data, done) {//simple-post-save-with-error
    console.log("kareem post save,");
    done();
});

var createModel = function(name, schema) {
    var schema = BlogPost;
    model = Model.compile(name, BlogPost,this);
    return model;
};



var BlogPostEntity=Model.createModel('BlogPost', BlogPost);

var raw={title:"testeest",id:1};
var Blog = BlogPostEntity (raw);
//function wrappedPointCut() {//执行hooks的方法
Blog.save(function(err,data,result) {  //存储
    if (err) {
        console.log('save failed',err);
    }else{
        console.log('save success,',result);
    }
    throw new Error("Error")

});
