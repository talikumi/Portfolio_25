import P5Sketch from './P5Sketch';

export default function P5Background() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none" key="p5">
      <P5Sketch />
    </div>
  );
}
