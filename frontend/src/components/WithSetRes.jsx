import {useState, useEffect} from 'react';


const WithSetRes = ({element: Component, ...props}) => {
  const higherRes = 768;
  const [isMobile, setIsMobile] = useState();
  
  const handleResize = () => {
    if (window.innerWidth <= higherRes) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  
  useEffect(() => {
    setIsMobile(window.innerWidth <= higherRes);
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (<Component isMobile={isMobile} {...props}/>);
};

export default WithSetRes;