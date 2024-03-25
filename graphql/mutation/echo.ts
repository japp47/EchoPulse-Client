import { graphql } from "@/gql";

export const createEchoMutation = graphql(`#graphql
    mutation CreateEcho($payload: CreateEchoData!) {
        createEcho(payload: $payload) {
            id
        }
    }
`);