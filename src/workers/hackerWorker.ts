// Web Worker for handling heavy computations
// This worker handles procedural noise generation and simulated decryption logic

const ctx: Worker = self as any;

// --- Procedural Noise Generation ---
const generateNoise = (width: number, height: number, seed: number) => {
  const size = width * height * 4;
  const data = new Uint8ClampedArray(size);
  
  for (let i = 0; i < size; i += 4) {
    const val = Math.floor(Math.random() * 255);
    data[i] = val;     // R
    data[i + 1] = val; // G
    data[i + 2] = val; // B
    data[i + 3] = 255; // A
  }
  
  return data;
};

// --- Simulated Decryption Logic ---
const decryptText = (target: string, progress: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  return target.split('').map((char, index) => {
    if (index < progress) return char;
    return chars[Math.floor(Math.random() * chars.length)];
  }).join('');
};

// --- Message Handler ---
ctx.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'GENERATE_NOISE':
      const { width, height, seed } = payload;
      const noiseData = generateNoise(width, height, seed);
      ctx.postMessage({ type: 'NOISE_GENERATED', payload: noiseData }, [noiseData.buffer]);
      break;

    case 'DECRYPT_TEXT':
      const { target, progress } = payload;
      const decrypted = decryptText(target, progress);
      ctx.postMessage({ type: 'TEXT_DECRYPTED', payload: decrypted });
      break;

    default:
      console.warn('Unknown worker message type:', type);
  }
});

export {};
