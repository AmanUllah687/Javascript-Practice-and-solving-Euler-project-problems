function showHelp(help) {
  document.getElementById("help").textContent = help;
}

function setupHelp() {
  const helpText = [
    { id: "email", help: "Your email address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  helpText.forEach((item) => {
    const element = document.getElementById(item.id);

    if (element) {
      element.addEventListener("focus", function () {
        showHelp(item.help);
      });
    }
  });
}
setupHelp();