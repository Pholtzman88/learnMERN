const Comment = require("../models/Comment");

module.exports =  {
    findAll: function(req, res) {

        Comment
            .find({})
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

    },
    create: function(req, res){

        Comment
            .create({
            "message": JSON.parse(req.body).message,
            "date": Date.now()
            })
            .then( dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

    },
    update: function(req, res){

        Comment
            .findOneAndUpdate({_id: req.params.id}, {message: req.body})
            .then( dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

    },
    destroy: function(req, res){

        Comment
            .deleteOne({_id: req.params.id}, function(err, res){
            if (err) return console.log(err);
            return res
        })

    }
};