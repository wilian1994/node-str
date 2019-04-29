'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    //trazendo todos os produtos que estão ativo e somente o title, price and slug

    const res = await Product.find({
        active: true
    }, 'title price slug');
    return res;
    
    /* return Product
        .find({
            active: true
        }, 'title price slug'); */
}

exports.getBySlug = (slug) => {
    return Product
    .findOne({
        slug: slug,
        active: true
    }, 'title price slug tags');
}

exports.getById = (id) => {
    return Product
    .findById(id);
}

exports.getByTag = (tag) => {
    return Product
    .findOne({
        tag: tag,
        active: true
    }, 'title price slug tags');
}

exports.create = (data) => {
    var product = new Product(data);
    return product.save()
}

exports.update = (id, data) => {
    return Product
    .findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.delete = (id) => {
    return Product.findOneAndRemove(id)
}