import {
  SiAdobephotoshop, SiAdobelightroom, SiAdobepremierepro, SiAdobeaftereffects, SiAdobeillustrator, SiAdobeindesign, SiAdobexd, SiAdobeacrobatreader, SiSketch, SiFigma, SiFramer, SiHtml5, SiJavascript, SiCss3, SiReact, SiGatsby, SiWordpress, SiMarkdown, SiJava, SiPython, SiArduino, SiGit, SiSquarespace, SiGraphql, SiNextdotjs, SiTailwindcss, SiNotion,
} from 'react-icons/si';
import {
  FaElementor
} from 'react-icons/fa';

import {FiHelpCircle} from 'react-icons/fi';

const StackIcon = ({iconName}) => {

  let iconType;

  switch (iconName) {
    case "Adobe Photoshop": iconType = <SiAdobephotoshop/>
      break;
    case "Adobe Lightroom": iconType = <SiAdobelightroom/>
      break;
    case "Adobe Premiere": iconType = <SiAdobepremierepro/>
      break;
    case "Adobe After Effects": iconType = <SiAdobeaftereffects/>
      break;
    case "Adobe Illustrator": iconType = <SiAdobeillustrator/>
      break;
    case "Adobe InDesign": iconType = <SiAdobeindesign/>
      break;
    case "Adobe XD": iconType = <SiAdobexd/>
      break;
    case "Adobe Acrobat Reader": iconType = <SiAdobeacrobatreader/>
      break;
    case "Sketch": iconType = <SiSketch/>
      break;
    case "Figma": iconType = <SiFigma/>
      break;
    case "Framer": iconType = <SiFramer/>
      break;
    case "HTML5": iconType = <SiHtml5/>
      break;
    case "Javascript": iconType = <SiJavascript/>
      break;
    case "CSS3": iconType = <SiCss3/>
      break;
    case "React": iconType = <SiReact/>
      break;
    case "Gatsby": iconType = <SiGatsby/>
      break;
    case "Wordpress": iconType = <SiWordpress/>
      break;
    case "Markdown": iconType = <SiMarkdown/>
      break;
    case "Java": iconType = <SiJava/>
      break;
    case "Python": iconType = <SiPython/>
      break;
    case "Arduino": iconType = <SiArduino/>
      break;
    case "Git": iconType = <SiGit/>
      break;
    case "Square Space": iconType = <SiSquarespace/>
      break;
    case "Tailwind": iconType = <SiTailwindcss/>
      break;
    case "Nextjs": iconType = <SiNextdotjs/>
      break;
    case "GraphQL": iconType = <SiGraphql/>
      break;
    case "Notion": iconType = <SiNotion/>
      break;
    case "Elementor": iconType = <FaElementor/>
      break;
    default: iconType = <FiHelpCircle/>
      break;
  }

  return(
    <>{iconType}</>
  )
}

export default StackIcon;