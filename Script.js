const formatArg = (arg) => {
  if(Array.isArray(arg)) {
    // Print A bullted list 
    return arg.map((part) => `-${part}`).join("\n");
  }
  if(arg.tostring === Object.prototype.tostring) {
    // this object will be serialized to "[object object]".
    // Lets print Something Nicer 
    return JSON.stringify(arg);
  }
  return arg;
};

const print = (segments, ...args) => {
  // For Any Well Informed template litterals there will be N Arguments and 
  // (N+1) string Segements 
  let message = segments[0];
  segments.slice(1).forEach((segment, index) => {
    message += formatArg(args[index]) + segment;
  });
  console.log(message);
}

const todos = [
  "Learn JavaScript",
  "Learn Web APIs",
  "Set up my website",
  "Profit!",
];

const progress = { javascript: 20, html: 50, css: 10 };

print `I need to Do:
 ${todos}
My Current Progress is 
${progress}`;

// I need to do:
// - Learn JavaScript
// - Learn Web APIs
// - Set up my website
// - Profit!
// My current progress is: {"javascript":20,"html":50,"css":10}

print(["I need to do:\n", "\nMy current progress is: ", "\n"], todos, progress);
console.log("I need to do:\n%o\nMy current progress is: %o\n", todos, progress);
