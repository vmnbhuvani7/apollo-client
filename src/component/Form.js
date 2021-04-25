import React, { useEffect, useState } from 'react'
import {
    CREATE_USER_MUTATION,
    DELETE,
    UPDATE_USER_MUTATION
} from '../GraphQl/Mutation'
import { useMutation, useQuery } from "@apollo/react-hooks";
import { LOAD_USERS } from '../GraphQl/Queries';
import { SUBSCRIPTION_USERS } from '../GraphQl/Subscription';

function Form() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [createNewPost] = useMutation(CREATE_USER_MUTATION)
    const [deletePost] = useMutation(DELETE)
    const [editPostByID] = useMutation(UPDATE_USER_MUTATION)
    const { data, subscribeToMore } = useQuery(LOAD_USERS)

    useEffect(() => {
        try {
            if (subscribeToMore) {
                const unsubscribe = subscribeToMore({
                    document: SUBSCRIPTION_USERS,
                    updateQuery: (previousResult, { subscriptionData }) => {
                        if (!subscriptionData.data) {
                            return previousResult;
                        }
                        const { userChange } = subscriptionData.data;
                        if (userChange && userChange.keyType === "INSERT") {
                            let newdata = [
                                userChange.data,
                                ...previousResult.getAllPost,
                            ];
                            return {
                                ...previousResult,
                                getAllPost: {
                                    ...previousResult.getAllPost,
                                    data: newdata
                                },
                            };
                        }
                        if (userChange && userChange.keyType === "DELETE") {
                            let newdata = previousResult.getAllPost.filter((res) => res.id !== userChange.data.id)
                            return {
                                getAllPost: {
                                    data: newdata
                                },
                            };
                        }
                    },
                });
                return () => unsubscribe();
            }

        } catch (error) {
            console.log(error);
        }
    }, [subscribeToMore]);

    const deleteUser = (id) => {
        deletePost({
            variables: {
                id: id
            }
        })
    }

    const updateUser = (id) => {
        editPostByID({
            variables: {
                title: title,
                content: content,
                id: id
            }
        })
    }

    const addUser = () => {
        createNewPost({
            variables: {
                title: title,
                content: content,
            }
        })
    }

    return (
        <div>
            <input
                type="text"
                placeholder="First aNme"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />

            <button onClick={addUser}> Create User</button>

            <div>
                {data?.getAllPost?.map((res) => (
                    <div key={res.id}>
                        <h2 key={res.id}>{res.title} - {res.content} - {res.id}</h2>
                        <button onClick={() => deleteUser(res.id)}> Delete </button>
                        <button onClick={() => updateUser(res.id)}> update </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Form
