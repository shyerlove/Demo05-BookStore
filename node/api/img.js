const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/img', (req, res) => {
    const { i } = req.query;
    const type = i.slice(i.indexOf('.') + 1);
    const p = path.dirname(__dirname) + '\\public\\images\\' + i;
    fs.readFile(p, (err, data) => {
        if (err) {
            return res.json({
                code: 404,
            });
        }
        res.header('Content-Type', `image/${type}`);
        res.send(data);
    });
})

module.exports = router;
