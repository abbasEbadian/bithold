import React, { useContext } from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {ParticleOptions} from '../utils'
function Particle() {
    
    const particlesInit = React.useRef((main) => {
        loadFull(main);
    })
  return (
    <Particles
        id="tsparticles"
        init={particlesInit.current}
        options={ParticleOptions}
    />
  )
}

export default Particle