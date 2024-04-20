export const jobTypesDef = `#graphql
    type Job{
        id:ID!,
        data: String!,        
        result: String
    }

    type Query{
        job(id: ID!): Job
    }

    input CreateJobInput{
        data: String!
    }

    type Mutation{
        createJob(input: CreateJobInput): Job
    }
`;
