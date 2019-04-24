'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

//Importando a classe de validação
const ValidationContract =  require('../validators/validator');

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

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

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
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        }).then(x => {
            res.status(201).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            })
        })
}

exports.delete = (req, res, next) => {
    Product
    .findOneAndRemove(req.params.id)
    .then(x => {
        res.status(201).send({
            message: 'Produto removido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover produto',
            data: e
        })
    })
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

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send({data});
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
}

exports.getByTag = (req, res, next) => {
    Product
        .find({
            tag:req.params.tag,
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