const express = require('express');
const pool = require('../_db');
const util = require('util');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();

getAllElements = () =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM users ',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};



function selectFromUsersByUsername() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const randomValue = Math.random();
            const error = randomValue > .8 ? true : false;

            if (error) {
                reject(new Error('Ooops, something broke!'));
            } else {
                resolve(randomValue);
            }
        }, 2000);
    });
}


router.get('/fun', async (req,res,next) => {
    try {
        const resultElements = await getAllElements();
        res.status(200).json({elements: resultElements}); // send a json response
    } catch(e) {
        console.log(e); // console log the error so we can see it in the console
        res.sendStatus(500);
    }
});


router.get('/', (req, res) => {
    const sql = 'SELECT * FROM customer';
    pool.query(sql, function(error,data,fields) {
        if (error) throw error;
        res.render('nav', customer = data)
            });
});


router.post('/login',
    [
        body('username')
            .not().isEmpty()
            .withMessage('Please enter username'),
        body('password')
            .not().isEmpty()
            .withMessage('Please enter password'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        console.log(req.body);

        if(!errors.isEmpty()){
            return res.status(422).jsonp(errors.array());
        } else {
           // res.send({})
            const user = req.body.username; //req.body.username;
            const password = req.body.password;
            //const hash = generatePassword(password);
            const sql = 'SELECT password_hashed from users where username=?';

            db.query(sql,[user],function(err,result,fields) {
                if (err) throw err;
                console.log(hash)
                res.send({result});
            });
        }
    });

router.post('/register',
    [
        body('username').not().isEmpty().withMessage('Please enter username'),
        body('email').not().isEmpty().isEmail().normalizeEmail().withMessage('Please enter proper email'),
        body('password').isLength({min:8}).withMessage('password at least 8 char long'),
        body('passwordConfirm','Passwords do not match')
            .custom((value , {req}) => (value === req.body.password))
    ],
    (req, res) => {
        const errors = validationResult(req);
        let error = [];
        var username = req.body.username;

        errors.array().forEach(e => error.push(e.msg));
        const sql = 'SELECT * from users where username = ?';
        // (async () => {
        //     try {
        //         const rows = await query('select * from users where username =?;',[username]);
        //         if(rows.length > 0)
        //             error.push('username already exists!');
        //         if(error.length > 0) {
        //             return res.status(422).jsonp(error);
        //         }
        //             console.log(rows);
        //     } finally {
        //         db.end();
        //     }
        // })()

        if(!errors.isEmpty()){
            return res.status(422).jsonp(errors.array());
        } else {
            var password = req.body.password;
            var username = req.body.username;
            var email = req.body.email;
            const hash = bcrypt.hashSync(password,10);
            let errors = [];

            // db.query('SELECT * FROM users where username=?',username,function(err,res){
            //     if (err) throw err;
            //     if (res.length > 0) {
            //         errors.push({msg: 'username exists'})
            //     }
            // });


            // const sql = 'Insert into users (username,email,password_hashed) values (?,?,?)';
            // db.query(sql,[username,email,hash],function(err,res){
            //     if(err) throw err;
            //     console.log(res);
            // })

            res.send({});
        }
    });



module.exports = router;