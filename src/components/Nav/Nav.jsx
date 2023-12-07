import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <img src="images/ReConnectLogo.png" alt="Logo" className="nav-logo" />
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}



        {/* If a user is logged in, show these links */}
        {user.id && (
          <>


<<<<<<< HEAD
            <Link className="navLink" to="/survey">
              Survey
            </Link>
=======
            {/* <Link className="navLink" to="/survey">
              Survey
            </Link> */}
>>>>>>> c3aef5e894d4efe4be432de1bab46955728fd8a6

            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
