import React from 'react';
import Animation from '../animation/animation.json';
import LottieAnimation from '../animation/LottieAnimation'
const Header = () => {
  return (
    <div className="title">
      <h1>Check out if your Birthdate is Palidrome.</h1>
      <h3>
        A palindrome is a word/number which reads the same backward as forward
      </h3>
      <LottieAnimation
        className="lottie"
        lotti={Animation}
        width={300}
        height={300}
      />
      <a className="btn" href="#output">
        Let's go
      </a>
    </div>
  );
};

export default Header;