const { dirname, resolve, join } = require("path");
const { readFileSync } = require("fs");
const { compile } = require("glslx");

const filepath = join(process.cwd(), "src/demo.glslx");

const source = (filepath) => ({
  name: resolve(filepath),
  contents: readFileSync(filepath, "utf8"),
});

const result = compile(source(filepath), {
  format: "json",
  renaming: "internal-only",
  disableRewriting: false,
  prettyPrint: true,
  keepSymbols: false,
  fileAccess: (filePath, relativeTo) => {
    const name = resolve(dirname(relativeTo), filePath);
    try {
      return source(name);
    } catch (e) {
      return null;
    }
  },
});

if (result.output) {
    console.log(JSON.parse(result.output));
}
console.log(result.log);
