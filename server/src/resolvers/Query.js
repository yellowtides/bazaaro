function feed(parent, args, context, info) {
    const where = args.filter? 
    {
        OR: [
            {description_contains: args.filter},
            {produce_contains: args.filter},
            {title_contains: args.filter}
        ],
    }
    : {}
    return context.db.query.entries({where}, info)
}

function listAll(parent, args, context, info) {
    return context.db.query.entries({}, info)    
}

function findentry(parent, args, context, info) {
    const where = args.filter? {id: args.filter} : {}
    return context.db.query.entries({where}, info)
}

function findentrybyuser(parent, args, context, info) {
    const where = args.filter? {postedBy: {id: args.filter}} : {}
    return context.db.query.entries({where}, info)
}

function finduser(parent, args, context, info) {
    const where = args.filter? {id: args.filter} : {}
    return context.db.query.user({where}, info)
}

function loadreviews(parent, args, context, info) {
    const where = args.filter? {postedOn: {id: args.filter}} : {}
    return context.db.query.reviews({where}, info)
}

module.exports = {
  feed, listAll, findentry, finduser, findentrybyuser, loadreviews
}