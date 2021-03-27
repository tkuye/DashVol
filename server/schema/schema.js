"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require("graphql");
const pg = require("pg");
const dotenv = require("dotenv");
const Query = require("./queries/query");
const { Pool } = pg;
dotenv.config();
// Using a concurrent pool of clients
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema, GraphQLID } = graphql;
const UserInterface = {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    user_fname: { type: GraphQLString },
    user_lname: { type: GraphQLString },
};
// Type created to pool user data 
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        user_id: { type: GraphQLInt },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        user_fname: { type: GraphQLString },
        user_lname: { type: GraphQLString },
        volunteerplaces: {
            type: new GraphQLList(VolunteerType),
            resolve(parent, args) {
                return pool.connect().then(client => {
                    return client.query(Query.SelectMyVolPlaces, [parent.user_id]).then(res => {
                        return res.rows;
                    });
                });
            }
        },
        volunteerhours: {
            type: new GraphQLList(VolunteerHourType),
            args: { vol_id: { type: GraphQLID } },
            resolve(parent, args) {
                return pool.connect().then(client => {
                    return client.query(Query.SelectVolHours, [parent.user_id, args.vol_id]).then(res => {
                        console.log(res.rows);
                        return res.rows;
                    });
                });
            }
        },
        hours: { type: GraphQLInt,
            resolve(parent, args) {
                return pool.connect().then(client => {
                    return client.query(Query.SelectHoursTotal, [parent.user_id]).then(res => res.rows[0].hours);
                });
            } }
    })
});
// Type created to receive volunteer data 
const VolunteerType = new GraphQLObjectType({
    name: 'VolunteerPlace',
    fields: () => ({
        vol_id: { type: GraphQLID },
        vol_name: { type: GraphQLString },
        vol_desc: { type: GraphQLString },
        vol_website: { type: GraphQLString }
    })
});
// Type to receive Data from volunteering hours
const VolunteerHourType = new GraphQLObjectType({
    name: 'VolunteerHours',
    fields: () => ({
        vol_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        hours: { type: GraphQLInt },
        vol_date: { type: GraphQLString },
        vol_time: { type: GraphQLString },
    })
});
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return pool.connect().then(client => {
                    return client.query(Query.SelecUserAll, [args.id]).then(res => res.rows[0]);
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        volunteerplace: {
            type: VolunteerType,
            args: { vol_name: { type: GraphQLString } },
            resolve(parent, args) {
                return pool.connect().then(client => {
                    return client.query(Query.SelectVolPlaces, [args.vol_name]).then(res => res.rows[0]);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: UserInterface,
            resolve(parent, args) {
                pool.connect().then(client => {
                    client.query(Query.InsertUser, [args.username, args.password, args.email]).then(res => {
                        console.log(res.rows[0]);
                        client.query(Query.InsertUserDetails, [args.user_fname, args.user_lname, res.rows[0].user_id]);
                        client.release();
                    });
                });
                return args;
            }
        },
        addVolPlace: {
            type: VolunteerType,
            args: {
                vol_name: { type: GraphQLString },
                vol_desc: { type: GraphQLString },
                vol_website: { type: GraphQLString }
            },
            resolve(parent, args) {
                pool.connect().then(client => {
                    client.query(Query.InsertVolunteerPlace, [args.vol_name, args.vol_desc, args.vol_website]);
                });
                return args;
            }
        },
        addVolHours: {
            type: VolunteerHourType,
            args: {
                vol_id: { type: GraphQLID },
                user_id: { type: GraphQLID },
                hours: { type: GraphQLInt },
                vol_date: { type: GraphQLString },
                vol_time: { type: GraphQLString },
            },
            resolve(parent, args) {
                pool.connect().then(client => {
                    client.query(Query.InsertVolunteerHours, [args.user_id, args.vol_id, args.hours, args.vol_date, args.vol_time]);
                });
                return args;
            }
        },
        updateUsername: {
            type: UserType,
            args: { user_id: { type: GraphQLID }, username: { type: GraphQLString }
            },
            resolve(parent, args) {
                pool.connect().then(client => {
                    client.query(Query.UpdateUsername, [args.username, args.user_id]);
                });
                return args;
            }
        },
        updatePassword: {
            type: UserType,
            args: { password: { type: GraphQLString }, user_id: { type: GraphQLID }
            },
            resolve(parent, args) {
                pool.connect().then(client => {
                    client.query(Query.UpdatePassword, [args.password, args.user_id]);
                });
                return args;
            }
        },
        updateEmail: {
            type: UserType,
            args: { email: { type: GraphQLString }, user_id: { type: GraphQLID }
            },
            resolve(parent, args) {
                pool.connect().then(client => {
                    client.query(Query.UpdateEmail, [args.email, args.user_id]);
                });
                return args;
            }
        },
        updateName: {
            type: UserType,
            args: { fname: { type: GraphQLString }, lname: { type: GraphQLString }, user_id: { type: GraphQLID }
            },
            resolve(parent, args) {
                pool.connect().then(client => {
                    client.query(Query.UpdateName, [args.fname, args.lname, args.user_id]);
                });
                return args;
            }
        },
        deleteUser: {
            type: UserType,
            args: { user_id: { type: GraphQLID } },
            resolve(parent, args) {
                pool.connect().then(client => {
                    client.query(Query.DeleteUser, [args.user_id]);
                });
                return null;
            }
        }
    }
});
exports.default = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
