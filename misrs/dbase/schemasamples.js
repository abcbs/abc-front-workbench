var Schema = require('./schema');

var Model=require('./model');


var BlogPost = new Schema({
    title:String,
    id:Number
});

BlogPost.static('findByName', function (blog, callback) {
    console.log('findByName:',blog.title);
    if(callback){
        callback(null,blog);
    }
});

/**
 * Pre hook.
 */

BlogPost.pre('save', function(next, done) {//save
    /* global emailAuthor */
    //emailAuthor(done); // some async function
    console.log("pre save");
    //next(new Error("Error"));
    next();
});

BlogPost.post('save', function(next, done,callback) {//-3
    console.log("post save");
    done();
});

BlogPost.pre('find', function (next) {//
    console.log('查询前检查,');
    //if (this.name !== 'Woody') this.name = 'Woody';
    next();
});

BlogPost.post('find', function(docs) {//
    console.log('查询后检查');

});


BlogPost.statics.findByTitle = function(blog, callback) {
    console.log('findByTitle,',blog.title);
    if(callback){
        blog.id=2;
        callback(blog);
    }
};


BlogPost.methods.expressiveQuery = function(blog, callback) {
    console.log('expressiveQuery,',blog);
    if(callback){
        blog.id=2;
        callback(blog);
    }
};

var createModel = function(name, schema) {
    var schema = BlogPost;
    model = Model.compile(name, BlogPost,this);
    return model;
};
var BlogPostEntity=createModel('BlogPost', BlogPost);

var raw={title:"testeest",id:1};
var Blog = BlogPostEntity (raw);

Blog.save(function(err) {  //存储
    if (err) {
        console.log('save failed',err);
    }else{
        console.log('save success');
    }

});

var q = BlogPostEntity.find({title: {$lt: 'testeest'}});

q.exec(function(err, results) {//exec
    if (err) throw err;

    console.log("q.exec",results);
});

BlogPostEntity.findByName(raw, function (err, blog) {
    console.log('findByName sanpellegrino:',blog);
});

BlogPostEntity.findByTitle(raw,function  get(blog) {
    console.log('People added to db: ',blog);
});

Blog.expressiveQuery(raw, function query(blog){
    console.log('expressiveQuery: ',blog);
});

