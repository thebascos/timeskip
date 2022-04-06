const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	path = require("path"),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	flash = require('connect-flash');

    app.set("port", process.env.PORT || 3000);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname + "/public")));
    app.use(flash());
    app.use(methodOverride("_method"));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
        app.get('/', function (req, res) {
            const name = 'Princh';
            res.render('index',{name})
        })
let port = app.get("port");
let server = app.listen(port, function () {
	console.log("Logbook running on port", port);
});
    