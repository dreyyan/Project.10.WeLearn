// AudioContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';  // Added ReactNode import
import { Audio } from 'expo-av';

// Define the type for the context
interface AudioContextType {
  playButtonPressSound: () => Promise<void>;
  playButtonDisabledSound: () => Promise<void>;
  playNavigateSound: () => Promise<void>;
  playPopupSound: () => Promise<void>;
  playSuccessSound: () => Promise<void>;
  playErrorSound: () => Promise<void>;
}

// Define the props for AudioProvider, including children
interface AudioProviderProps {
  children: ReactNode; // This defines that 'children' can be any valid React node
}

// Create the context
const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {  // Added AudioProviderProps
  const [buttonPressSound, setButtonPressSound] = useState<Audio.Sound | null>(null);
  const [buttonDisabledSound, setButtonDisabledSound] = useState<Audio.Sound | null>(null);
  const [navigateSound, setNavigateSound] = useState<Audio.Sound | null>(null);
  const [popupSound, setPopupSound] = useState<Audio.Sound | null>(null);
  const [successSound, setSuccessSound] = useState<Audio.Sound | null>(null);
  const [errorSound, setErrorSound] = useState<Audio.Sound | null>(null);

  // Preload sounds
  useEffect(() => {
    async function loadSounds() {
      const { sound: buttonPress } = await Audio.Sound.createAsync(
        require('../assets/SFX/sfx-button-press.wav')
      );
      const { sound: buttonDisabled } = await Audio.Sound.createAsync(
        require('../assets/SFX/sfx-button-disabled.wav')
      );
      const { sound: navigate } = await Audio.Sound.createAsync(
        require('../assets/SFX/sfx-navigate.wav')
      );
      const { sound: popup } = await Audio.Sound.createAsync(
        require('../assets/SFX/sfx-popup.wav')
      );      
      const { sound: success } = await Audio.Sound.createAsync(
        require('../assets/SFX/sfx-success.wav')
      );
      const { sound: error } = await Audio.Sound.createAsync(
        require('../assets/SFX/sfx-error.wav')
      );
      setButtonPressSound(buttonPress);
      setButtonDisabledSound(buttonDisabled);
      setNavigateSound(navigate);
      setPopupSound(popup);
      setSuccessSound(success);
      setErrorSound(error);
    }
    
    // Load SFX
    loadSounds();

    // Cleanup on unmount
    return () => {
      if (buttonPressSound) {
        buttonPressSound.unloadAsync();
      }
      if (buttonDisabledSound) {
        buttonDisabledSound.unloadAsync();
      }
      if (navigateSound) {
        navigateSound.unloadAsync();
      }
      if (popupSound) {
        popupSound.unloadAsync();
      }
      if (successSound) {
        successSound.unloadAsync();
      }
      if (errorSound) {
        errorSound.unloadAsync();
      }
    };
  }, []);

  // [SFX] BUTTON PRESS
  const playButtonPressSound = async () => {
    if (buttonPressSound) {
      await buttonPressSound.replayAsync();
    }
  };

    // [SFX] BUTTON DISABLED
    const playButtonDisabledSound = async () => {
      if (buttonDisabledSound) {
        await buttonDisabledSound.replayAsync();
      }
    };

  // [SFX] NAVIGATE
  const playNavigateSound = async () => {
    if (navigateSound) {
      await navigateSound.replayAsync();
    }
  };

  // [SFX] POPUP
  const playPopupSound = async () => {
    if (popupSound) {
      await popupSound.replayAsync();
    }
  };

  // [SFX] SUCCESS
  const playSuccessSound = async () => {
    if (successSound) {
      await successSound.replayAsync();
    }
  };

  // [SFX] ERROR
  const playErrorSound = async () => {
    if (errorSound) {
      await errorSound.replayAsync();
    }
  };

  return (
    <AudioContext.Provider value={{ playButtonPressSound, playButtonDisabledSound, playNavigateSound, playPopupSound, playSuccessSound, playErrorSound }}>
      {children}
    </AudioContext.Provider>
  );
};

// Custom Hook: Use Audio Context
export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};
