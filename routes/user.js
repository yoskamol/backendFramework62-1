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
    let itemPerPage = 10;
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
                    limit: itemPerPage,
                    skip: itemPerPage * (Number(pageNumber) - 1),
                    projection: {
                        _id: 1,
                        rank: 1,
                        first_name: 1,
                        last_name: 1,
                        id_mil: 1,
                        unit_name: 1,
                        username: 1

                    }
                })
                .sort({
                    _id: -1,
                    rank: -1,
                    first_name: -1,
                    last_name: -1,
                    id_mil: -1,
                    unit_name: -1,
                    username: -1

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
router.get('/list-count', (req, res) => {
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
                .find({})
                .count(function (err, result) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(404);
                    }
                    if (result) {
                        res.send({
                            total_item: result
                        });
                    } else {
                        res.sendStatus(404);
                    }
                    db.close();
                });
        }
    );
});

module.exports = router;