const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    if (args.email === "" || args.name === "" || args.password === "")
        throw new Error('Invalid input')
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.db.mutation.createUser({
      data: { ...args, password },
    }, `{id}`)
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
      token,
      user
    }
}
  
async function login(parent, args, context, info) {
    const user = await context.db.query.user({where: {email: args.email}}, `{id password}`)
    if (!user) {
        throw new Error('There is no such user registered on this site.')
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Wrong password; please try again.')
    }
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    return {
        token,
        user
    }
}

function post(parent, args, context, info) {
    const userId = getUserId(context)
    return context.db.mutation.createEntry(
      {
        data: {
            title: args.title,
            description: args.description,
            produce: args.produce,
            rating: args.rating,
            no_reviews: args.no_reviews,
            postedBy: {connect: {id: userId}},
            price_lei: args.price_lei,
            price_bani: args.price_bani,
            per: args.per
        },
      },
      info
    )
}

async function comment(parent, args, context, info) {
    const userId = getUserId(context)
    const entryExists = await context.db.exists.Review({
        postedBy: {id: userId},
        postedOn: {id: args.entryId},
    })
    const isOP = await context.db.exists.Entry({
        id: args.entryId,
        postedBy: {id: userId}
    })
    if (entryExists) {
        throw new Error(`Nu puteți face mai mult de două recenzii pentru același produs.`)
    }
    if (isOP) {
        throw new Error(`Nu puteți face o recenzie pentru produsul dvs.`)
    }

    const entr = await context.db.query.entry({where: {id: args.entryId}}, `{postedBy{id} rating no_reviews}`)
    const user = await context.db.query.user({where: {id: entr.postedBy.id}}, `{rating no_reviews}`)

    const bar = user.no_reviews+1
    const foo = (user.rating*user.no_reviews+args.opinion)/bar
    await context.db.mutation.updateUser({
        data: {
            rating: foo,
            no_reviews: bar
        },
        where: {
            id: entr.postedBy.id
        }
    })
    
    const foobar = entr.no_reviews+1
    const baz = (entr.rating*entr.no_reviews+args.opinion)/foobar
    await context.db.mutation.updateEntry({
        data: {
            rating: baz,
            no_reviews: foobar
        },
        where: {
            id: args.entryId
        }
    })
    
    return context.db.mutation.createReview({
        data: {
            postedBy: {connect: {id: userId}},
            postedOn: {connect: {id: args.entryId}},
            content: args.content,
            no_reviews: 0,
            opinion: args.opinion
        },
    },
    info)
}


async function vote(parent, args, context, info) {
    const userId = getUserId(context)

    const rev = await context.db.query.review({where: {id: args.reviewId}}, `{no_reviews}`)
    if (args.opinion != 1 && args.opinion != -1) throw new Error('nu');
    
    const voteExists = await context.db.exists.Vote({
        postedBy: {id: userId},
        postedOn: {id: args.reviewId},
    })

    if (voteExists) throw new Error(`nu prea`)

    const bar = rev.no_reviews+args.opinion
    context.db.mutation.updateReview({
        data: {
            no_reviews: bar
        },
        where: {
            id: args.reviewId
        }
    })
    return context.db.mutation.createVote({
        data: {
            postedBy: {connect: {id: userId}},
            postedOn: {connect: {id: args.reviewId}},
            opinion: args.opinion
        }
    },
    info) 
}

async function edituser(parent, args, context, info) {
    const userId = getUserId(context)
    var data
    if (args.telephone) {
        if (args.address) {
            if (args.other) {
                data = {
                    telephone: args.telephone,
                    address: args.address,
                    other: args.other
                }
            }
            else {
                data = {
                    telephone: args.telephone,
                    address: args.address
                }
            }
        }
        else {
            if (args.other) {
                data = {
                    telephone: args.telephone,
                    other: args.other
                }
            }
            else {
                data = {
                    telephone: args.telephone,
                }
            }
        } 
    }
    else {
        if (args.address) {
            if (args.other) {
                data = {
                    address: args.address,
                    other: args.other
                }
            }
            else {
                data = {
                    address: args.address
                }
            }
        }
        else {
            if (args.other) {
                data = {
                    other: args.other
                }
            }
            else {
                data = {}
            }
        } 
    }
    return context.db.mutation.updateUser({
        data: data,
        where: {
            id: userId
        }
    },
    info)
}

module.exports = {
    signup,
    login,
    post, 
    comment,
    edituser
}