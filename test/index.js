

const GlslRunner = require('./runner');

const runner = new GlslRunner(`
// viewport resolution in pixels
uniform vec2 u_resolution;

// uniform vec2 u_mouse;

/* Coordinate and unit utils */
// 0.5 
vec2 coord(in vec2 p)
{
    p = p / u_resolution.xy;
    // correct aspect ratio
    if (u_resolution.x > u_resolution.y)
    {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    }
    else
    {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    // centering
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}

// -1
vec2 uv(vec2 fragCoord) {
    return (2.0 * fragCoord.xy - u_resolution.xy) / min(u_resolution.y, u_resolution.x);
}
vec2 uv2(vec2 fragCoord) {
    return fragCoord.xy / u_resolution.xy;
}
`);


console.log(runner.test(() => {
    const test = [30, 0]
    console.log(coord(test), uv(test), uv2(test))
})({ u_resolution: [10, 15] }))