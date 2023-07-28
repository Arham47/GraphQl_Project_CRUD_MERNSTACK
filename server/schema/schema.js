import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} from "graphql";
// mongoose model
import ClientModel from "../models/Client.js";
import projectModel from "../models/Project.js";

//client type

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
    }),
});
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return ClientModel.findById(parent.clientId);
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",

    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return ClientModel.find();
            },
        },
        client: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return ClientModel.findById(args.id);
            },
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projectModel.find();
            },
        },
        project: {
            type: ProjectType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return projectModel.findById(args.id);
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: GraphQLNonNull(GraphQLString)
                },
                phone: {
                    type: GraphQLNonNull(GraphQLString)
                },
            },
            resolve(parent, args) {
                const client = new ClientModel({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            },
        },

        // delete Client
        deleteClient: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                return ClientModel.findByIdAndDelete(args.id)
            }

        },

        addProject: {
            type: ProjectType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: GraphQLNonNull(GraphQLString)
                },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            'new': {
                                value: 'Not Started'
                            },
                            'progress': {
                                value: 'In Progress'
                            },
                            'completed': {
                                value: 'Completed'
                            }
                        },
                    }),
                    defaultValue: "Not Started"
                },
                clientId: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                const client = new projectModel({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return client.save();
            },
        },
        deleteProject: {
            type: ProjectType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return projectModel.findByIdAndDelete(args.id)
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                },
                name: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            'new': {
                                value: 'Not Started'
                            },
                            'progress': {
                                value: 'In Progress'
                            },
                            'completed': {
                                value: 'Completed'
                            }
                        },
                    }),
                    
                },
                
            },
            resolve(parent, args) {
                return  projectModel.findByIdAndUpdate(args.id, {$set:{
                    name:args.name,
                    description:args.description,
                    status: args.status,
                    
                }})
            } 
        }
    },
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});