import P5Sketch from './P5Sketch';

export default function P5Background() {
  return (
    <div 
      className="absolute inset-0 z-10 pointer-events-none" 
      style={{ 
        backgroundColor: 'transparent',
        opacity: 1
      }}
      key="p5"
    >
      <P5Sketch />
    </div>
  );
}
