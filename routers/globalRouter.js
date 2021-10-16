const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res)=> {
    const selectQuery = `
    SELECT	name,
            size,
            price,
            createdAt
      FROM  drinks;     
    `;
    try {
        db.query(selectQuery, (err, drinks) => {
            res.render("screens/home", {drinks});
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
});

router.get("/create", (req, res) => {
    res.render("screens/create")
});

router.post("/createpost", (req, res) => {
    //console.log(req.body.name);
    //console.log(req.body.size);
    //console.log(req.body.price);
;    const insertQuery = `
        INSERT	INTO drinks (
            name,
            size,
            price,
            createdAt
        ) VALUES (
            "${req.body.name}",
            "${req.body.size}",
            ${req.body.price},
            now()
        )
        `;

    try {
        db.query(insertQuery, (error, drinks) => {
            if(error) {
                console.log(error);
            }

            res.redirect("/");
        });
    } catch (error) {
        console.error(error);
        res.redirect("/create");
    }
})

module.exports = router;