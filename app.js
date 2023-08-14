const bodyParser = require("body-parser");
const express=require("express");
const app=express();
const _=require("lodash");
const mongoose=require("mongoose");
// mongoose.connect("mongodb://localhost:27017/blogDb", {useNewUrlParser:true});
const DB='mongodb+srv://shiwamsinha10:uTK5bz6ULSesKvNR@cluster0.lqkv4us.mongodb.net/blogmyfirstbacend?retryWrites=true&w=majority';
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect(DB).then(()=>{
    console.log('ok');
}).catch((err)=>{
    console.log('err');
})
let posts=[];
const homeData="lorem epsummmmmmmmnoded";
const my_about="I am a final year student in India's Top Nits in the north region named National Institute Of Technology, Jalandhar, Punjab.I am very passionate about the software Fields."
const me_contact="You can contact me at my Instagaram account and on mobile phone"
//schema Reday karo
// const postSchema=mongoose.Schema({
//     title:String,
//     contents:String
// });
// const Post=mongoose.model("Post", postSchema);
app.get("/", function(req, res){
//     Post.find({}, function(err, posts){
//         res.render("home", {
//         para_1:homeData,
//         posts:posts
//     })
// });
    res.render("home", {
        para_1:homeData,
        posts:posts
    });
});

app.get("/compose", function(req, res){
    res.render("compose");
});
app.post('/compose', function(req, res){
    
    const post=({
        title:req.body.text_1,
        contents:req.body.text_2
    });
    posts.push(post);

    // post.save(function(err){
    //     if(!err){
    //     res.redirect("/");
    //     }
    // });
    res.redirect("/");
});

app.get("/posts/:topic", function(req, res){
    var requiredTitle=_.lowerCase(req.params.topic);
    posts.forEach(function(post){
        var matchingTitle=_.lowerCase(post.title);
        if(requiredTitle===matchingTitle){
           res.render("post", {
            title:post.title,
            paragraph:post.contents
           });
        }
    });
});
app.get("/about", function(req, res){
    res.render("about", {
        about_content:my_about
    });
});
app.get("/contact", function(req, res){
    res.render("contact", {
        contact:me_contact
    });
});
 app.listen(3007, function(){
    console.log("hey it is working");

});