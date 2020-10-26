const knex = require('../database/connection');

exports.findAllGivenUserId = (userId) => {
    return knex
        .select('*')
        .from('favorite_classes')
        .where('user_id', userId)
        .first();
}

exports.createNewFavorite = (classId, userId) => { 
    return knex('favorite_classes')
        .insert({
            class_id:classId,
            user_id:userId
        }).then((id) => {
            return knex.select('*')
                .from('favorite_classes')
                .where('id', id);
        })
}

exports.find = (classId, userId) => { 
    return knex('favorite_classes')
    .where('user_id',userId)
    .andWhere('class_id',classId)
    .first()
}