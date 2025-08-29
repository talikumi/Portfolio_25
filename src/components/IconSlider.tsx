import React from 'react';

const IconSlider = () => {
  const icons = [
    { name: 'Apple', icon: 'fab fa-apple', color: '#000000' },
    { name: 'Google', icon: 'fab fa-google', color: '#4285F4' },
    { name: 'Facebook', icon: 'fab fa-facebook-f', color: '#1877F2' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2' },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
    { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
    { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E' },
    { name: 'AWS', icon: 'fab fa-aws', color: '#FF9900' },
    { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
    { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' },
    { name: 'WordPress', icon: 'fab fa-wordpress', color: '#21759B' },
    { name: 'Shopify', icon: 'fab fa-shopify', color: '#7AB55C' },
    { name: 'Stripe', icon: 'fab fa-stripe', color: '#008CDD' },
    { name: 'GitHub', icon: 'fab fa-github', color: '#181717' },
    { name: 'npm', icon: 'fab fa-npm', color: '#CB3837' }
  ];

  return (
    <div className="icon-slider-container">
      <div className="icon-track">
        {/* First set of icons */}
        {icons.map((iconData, index) => (
          <div
            key={`first-${index}`}
            className="icon-item flex flex-col items-center justify-center mx-8 group"
          >
            <div className="icon-wrapper">
              <i
                className={`${iconData.icon} text-4xl transition-all duration-300`}
                style={{ color: iconData.color }}
              ></i>
            </div>
            <span className="icon-name text-sm text-gray-600 mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {iconData.name}
            </span>
          </div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {icons.map((iconData, index) => (
          <div
            key={`second-${index}`}
            className="icon-item flex flex-col items-center justify-center mx-8 group"
          >
            <div className="icon-wrapper">
              <i
                className={`${iconData.icon} text-4xl transition-all duration-300`}
                style={{ color: iconData.color }}
              ></i>
            </div>
            <span className="icon-name text-sm text-gray-600 mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {iconData.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSlider;
