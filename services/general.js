const logger = require('../log');
const constants = require('../common/constants');
const to = require('../common/to');
const mongoose = require('mongoose');

module.exports = {
    findItemsByProjectId: (Model, projectId, populatedOptions, sortOptions) => {
        return new Promise(async (resolve, reject) => {
            let err, items;
            [err, items] = await to(Model.find({ active: true, projectId })
            .populate(populatedOptions)
            .sort({'created': sortOptions}));
            if (err) {
                logger.error(err);
                reject(constants.ERROR_WHEN_QUERY_DB);
            }
            resolve(items);
        });
    },

    findItemById: (Model, _id, populatedOptions, sortOptions) => {
        // should add projectId?
        return new Promise(async (resolve, reject) => {
            let err, item;
            [err, item] = populatedOptions != null ? 
            await to(Model.findOne({ active: true, _id }).populate(populatedOptions).sort({'created': sortOptions})) : 
            await to(Model.findOne({ active: true, _id }).sort({'created': sortOptions}));
            if (err) {
                logger.error(err);
                reject(constants.ERROR_WHEN_QUERY_DB);
            }
            resolve(item);
        });
    },

    findAllById: (Model, _id) => {
        return new Promise(async (resolve, reject) => {
            let err, items;
            [err, items] = await to(Model.find({_id}));
            if (err) {
                logger.error(err);
                reject(constants.ERROR_WHEN_QUERY_DB);
            } else {
                resolve(items);
            }
        });
    },

    findAll: (Model, selected) => {
        return new Promise(async (resolve, reject) => {
            let err, items;
            [err, items] = await to(Model.find({}).select(selected));
            if (err) {
                logger.error(err);
                reject(constants.ERROR_WHEN_QUERY_DB);
            }
            resolve(items);
        });
    },
    
    // Example: ObjectFind {_id: '123321312321321'}, ObjectToUpdate {'updateName': 'updateValue'}
    findOneAndUpdateFields: (Model, ObjectFind, ObjectToUpdate) => {
        return new Promise(async (resolve, reject) => {
            let err, item;
            [err, item] = await to(Model.findOneAndUpdate(ObjectFind, ObjectToUpdate, {new: true}));
            if (err) {
                logger.error(err);
                reject(constants.ERROR_WHEN_QUERY_DB);
            }
            resolve(item);
        });
    },

    create: (Model, newObj) => {
        return new Promise(async (resolve, reject) => {
            let err, item;
            [err, item] = await to(Model.create(newObj));
            if (err) {
                logger.error(err);
                reject(constants.ERROR_WHEN_INSERT_DB);
            }
            resolve(item);
        });
    },

    createOrUpdate: (Model, newObj) => {
        return new Promise(async (resolve, reject) => {
            var _id = newObj._id != null ? newObj._id: mongoose.Types.ObjectId();

            let err, item;
            [err, item] = await to(Model.update({_id}, newObj, {upsert: true, setDefaultsOnInsert: true}));
            if (err) {
                logger.error(err);
                reject(constants.ERROR_WHEN_INSERT_DB);
            }

            console.log("---------------------");
            console.log(JSON.stringify(item));

            resolve(item);
        });
    },

    delete: (Model, id) => {
        return new Promise(async (resolve, reject) => {
            let err, item;
            [err] = await to(Model.findByIdAndUpdate(id, { active: false }));
            if (err) {
                logger.error(err);
                reject(err);
            }
            resolve(item);
        });
    },

    findItemAndUpdateField: async (Model, id, update) => {

        try {
            var item = await (Model.findOneAndUpdate({ active: true, _id: id }, update));
            
            return item;
        }
        catch (err) {
            console.log(err)
            return constants.ERROR_WHEN_QUERY_DB;
        }


    }
}