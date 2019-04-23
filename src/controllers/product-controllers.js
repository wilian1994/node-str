'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    //trazendo todos os produtos que estão ativo e somente o title, price and slug
    Product
        .find({
            active: true
        }, 'title price slug')
        .then(data => {
            res.status(200).send({data});
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
}

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
}

exports.put =  (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    })
}

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
}

//listando produtos pelo slug
exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug:req.params.slug,
            active: true
        }, 'title price slug tags')
        .then(data => {
            res.status(200).send({data});
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
}