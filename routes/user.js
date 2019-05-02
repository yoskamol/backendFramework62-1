const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;

router.get("/", (req, res) => {
    res.send({
        status: "user"
    });
});

router.get('/list/:pageNumber', (req, res) => {
    const pageNumber = req.params.pageNumber;
    console.log(pageNumber);

    MongoClient.connect(
        "mongodb+srv://weerayut:22374736@cluster0-4wunc.gcp.mongodb.net/newDatabase62?retryWrites=true", {
            useNewUrlParser: true
        },
        function (err, db) {
            if (err) {
                res.sendStatus(404);
                return;
            }
            let dbo = db.db("newDatabase62");
            dbo
                .collection('userLoginTable')
                .find({}, {
                    limit: 10,
                    skip: 10 * (Number(pageNumber) - 1),
                    projection: {
                        _id: 0,
                        first_name: 1,
                        last_name: 1,
                        username: 1
                    }
                })
                .sort({
                    _id: -1
                })
                .toArray(function (err, result) {
                    if (err) {
                        res.sendStatus(404);
                    } else {
                        res.send(result);
                    }
                    db.close();
                });
        }
    );
});


module.exports = router;