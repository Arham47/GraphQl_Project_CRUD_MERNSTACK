import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema ,GraphQLList} from "graphql"
// mongoose model
import ClientModel from "../models/Client.js" 
import projectModel from "../models/Project.js" 


//client type

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        
    })
});
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        clients: {
            type: ClientType,
            resolve(parent, args) {
                return ClientModel.findById(parent.clinetId)
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",

    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return ClientModel.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ClientModel.findById(args.id)
            }
            
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projectModel.find()
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return projectModel.findById(args.id)
            }
            
        }
    }
    
})



export const schema=new GraphQLSchema({
    query:RootQuery
})