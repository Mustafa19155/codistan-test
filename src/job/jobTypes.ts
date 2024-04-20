export const jobTypes = `#graphql
    type Job{
        id:ID!,
        data: String!,
        status: String!,
        result: String
    }

    type Query{
        job: Job
    }

    input CreateJobInput{
        data: String!
    }

    type Mutation{
        createJob(input: CreateJobInput): Job
    }
`;
