// import { useEffect, useState } from 'react';
import { Styled } from './LoadingScreen.styles';
import { LoadingLogo } from '../../../misc/LoadingLogo';

export const LoadingScreen = () => {
  // const [progress, setProgress] = useState(10);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prevProgress) => {
  //       // Increment by a small amount
  //       const newProgress = prevProgress + 0.5;

  //       // Reset to 0 when reaching 100%
  //       return newProgress > 100 ? 0 : newProgress;
  //     });
  //   }, 20); // Very small interval for smooth progression

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Styled.self>
      <Styled.main>
        <LoadingLogo width={168} height={168} />
        {/* <div
          css={loadingScreenStyles.progressBar}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-valuenow={progress}
          data-max="100"
          aria-valuetext={`${progress}%`}
        >
          <div
            css={loadingScreenStyles.progress}
            style={{
              width: `${progress}%`,
              transition: 'width 20ms linear'
            }}
          ></div>
        </div>*/}
      </Styled.main>
    </Styled.self>
  );
};
