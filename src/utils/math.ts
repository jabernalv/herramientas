import { mathjax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";

// Create DOM adaptor and register it with MathJax
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

// Create input and output jax and a document using them
const tex = new TeX({ packages: ["base", "ams", "newcommand", "autoload"] });
const svg = new SVG({ fontCache: "local" });
const html = mathjax.document("", { InputJax: tex, OutputJax: svg });

// Function to convert LaTeX to SVG
export const latex2svg = (latex: string): string => {
  const node = html.convert(latex, {
    display: true,
    em: 16,
    ex: 8,
    containerWidth: 800,
  });
  return adaptor.innerHTML(node);
};
