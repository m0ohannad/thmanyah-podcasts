import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 25%, #C084FC 50%, #E879F9 75%, #F0ABFC 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          position: 'relative',
          boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
        }}
      >
        {/* Main Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          🎙️
        </div>
        
        {/* Brand Text */}
        <div
          style={{
            position: 'absolute',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'system-ui',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          بودكاست ثمانية
        </div>
        
        {/* Shine Effect */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            right: '50%',
            bottom: '50%',
            background: 'linear-gradient(45deg, rgba(255,255,255,0.3) 0%, transparent 70%)',
            borderRadius: '15px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
