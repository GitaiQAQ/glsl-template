import GlslCanvas from 'glslCanvas';

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const sandbox = new GlslCanvas(canvas);

// Load only the Fragment Shader
sandbox.load(`
// Author: Patricio Gonzalez Vivo
#ifdef GL_ES
precision mediump float;
#endif

void main(){
    gl_FragColor = vec4(0.,1.,1., 1.);
}
`);