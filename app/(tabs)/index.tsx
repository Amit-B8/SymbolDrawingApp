import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

export default function App() {
  const [selectedRanger, setSelectedRanger] = useState(null);
  
  // This reference lets us talk to the drawing canvas
  const canvasRef = useRef();

  // This function triggers as soon as you lift your finger off the screen
  const handleDrawFinish = () => {
    console.log("Drawing complete! Time to Morph!");
    // This is where we will trigger the sound effect later!
  };

  // IF a color is selected, show the Drawing Screen!
  if (selectedRanger !== null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Draw {selectedRanger} Power!</Text>
        
        {/* The actual drawing board */}
        <View style={styles.canvasArea}>
            <SignatureScreen
                ref={canvasRef}
                onEnd={handleDrawFinish}
                autoClear={false}
                descriptionText="Draw your symbol"
                // This hides the default "Clear" and "Save" buttons the library comes with so it looks cleaner
                webStyle={`.m-signature-pad--footer {display: none; margin: 0px;}`}
            />
        </View>

        {/* Custom buttons below the canvas */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => canvasRef.current.clearSignature()}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => setSelectedRanger(null)}>
            <Text style={styles.buttonText}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Otherwise, show the main Menu Screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Power</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000' }]} onPress={() => setSelectedRanger('Fire')}>
        <Text style={styles.buttonText}>Fire (Red)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#0000FF' }]} onPress={() => setSelectedRanger('Water')}>
        <Text style={styles.buttonText}>Water (Blue)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#008000' }]} onPress={() => setSelectedRanger('Wood')}>
        <Text style={styles.buttonText}>Wood (Green)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#FFD700' }]} onPress={() => setSelectedRanger('Earth')}>
        <Text style={styles.buttonText}>Earth (Yellow)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#FFC0CB' }]} onPress={() => setSelectedRanger('Sky')}>
        <Text style={styles.buttonText}>Sky (Pink)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  button: {
    width: 220,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  },
  canvasArea: {
    width: 320,
    height: 350,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 20,
    overflow: 'hidden', // Keeps the drawing inside the rounded corners
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 320,
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  }
});