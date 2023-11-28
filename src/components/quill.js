import hljs from "highlight.js";
import Quill from "quill"



export const initQuill = (element) => {


  
  if(element){

  let toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'bullet' }],
    [{ 'align': [] }],
    [{"color" : []}],
    ['code-block'],
  ]
  const options = {
      modules: {
        syntax: {
          highlight: text => hljs.highlightAuto(text).value,
        },            // Include syntax module
        toolbar: toolbarOptions 
      },
      theme: 'snow'
    };
  const editor = new Quill(element, options) 
  return editor
  }
}