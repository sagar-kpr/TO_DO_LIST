var colors = [
  "rgba(254, 231, 21, 0.7)",
  "rgba(109, 82, 66, 0.7)",
  "rgba(150, 201, 61, 0.7)",
  "rgba(238, 71, 88, 0.7)",
  "rgba(49, 119, 115, 0.7)",
  "rgba(255, 105, 180, 0.7)",
  "rgba(184, 80, 66, 0.7)"
];
var j = 0;
var input = document.getElementById("inp");
var btn = document.getElementById("btn");
var tasklist = document.getElementById("list");
var count = document.getElementById("count");
var val;
var tasks = [];
var li;

btn.addEventListener("click", function () {
  val = input.value;
  if (val == "") {
    alert("Task is Empty");
  } else {
    li = document.createElement("li");
    let date = Date.now();
    li.setAttribute("id", date);

    li.innerHTML = `<div class="test"> <div class="icon" id=${date} data-value = false 
     style="background: ${colors[Math.floor(Math.random() * colors.length)]};">
    <i id=${date} data-value = false class="fa-solid fa-circle-notch" ></i>
    <div class="tick-mark" id=${date} data-value = false></div>
    </div>

      <div class="tooltipbox" id=${date} data-value = false ><small>mark as complete</small></div>
      <div class="tooltip" id=${date} data-value = false ><span class="span" data-value = false id=${date}> ${val} </span></div>
      <i id=${date} data-value = false class="fa-solid fa-trash-can del" ></i></div>`;
    tasklist.append(li);
    tasks.push(li);
    input.value = "";
    count.innerHTML = ++j;
  }
});

function handler(e) {
  if (e.key == "Enter") {
    val = e.target.value;
    if (val == "") {
      alert("Task is Empty");
    } else {
      li = document.createElement("li");
      let date = Date.now();

      li.setAttribute("id", date);
      li.innerHTML = `<div class="test"> <div class="icon"
      id=${date} data-value = false style="background: ${
        colors[Math.floor(Math.random() * colors.length)]
      };">
      <i id=${date} data-value = false class="fa-solid fa-circle-notch" ></i>
      <div class="tick-mark" id=${date} data-value = false></div>

      </div>

      <div class="tooltipbox" id=${date} data-value = false><small>mark as complete</small></div>
      <div class="tooltip" ><span class="span" id=${date} data-value = false> ${val} </span></div>
      <i id=${date} data-value = false class="fa-solid fa-trash-can del"></i></div>`;
      tasklist.append(li);
      tasks.push(li);
      input.value = "";
      let count = document.getElementById("count");
      count.innerHTML = ++j;
    }
  }
}

function addtodom(tasks) {
  tasklist.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tasklist.append(tasks[i]);
  }
}

function remove(deleteid) {
  for (let i = 0; i < tasks.length; i++) {
    if (deleteid == tasks[i].id) {
      tasks.splice(i, 1);
      count.innerHTML = --j;
      addtodom(tasks);
      return;
    }
  }
}

function checkbox(tick) {
  for (let i = 0; i < tasks.length; i++) {
    if (tick == tasks[i].id) {
      let findtick = document.querySelectorAll(".tick-mark");
      let findspan = document.querySelectorAll(".span");
      let findicon = document.querySelectorAll(".icon");
      for (let j = 0; j < findtick.length; j++) {
        if (tick == findtick[j].id && tick == findspan[j].id) {
          let val = findspan[j].getAttribute("data-value");

          if (val == "false") {
            findtick[j].style.display = "block";
            findspan[j].style.textDecoration = "line-through";
            findspan[j].style.textDecorationThickness = "2px";
            findicon[j].style.boxShadow =
              "0px 0px 20px 8px rgba(255,255,255,0.7) inset";
            findspan[j].setAttribute("data-value", true);

            return;
          }
          findtick[j].style.display = "none";
          findspan[j].style.textDecoration = "none";
          findicon[j].style.boxShadow = "none";
          findspan[j].setAttribute("data-value", false);

          return;
        }
      }
    }
  }
}

function handleclick(e) {
  const trgt = e.target;
  if (trgt.className == "fa-solid fa-trash-can del") {
    const deleteid = trgt.id;
    remove(deleteid);
    return;
  } else if (
    trgt.className == "icon" ||
    trgt.className == "fa-solid fa-circle-notch" ||
    trgt.className == "tick-mark"
  ) {
    const tick = trgt.id;
    checkbox(tick);
    return;
  }
}

input.addEventListener("keyup", handler);
document.addEventListener("click", handleclick);
