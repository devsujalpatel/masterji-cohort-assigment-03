// importing all html elements
const anchor = document.getElementById("download-anchor");
const downloadBtn = document.querySelector(".download-btn");
const chnageBtn = document.querySelector(".change-btn");
const newBtn = document.querySelector(".new-btn");
const quoteDiv = document.querySelector(".quote-div");

// randomDigits function to make random images
function randomDigits(digits = 1) {
  if (digits < 1) throw new Error("Digits must be at least 1.");

  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// change background function to change the background
const changeBackGround = () => {
  const randomNumber = randomDigits(3);
  const randomImages = `https://picsum.photos/id/${randomNumber}/2000/1200/`;

  const container = document.querySelector(".container");
  container.style.background = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${randomImages}') no-repeat center/cover`;
  // donwload button function
  downloadBtn.addEventListener("click", () => {
    fetch(randomImages) // Ensures randomImages is a right url 
      .then((response) => response.blob()) // Converting to Blob
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "image.jpg"; // giving the name to download file
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url); // cleaning up the url for new url
      })
      .catch((error) => console.error("Download failed:", error));
  });

};
// giving the function on click of changeBtn
chnageBtn.addEventListener("click", changeBackGround);

// change quote function to load and render the quote on html
const changeQuote = async () => {
  await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      quoteData = data.data;
      quoteDiv.innerHTML = `<p class="quote-para">${quoteData.content}</p>
               <p class="author-para">~${quoteData.author}</p>`;
    })
    .catch((err) => {
      console.log(err, "error fetching data");
    });
};

// running function on newbtn click
newBtn.addEventListener("click", () => {
  changeQuote();
  changeBackGround();
});


// tweet button
document.querySelector(".tweet-btn").addEventListener("click", function () {
  window.open(
    "https://twitter.com/intent/tweet?text=" +
      quoteData.content +
      " ~ " +
      quoteData.author
  );
});


// calling function on page load
changeQuote();
changeBackGround();
