import React from 'react';
import "../globals.css";
import Navbar from '../components/Navbar';
import TextGenerator from '../components/TextGenerator'

type AuthPageProps = { };

const styles = {
  gradientBackground: {
    background: '#030422',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    left: 'middle',
    top: 'middle',
  },
  textContainer: {
    position: 'absolute',
    top: '540px',
    right: 'middle',
  },
  image: {
    width: '400px', 
    height: '400px', 
    border: 'none',
    margin: 0,
    padding: 0,
  },
};

const AuthPage: React.FC<AuthPageProps> = () => {
  return (
    
    <div style={styles.gradientBackground}>
        <Navbar/>
      <div style={styles.imageContainer}>
        <img src="AlgoAdversaries.png" alt="AlgoAdversaries" style={styles.image} />
      </div>
      {/* {/* <div style={styles.textContainer}>
        {/* <TextGenerator text={"1 fn main(){ \n \n2      println!('Welcome! Sign in to start coding!'); \n \n3 }"} color = 'white' fontSize = '2em' /> */}
      {/* </div> */} 
    </div>
  );
};

export default AuthPage;