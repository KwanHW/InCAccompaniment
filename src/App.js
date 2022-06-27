import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  VStack,
  theme,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import * as Tone from 'tone';
import PianoC4 from './audio/piano-C4.wav';
// import PianoC5 from './audio/piano-C5.wav';
// import PianoC6 from './audio/piano-C6.wav';

// const synth = new Tone.Synth().toDestination()
const sound = new Tone.Player(PianoC4).toDestination();
let transport = Tone.Transport;
function App() {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    transport.stop();
    if (isPlaying) {
      transport = Tone.Transport.set({ bpm });
      transport.scheduleRepeat(time => {
        sound.start(time, undefined, bpm / 60);
      }, '4n');
      transport.start();
    }
  }, [bpm]);

  const playAudioHandler = () => {
    if (isPlaying) {
      transport.stop();
    } else {
      transport = Tone.Transport.set({ bpm });
      transport.scheduleRepeat(time => {
        sound.start();
      }, '4n');
      transport.start();
    }
    setIsPlaying(!isPlaying);
  };

  const increaseBPMHandler = () => {
    setBpm(prev => prev + 1);
  };

  const decreaseBPMHandler = () => {
    setBpm(prev => prev - 1);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {/* <Grid minH="100vh" p={3}> */}
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Text fontSize="4xl">In C</Text>
        <VStack spacing={3}>
          <Text fontSize="2xl">BPM:</Text>
          <Flex direction="row">
            <Button onClick={increaseBPMHandler}>+</Button>
            <Text fontSize="xl" px={7}>
              {bpm}
            </Text>
            <Button onClick={decreaseBPMHandler}>-</Button>
          </Flex>
          <Slider
            aria-label="slider-1"
            value={bpm}
            width="80%"
            min={45}
            max={200}
            step={1}
            onChange={val => setBpm(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Button onClick={playAudioHandler}>{isPlaying ? 'Stop' : 'Play'}</Button>
          {/* <Button onClick={decreaseBPMHandler}>Less BPM</Button> */}
          {/* <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link> */}
        </VStack>
        {/* </Grid> */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
