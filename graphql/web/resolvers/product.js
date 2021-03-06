const { loader } = require('../../../base/dataloader');
const { pagination } = require('../../../utils/pagination');

const resolvers = {
    Query: {
        products: async(parent, args, context, info) => {
            let { first = null, after = 0, before = 0 } = args;
            const tableName = 'products';
            const { total, edges, pageInfo } = await pagination(
                tableName,
                first,
                after,
                before
            );

            const result = {
                total,
                edges,
                pageInfo,
            };
            return result;
        },
    },

    Mutation: {},

    Product: {
        createdAt: (parent) => {
            return parent.created_at;
        },

        updatedAt: (parent) => {
            return parent.updated_at;
        },

        collections: (parent) => {
            return loader().getCollectionProductById.load(parent.collection_id);
        },
    },
};

module.exports = { resolvers };