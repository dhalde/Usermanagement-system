const express = require('express');
const router = new express.Router();
const userDetail = require('../model/management');
const axios = require('axios');


router.get('/', (req, res) => {
    //Make a get request to api/user
    axios.get('http://localhost:3000/api/users')
        .then((response) => {

            res.render('index', { users: response.data });

        }).catch((err) => {
            res.send(err);
        })
});

router.get('/add-user', (req, res) => {
    res.render('add_user');
});

router.get('/update-user', (req, res) => {
    // console.log(id);
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function (userdata) {
            res.render('update_user', { user: userdata.data })
            console.log(userdata.data);
        }).catch((err) => {
            res.send(err);
        })
});


//API

router.post('/api/users', async (req, res) => {
    try {
        const user = new userDetail(req.body);
        const createUser = await user.save();
        // res.status(201).send(createUser);
        res.redirect('/add-user');

    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get('/api/users', (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        userDetail.findById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id" + id });
                }
                else {
                    res.send(data);
                }
            }).catch((err) => {
                res.status(500).send({ message: "error retriving user with id" + id });
            })
    }
    else {
        userDetail.find()
            .then((user) => {
                res.send(user);
            }).catch((err) => {
                res.status(500).send({ message: err.message || "Error occured while retriving user informatio" });
            })
    }
});

// router.get('/api/users/:id', async (req, res) => {

//     try {
//         const id = req.params.id;
//         const oneData = await userDetail.findById(id);
//         console.log(oneData);
//         res.status(500).send(oneData);

//     } catch (e) {
//         res.send(e);
//     }
// });

router.put('/api/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const updateData = await userDetail.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.send(updateData);

    } catch (e) {
        console.log(e);
        res.status(404).send(e);

    }
});

router.delete('/api/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dataDel = await userDetail.findByIdAndDelete(id);
        if (!id) {
            return res.status(400).send({
                message: `cannot delete with id ${id}. Maybe id is wrong`
            });
        }
        res.send({
            message: "User was deleted Successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "Could not delete User "
        })
    }


})



module.exports = router;