var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
var data1 = null;
// ==============================================================================================================
// var data = [
//     {"labelAnnotations":
//     [
//         {"mid":String,
//         "description":String,
//         "score":Number,
//         "topicality":Number},
//     "webDetection":
//     {"webEntities":[{"entityId":String,"score":Number,"description":String}],
//     "fullMatchingImages":[{"url":String}],
//     "partialMatchingImages":[{"url":String}],
//     "pagesWithMatchingImages":[{"url":String,
//     "pageTitle":String,
//     "fullMatchingImages":[{"url":String}]}],
//     "visuallySimilarImages":[{"url":String}],
//     "bestGuessLabels":[{"label":String,"languageCode":String}]}}];
// =============================================================================================================
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/detect",function(req,res){
    res.render("index");
});
app.post("/detect",function(reqs,res){
    var img = reqs.body.image;
    const vision = require('node-cloud-vision-api');
    // init with auth
    vision.init({auth:"AIzaSyBVKyNyC14KHJ4YPEPoFBovIkqnPlEfeMI"});
    // construct parameters
    const req = new vision.Request({
        image:new vision.Image({
            url:img
        }),
        features:[
            new vision.Feature("LABEL_DETECTION",10),
            new vision.Feature("WEB_DETECTION",5),
        ]
    });
    // send single request
    vision.annotate(req).then((resp)=>{
        // handling response
        console.log(JSON.stringify(resp.responses))
        var data = resp.responses;
        var element = {};
        element.data = data;
        element.image = reqs.body.image;
        console.log("label 1 = "+data[0]["labelAnnotations"][0]["description"]);
        res.render("show",{element:element});
    }, (e) => {
        console.log('Error: ',e)
    });
    // console.log("label 1 = "+data[0]["labelAnnotations"][0]["description"]);
    
});
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("DIRUS is started");
});
// app.listen(8000,function(){
//     console.log("DIRUS v6.0 started");
//   });