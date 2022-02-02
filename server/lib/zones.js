const express = require('express');
var async = require("async");
const router = express.Router();

const logger = require('../../logs');
//Handle Database
const database = require('./db');

router.post('/getZoneData', async (req,res) => {

    const sql = 'select z.id , z.array_index ,  z.name , z.description, z.mode, z.x1, z.x2, z.y1, z.y2  ' +
    ' from zones z ORDER BY z.array_index ASC';

    try{
        const results = await database.query(sql, []);
        logger.info("Got Zones Variables");
        res.json(results);
    }
    catch(error){
        logger.error("Zones (getZoneData): " + error);
        res.sendStatus(400);
    }
});



module.exports = router;