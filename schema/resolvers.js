const { UserList, MovieList } = require("../db/FakeData")
const _ = require('lodash')
const resolvers = {
    Query: {
        // USER RESOLVERS
        users:() => {

            return UserList
        },
        user: (parent, args, context) => {
            const id = args.id
            const userId = parseInt(id)
            // console.log(id)
            const user = UserList.find((u) => u.id === userId)
            // console.log(user)
            return user
        },


        // MOVIE RESOLVERS
        movies: () => {
            return MovieList
        },
        movie: (parent, {name}) => {
            return MovieList.find(movie => movie.name === name)
        },
    },
    User: {
        favoriteMovies: () => {
            return MovieList.filter(movie => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010)
        }
    },
    Mutation: {
        createUser: (parent, args, context) => {
            const user = args.input
            const lastId = UserList[UserList.length-1].id
            user.id = lastId + 1
            UserList.push(user)
            return user
        },
        updateUsername: (parent, args) => {
            // const id = args.input.id
            // const newUsername = args.input.newUsername
            const {id, newUsername} = args.input
            let userUpdated
            UserList.forEach((user) => {
                if(user.id === Number(id)){
                    user.username = newUsername
                    userUpdated = user
                }
            })
            return userUpdated

        },
        deleteUser: (parents, args) => {
            const id = args.id  
            _.remove(UserList, (user) => user.id === Number(id))
        //    UserList.filter(user => user.id !== Number(id))
            // console.log(UserList)
            return null
        }
    }
}

module.exports = { resolvers }