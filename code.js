const class_h1 = document.querySelector("#class");
const desc_p = document.querySelector("#desc");
const url = "https://eldenring.fanapis.com/api/classes";
const luoHahmoBtn = document.querySelector("#luoHahmo");

let count = 20;
let countMaxLimit = 20;
let countMinLimit = 0;

const stats = {
  vigor: 0,
  endurance: 0,
  strength: 0,
  dexterity: 0,
};

const statNames = {
  vigor: "Elämä",
  endurance: "Kestävyys",
  strength: "Voima",
  dexterity: "Ketteryys",
};

function updateCount() {
  document.getElementById("count").textContent = count;
}

function updateStats() {
  for (const stat in stats) {
    document.getElementById(stat).textContent = stats[stat];
  }
}

function increaseLevel(stat) {
  if (count > countMinLimit) {
    count--;
    stats[stat]++;
    updateCount();
    updateStats();
  }
}

function decreaseLevel(stat) {
  if (stats[stat] > 0) {
    count++;
    stats[stat]--;
    updateCount();
    updateStats();
  }
}

document.querySelector("form").addEventListener("submit", sendForm);

function sendForm(e) {
  e.preventDefault();

  let form = e.currentTarget;

  let formData = new FormData(form);

  let hahmo = formData.get("kuvaus");

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        class_h1.innerHTML = json.data[hahmo].name;
        document.querySelector("img").src = `${json.data[hahmo].image}`;
        desc_p.innerHTML = json.data[hahmo].description;
        document.getElementById("statsSection").classList.remove("d-none");
      })
      .catch((error) => {
        alert(error);
      });
  };

  getData();
}

luoHahmoBtn.addEventListener("click", () => {
  window.location.href = "index2.html";
});
