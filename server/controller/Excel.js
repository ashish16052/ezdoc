const express = require("express");
const multer = require('multer')
const mainRouter = express.Router();
const parser = require('simple-excel-to-json')

const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

const upload = multer({ storage: storage });

module.exports.controllerFunction = function (app) {

    mainRouter.post('/upload', upload.single('file'), (req, res) => {
        var doc = parser.parseXls2Json(req.file.path);
        console.log(doc[0][0]);
        const numArray = doc[0].map(a => a[req.body.column]);
        const freq = {}
        for (let i = 0; i < numArray.length; i++) {
            freq[numArray[i]] = (freq[numArray[i]] || 0) + 1;
        };
        // const unique = Object.values(freq).filter((item, i, ar) => ar.indexOf(item) === i);
        res.status(200).json({ chartData: Object.values(freq), chartLabel: Object.keys(freq) })
    })

    app.use("/excel", mainRouter);
};
