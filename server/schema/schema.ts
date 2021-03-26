import graphql from 'graphql';

const {GraphQLObjectType, GraphQLString, GraphQLInt,} = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields:() => ({
        fname: {type:GraphQLString},
        lname: {type:GraphQLString}
    })  
})

