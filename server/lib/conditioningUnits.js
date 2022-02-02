const express = require('express');
var async = require("async");
const router = express.Router();

const logger = require('../../logs');
//Handle Database
const database = require('./db');

router.post('/getCondUnitData', async (req,res) => {

    const sql = 'select cu.id , cu.array_index, cut.type , cu.type AS type_id, cu.description ' +
    ' from conditioning_units cu  ' + 
    ' LEFT JOIN conditioning_units_types cut ON cu.type = cut.id ORDER BY cu.id ';

    try{
        const results = await database.query(sql, []);
        logger.info("Got CondUnit Variables");
        res.json(results);
    }
    catch(error){
        logger.error("CondUnit (getCondUnitData): " + error);
        res.sendStatus(400);
    }
});

// router.post('/setCondUnitVariables', async (req,res) => {
//     var switchVariables;
//     if(req.body){
//         switchVariables = req.body.switchVariables;
//     }

//     const sql = 'UPDATE switch_variables SET value= ? WHERE tag = ? ';

//     async.forEachOf(switchVariables, async (setting, i, callback) => {
//         //will automatically call callback after successful execution
//         try{
//             const results = await database.query(sql, [setting.value, setting.tag]);
//             return;
//         }
//         catch(error){     
//             //callback(error);         
//             throw error;                 
//         }
//     }, err=> {
//         if(err){
//             logger.error(`CondUnit (setCondUnitVariables):  ` + err);
//             res.sendStatus(400);
//         }else{
//             logger.info(`setCondUnitVariables success`);
//             res.sendStatus(200);
//         }
//     })
// });

module.exports = router;