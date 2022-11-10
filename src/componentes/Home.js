import React from 'react';

import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h1>Choose and download any photo you like from Unsplash</h1>
            <main className='main__home'>
                <button>
                    <Link to="/search">Search photos</Link>
                    </button>
            </main>
        </>
    );
  };
  
  export default Home;