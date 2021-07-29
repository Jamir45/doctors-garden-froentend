import { Avatar, Button } from '@material-ui/core';
import React,{ useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';
import logicalNav from './LogicalNav';
import RegisterBtn from './RegisterBtn';

const Header = () => {
  const history = useHistory()
  const {loggedInUser, signOut} = useContextData();

  const [isSticky, setSticky] = useState(false);
  const [isCollapsed , setCollapsed] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50){
        setSticky(true)
      }else{
        setSticky(false)
      }
    })
  }, []);
  
  return (
      <div className="applicationHeader">
        <nav className={ (isSticky || isCollapsed) ? "navbar navbar-expand-md shadow-sm fixed-top " : "navbar navbar-expand-md fixed-top "}>
          <div className="container">
            <Link className="navbar-brand" to="/">
              Doctor's <strong>Garden</strong>
            </Link>
            <button onClick={
              () => setCollapsed(!isCollapsed ? 'show' : null )} className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
              aria-expanded="false" aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isCollapsed}`}>
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                {logicalNav(loggedInUser)}
              </ul>
              {
                loggedInUser ? 
                <>
                <Link className="mx-3" to='/profile' >
                  <Avatar src={loggedInUser.picture} />
                </Link>
                {/* <b className="mx-3" >{loggedInUser.username}</b> <br/> */}
                <Button
                  variant="contained"
                  onClick={() => signOut(history)}
                >
                  Logout
                </Button>
                </> : 
                <RegisterBtn />
              }
            </div>
          </div>
        </nav>
      </div>
   );
};

export default Header;