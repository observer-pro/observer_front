import hljs from "highlight.js";
import java from "highlight.js/lib/languages/java.js";
import python from "highlight.js/lib/languages/python.js";
import xml from "highlight.js/lib/languages/xml.js";
import javascript from "highlight.js/lib/languages/javascript.js";
import "highlight.js/styles/github.css";

hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("javascript", javascript);

export default hljs;
