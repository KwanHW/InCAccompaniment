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
  SliderMark,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import * as Tone from 'tone';
import PianoC4 from './audio/c4.mp3';

// const synth = new Tone.Synth().toDestination()
const sound = new Tone.Player(PianoC4).toDestination();
let transport = Tone.Transport;
let audioContextStarted = false;
function App() {
  const [bpm, setBpm] = useState(60);
  const [subdivision, setSubdivision] = useState('4n');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    transport.stop();
    if (isPlaying) {
      transport.cancel();
      transport = Tone.Transport.set({ bpm });
      transport.scheduleRepeat(time => {
        sound.start(time);
      }, subdivision);
      transport.start();
    }
  }, [bpm, subdivision, isPlaying]);

  const playAudioHandler = () => {
    if (!audioContextStarted) {
      Tone.start();
      audioContextStarted = true;
    }

    if (isPlaying) {
      transport.stop();
    } else {
      transport.cancel();
      transport = Tone.Transport.set({ bpm });
      transport.scheduleRepeat(time => {
        console.log(time);
        sound.start(time);
      }, subdivision);
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
            <Button onClick={decreaseBPMHandler}>-</Button>
            <Text fontSize="xl" px={7}>
              {bpm}
            </Text>
            <Button onClick={increaseBPMHandler}>+</Button>
          </Flex>
          <Slider
            aria-label="slider-1"
            value={bpm}
            width="80%"
            min={45}
            max={200}
            step={1}
            size="lg"
            colorScheme="teal"
            onChange={val => setBpm(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
          <Button onClick={playAudioHandler} colorScheme={isPlaying ? 'red' : 'teal'}>
            {isPlaying ? 'Stop' : 'Play'}
          </Button>
          <Flex direction="row">
            <Button
              onClick={() => setSubdivision('4n')}
              colorScheme={subdivision === '4n' ? 'teal' : 'gray'}
            >
              Crotchet
            </Button>
            <Button
              onClick={() => setSubdivision('8n')}
              colorScheme={subdivision === '8n' ? 'teal' : 'gray'}
            >
              Quaver
            </Button>
            <Button
              onClick={() => setSubdivision('16n')}
              colorScheme={subdivision === '16n' ? 'teal' : 'gray'}
            >
              Semiquaver
            </Button>
          </Flex>
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
