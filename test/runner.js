const Compiler = require('glsl-transpiler');

const compile = Compiler({
	uniform: function (name) {
		return `uniforms.${name}`
	},
	attribute: function (name) {
		return `attributes.${name}`
	}
})

module.exports = class GlslRunner {
    #slot = undefined;

    constructor(source) {
        this.#slot = compile(source);
    }

    test(cases) {
        return new Function('uniforms', 'attributes', `
            ${this.#slot}
            
            return (${cases.toString()})();`
        );
    }
}