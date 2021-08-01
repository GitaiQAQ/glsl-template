const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["preview/index.ts"],
    outdir: "www/",
    bundle: true,
    watch: {
      onRebuild(error, result) {
        if (error) console.error("watch build failed:", error);
        else console.log("watch build succeeded:", result);
      },
    },
  })
  .then((result) => {
    // Call "stop" on the result when you're done
    // result.stop()
  });
  
esbuild.serve({ servedir: "www" }, {});
