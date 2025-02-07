import { Composition } from '@remotion/core';
import { SimpleVideo } from './components/SimpleVideo';

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="SimpleVideo"
        component={SimpleVideo}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
