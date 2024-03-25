import { graphql } from "@/gql";

export const getAllEchoesQuery = graphql(`#graphql
    
    query GetAllEchoes {
        getAllEchoes {
            id
            content
            imageURL
            author {
                firstName
                lastName
                profileImageURL
            }
        }
    }`
);