const { axios } = require('axios');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema} = require('graphql');
var api = 'https://api.spacexdata.com/v3/launches';
// lunch type
const lunchType = new GraphQLObjectType({
    name:"Launch",
    fields: () =>({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_utc: {type: GraphQLString},
        rocket: {
            type: RocketType
        }
    })
})

// relation query
const RocketType = new GraphQLObjectType({
    name:"Rocket",
    fields: () =>({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString}
    })
})

// root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new GraphQLList(lunchType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res => res.data);
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query: RootQuery
})