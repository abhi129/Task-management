const express = require("express")
const app = express()
const http = require("http").createServer(app)
const port = process.env.port || 3000;

const mongoClient = require("mongodb").MongoClient
const sharp = require('sharp')

const formidalbe = require("express-formidable")

app.use(formidalbe({
    multiples: true
}))
	
app.set("view engine", "ejs")
const fileSystem = require("fs")

app.use("/uploads", express.static(__dirname + "/uploads"))

function callbackFileUpload(images, index, savedPaths = [], success = null) {
    const self = this

    if (images.length > index) {
        fileSystem.readFile(images[index].path, function (error, data) {
            if (error) {
                console.error(error)
                return
            }

            const filePath = "uploads/" + new Date().getTime() + "-" + images[index].name

            fileSystem.writeFile(filePath, data, async function () {
                if (error) {
                    console.error(error)
                    return
                }

                savedPaths.push(filePath)

                if (index == (images.length - 1)) {
                    success(savedPaths)
                } else {
                    callbackFileUpload(images, index, savedPaths, success)
                }         
            })

            fileSystem.unlink(images[index].path, function(error) {
                if (error) {
                    console.error(error)
                    return
                }
            })
        })
    } else {
        success(savedPaths)
    }
}

http.listen(port, function () {
    console.log("Server is started at port" + port);

    mongoClient.connect("mongodb://127.0.0.1:27017", async function (error, client) {
        if (error) {
            console.error(error);
            return;
        }

        const db = client.db("prog_images")
        console.log("Database is connected");

        //This endpoint is used to upload the multiple images
        app.post("/uploadImages", async function (request, result) {
            const images = []
            if (Array.isArray(request.files.images)) {
                for (let a = 0; a < request.files.images.length; a++) {
                    images.push(request.files.images[a])
                }
            } else {
                images.push(request.files.images)
            }

            callbackFileUpload(images, 0, [], async function (savedPaths){
                await db.collection("images").insertOne({
                    images: savedPaths
                })

                await db.collection("images").insertOne({
                    images: savedPaths
                })

                result.send("Images has been uploaded" + "And saved images are" + savedPaths);
            })
        })

        app.get("/", async function (request, result) {
            console.log(request)
            let outputImages = []
            if (request.fields.imagePath != undefined) {
                const images = await db.collection("images").find({images:{"$in": [request.fields.imagePath]}}).toArray()
                console.log(images)

                for (let j = 0; j < images.length; j++) {
                    for (let i = 0; i < images[j]['images'].length; i++) {
                        let image = images[j]['images'][i].split(".");
                        console.log(image)
                        let extension = image[image.length - 1];
                        console.log(extension)
                        //No format is given
                        if (request.fields.fileType == undefined) {
                            outputImages.push(images[j]['images'][i])
                            continue;
                        }
                        console.log(request.fields.fileType)
                        if (extension !== request.fields.fileType) { 
                            //Change the format 
                            sharp(images[j]['images'][i])
                            .rotate()
                            .toFile(image + "." + request.fields.fileType, (err, info) => {
                                if (err) {
                                    console.error(err)
                                }
                            })
                            outputImages.push(image + "." + request.fields.fileType)
                        } else {
                            //Do not change the format
                            outputImages.push(images[j]['images'][i])
                        }
                    }
                }
                console.log(outputImages)
                result.send(outputImages)                
            } else {
                result.render("home")
            }
        })
    })
})