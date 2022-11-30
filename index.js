const hexInput = document.getElementById("hex");
const rgbaInput = document.getElementById("result");
const submitBtn = document.getElementById("submit");
const errorTxt = document.getElementById("error");
const copyBtn = document.getElementById("copy");

let hex;
hexInput.addEventListener("change", (e) => {
   hex = e.target.value;
});

copyBtn.addEventListener("click", () => {
   if (!hex) {
      return;
   }
   CopyToClipboard("result");
   copyBtn.innerHTML = "Copied";
   setTimeout(() => {
      copyBtn.innerHTML = "Copy";
   }, 3000);
});

submitBtn.addEventListener("click", () => {
   if (!hex) {
      errorTxt.innerHTML = "Please enter a valid hex code";
      return;
   } else {
      hexToRgbA();
      errorTxt.innerHTML = "";
   }
});

function hexToRgbA() {
   var c;
   if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
         c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      rgbaInput.innerHTML =
         "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)";
      return (
         "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)"
      );
   }
   errorTxt.innerHTML = "Please enter a valid hex code";
   throw new Error("Bad Hex");
}

function CopyToClipboard(id) {
   var r = document.createRange();
   r.selectNode(document.getElementById(id));
   window.getSelection().removeAllRanges();
   window.getSelection().addRange(r);
   try {
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      console.log("Successfully copy text: hello world " + r);
   } catch (err) {
      console.log("Unable to copy!");
   }
}
