import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user , setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvide = new GithubAuthProvider();


  // ---------Google Provider-------------------
  const googleSingIN = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
      console.log(error);
    })
  }
  const googleSingOUt = () => {
    signOut(auth)
      .then(() => { 
        setUser({})
      })
      .catch(() => { 
      setUser({})
    });
  }
// --------------Github provider---------------------
  
  const githubSingIn = () => {
    signInWithPopup(auth, githubProvide)
      .then(result => {
        const user = result.user;
        setUser(user)
      })
      .catch(error => {
        console.log(error);
      })
  }
  

  return (
    <div className="App">
      
      {user.uid ?
        <button onClick={googleSingOUt}>Google Sign out</button> :
        <>
          <button onClick={googleSingIN}>Google Sign in </button>
          <button onClick={githubSingIn}>Github Sign in</button>
        </>
      }
      {
        user.uid && <div>
          <p>User Name : {user.displayName}</p>
          <p>Email : {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
     }
    </div>
  );
}

export default App;
