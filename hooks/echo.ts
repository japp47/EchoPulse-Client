import { graphqlClient } from "@/clients/api"
import { CreateEchoData } from "@/gql/graphql"
import { createEchoMutation } from "@/graphql/mutation/echo"
import { getAllEchoesQuery } from "@/graphql/query/echo"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateEcho = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CreateEchoData) => graphqlClient.request(createEchoMutation,{ payload}),
        onMutate: () => toast.loading('Creating Echo',  {id:'1'}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey:["all-echoes"]}),
            toast.success('Created Echo', {id:'1'}
            )
        },
        });
        return mutation;
    
}
export const useGetAllEchoes = () => {
    const query = useQuery({
        queryKey: ['all-echoes'],
        queryFn: () => graphqlClient.request(getAllEchoesQuery)
    })
    return { ...query, echoes: query.data?.getAllEchoes };
};