import React, { useState } from 'react';
import auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PostForm from '../components/PostForm';
import { QUERY_POST } from '../utils/queries';
import { getOperationAST } from 'graphql';

const EditPost = (props) => {

    const { _id: postId } = useParams();

    if(!auth.loggedIn()) {
        window.location.assign('/');
    }
    
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { _id: postId },
    });

    const post = data?.post;

        if(auth.loggedIn() && !loading) { 
        return (
        <main>
            <div>
                <PostForm post={post} />
            </div>
        </main>
    ) } else {
        return <div>Loading...</div>
    }
}

export default EditPost;