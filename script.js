let allDivs = null;
let selection = document.querySelector("select");
let main = document.querySelector("main");
const values = [];
const Elements = [];
let count = 0;
const allChild = [];
let SelectData = 2;
const arrayData = [];

function Arrayadder() {
  if (arrayData.length <= 2 * SelectData) {
    let raValue = Math.floor(Math.random() * SelectData);

    let check = arrayData.filter((e) => e == raValue);
    check.length < 2 ? arrayData.push(raValue) : Arrayadder();
  }
}

const boxRender = () => {
  main.innerHTML = "";
  arrayData.length = 0;
  main.style.gridTemplateColumns = `repeat(${SelectData}, 1fr)`;
  main.style.gridTemplateRows = `repeat(${SelectData}, 1fr)`;
  for (let num = 1; num <= SelectData ** 2; num++) {
    let button = document.createElement("button");
    button.classList.add("box");
    button.insertAdjacentHTML(
      "beforeend",
      '<div class="rot"><i></i></div><div class="rot"></div>'
    );

    Arrayadder();
    main.appendChild(button);
  }
  allDivs = document.querySelectorAll(".box");

  allDivs.forEach((e, i) => {
    let id = arrayData[i];
    e.setAttribute("dataId", id);
    e.children[0].children[0].innerText = id;
  });
};
boxRender();

selection.addEventListener("change", (e) => {
  SelectData = e.target.value;
  count = 0;
  boxRender();
});

allDivs.forEach((e) => {
  e.addEventListener("click", (element) => {
    let parentElement = element.target.parentElement;
    let childrens = parentElement.children;
    let dataSet = parentElement.attributes[1].nodeValue;
    Object.values(childrens).forEach((e) => e.classList.add("rotate"));
    parentElement.disabled = true;
    values.push(dataSet);
    allChild.push(parentElement);
    if (values.length == 2) {
      let check = values[0] == values[1];
      if (check) {
        values.length = 0;
        allChild.length = 0;
        document.querySelector("span").innerHTML = count += 1;
        console.log(count);
      } else {
        allChild.forEach((el) => {
          values.length = 0;
          el.disabled = false;

          el.classList.add("sake");
          setTimeout(() => {
            el.classList.remove("sake");
            Object.values(el.children).forEach((e) =>
              e.classList.remove("rotate")
            );
          }, 1000);
        });
        Elements.length = 0;
        allChild.length = 0;
      }
    }
  });
});