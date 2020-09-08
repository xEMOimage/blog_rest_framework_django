import React from 'react';
import {Link} from 'react-router-dom';

const home = () =>(
    <div className="container">
    <div className="jumbotron mt-5">
        <h1 className="display-4">Welcome to Blog</h1>
        <p className="lead">Contain Blog on topics</p>
        <hr className="my-4"/>
        <p>Clink the button bellow to check out blog</p>
        <Link className="btn btn-primary btn-lg"  to='/blog' role="button">check out  more</Link>
    </div>
    </div>
);

export default home;