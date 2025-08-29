import { useEffect } from 'react';

const Butterflies = () => {
  return (
    <div className="canvas">
      {[1, 2, 3, 4, 5].map((num) => (
        <div key={num} className={`bf bf-${num}`}>
          <div className="wing-left">
            <svg width="100%" height="100%" viewBox="0 0 17 29" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
              <defs>
                <linearGradient id={`wingGradientLeft-${num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DF9AA0" />
                  <stop offset="100%" stopColor="#FFF" />
                </linearGradient>
              </defs>
              <g transform="matrix(0.0156264,0,0,0.0156264,-5.01358,-5.8732)">
                <path
                  d="M1910.74,1914.9C1440.74,1494.13 1440.61,1185.89 1440.61,865.11C1359.94,977.774 1154.27,576.526 855.987,480.781C758.042,404.081 442.781,320.927 347.826,423.951C309.909,465.096 311.95,525.578 353.949,603.894C495.736,868.494 562.977,1033.61 559.433,1109.67C559.631,1165.3 582.03,1218.62 621.625,1257.7C672.094,1308.02 737.686,1340.44 808.312,1349.98C720.107,1405.47 666.305,1502.53 665.987,1606.74C667.922,1738.19 698.611,1867.63 755.892,1985.96C802.959,2114.05 921.66,2202.78 1057.84,2211.67L1059.66,2211.67C1210.93,2193.6 1020.79,2057.62 1304.35,1906.04C1304.35,1701.95 1387.79,1632.12 1440.74,1614.9Z"
                  fill={`url(#wingGradientLeft-${num})`}
                  stroke="#FFF"
                  strokeWidth="20"
                />
              </g>
            </svg>
          </div>

          <div className="wing-right">
		  <svg width="100%" height="100%" viewBox="0 0 17 29" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
              <defs>
                <linearGradient id={`wingGradientLeft-${num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DF9AA0" />
                  <stop offset="100%" stopColor="#FFF" />
                </linearGradient>
              </defs>
              <g transform="matrix(0.0156264,0,0,0.0156264,-5.01358,-5.8732)">
                <path
                  d="M1910.74,1914.9C1440.74,1494.13 1440.61,1185.89 1440.61,865.11C1359.94,977.774 1154.27,576.526 855.987,480.781C758.042,404.081 442.781,320.927 347.826,423.951C309.909,465.096 311.95,525.578 353.949,603.894C495.736,868.494 562.977,1033.61 559.433,1109.67C559.631,1165.3 582.03,1218.62 621.625,1257.7C672.094,1308.02 737.686,1340.44 808.312,1349.98C720.107,1405.47 666.305,1502.53 665.987,1606.74C667.922,1738.19 698.611,1867.63 755.892,1985.96C802.959,2114.05 921.66,2202.78 1057.84,2211.67L1059.66,2211.67C1210.93,2193.6 1020.79,2057.62 1304.35,1906.04C1304.35,1701.95 1387.79,1632.12 1440.74,1614.9Z"
                  fill={`url(#wingGradientLeft-${num})`}
                  stroke="#FFF"
                  strokeWidth="20"
                />
              </g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Butterflies;
