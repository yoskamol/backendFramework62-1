const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;

// Test commit
router.get("/", (req, res) => {
    res.send({
        status: "login"
    });
});

router.post("/c", (req, res) => {
    var nameVar = req.body.name; // name คือตัวที่พิมลง postman
    var passwordVar = req.body.password; // password พิมค่าลง postman
    MongoClient.connect(
        "mongodb://framework:framework62@ds147096.mlab.com:47096/frameworkdb", {
            useNewUrlParser: true
        },
        function (err, db) {
            let dbo = db.db("frameworkdb");
            let userObj = {
                username: nameVar, // username คือค่า attribute ใน db
                password: passwordVar // password คือค่า attribute ใน db
            };
            dbo.collection("userLoginTable").insertOne(userObj, function (err, result) {
                if (err) throw err;
                res.send({
                    status: "store success",
                    name: nameVar //response
                });
            });
            db.close();
        }
    );
});

router.post("/register", (req, res) => {
    var rankVar = req.body.rank;
    var first_nameVar = req.body.first_name;
    var last_nameVar = req.body.last_name;
    var id_milVar = req.body.id_mil;
    var unit_nameVar = req.body.unit_name;
    var nameVar = req.body.username; // name คือตัวที่พิมลง postman
    var passwordVar = req.body.password; // password พิมค่าลง postman
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
            let userObj = {
                rank: rankVar,
                first_name: first_nameVar,
                last_name: last_nameVar,
                id_mil: id_milVar,
                unit_name: unit_nameVar,
                username: nameVar, // username คือค่า attribute ใน db
                password: passwordVar // password คือค่า attribute ใน db
            };
            dbo.collection("userLoginTable").findOne({
                username: nameVar
            }, function (err, result) {
                if (err) {
                    res.send({
                        status: false
                    });
                }
                console.log(result);

                if (result) {
                    res.send({
                        status: false,
                        message: "มี username นี้แล้ว"
                    });
                } else {
                    dbo.collection("userLoginTable").insertOne(userObj, function (err, result) {
                        if (err) {
                            res.send({
                                status: false
                            });
                        }
                        res.send({
                            status: "store success",
                            name: nameVar //response
                        });
                    });
                }
            });
            db.close();
        }
    );
});

router.post("/login", (req, res) => {
    var nameVar = req.body.username; // name คือตัวที่พิมลง postman
    var passwordVar = req.body.password; // password พิมค่าลง postman
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
            dbo.collection("userLoginTable").findOne({
                username: nameVar,
                password: passwordVar
            }, function (err, result) {
                console.log(result);

                if (err) {
                    res.send({
                        status: false
                    });
                }
                if (result) {
                    res.send({
                        status: true
                    });
                } else {
                    res.send({
                        status: false
                    });
                }
            });
            db.close();
        }
    );
});

module.exports = router;