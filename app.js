const selectedSeats = new Set();

    // Hàm tạo ghế
    function createSeats(containerId, rows, seatsPerRow, options = {}) {
      const container = document.getElementById(containerId);
      rows.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        for (let i = 1; i <= seatsPerRow; i++) {
          // đánh số theo kiểu lẻ/chẵn nếu cần
          let seatNumber;
          if (options.oddEven) {
            seatNumber = options.side === "left" ? (i * 2 - 1) : (i * 2);
          } else {
            seatNumber = i;
          }

          const seat = document.createElement("div");
          seat.className = "seat";
          seat.innerText =seatNumber;
          seat.dataset.seat =seatNumber;

          seat.addEventListener("click", () => toggleSeat(seat));
          rowDiv.appendChild(seat);
        }

        container.appendChild(rowDiv);
      });
    }

    function toggleSeat(seat) {
      if (seat.classList.contains("occupied")) return;

      const seatId = seat.dataset.seat;
      if (selectedSeats.has(seatId)) {
        selectedSeats.delete(seatId);
        seat.classList.remove("selected");
      } else {
        selectedSeats.add(seatId);
        seat.classList.add("selected");
      }
      updateSelectedList();
    }

    function updateSelectedList() {
      const list = document.getElementById("selected-seats");
      if (selectedSeats.size === 0) {
        list.innerText = "Chưa chọn ghế nào";
      } else {
        list.innerText = Array.from(selectedSeats).join(", ");
      }
    }

    function confirmSeats() {
      if (selectedSeats.size === 0) {
        alert("Bạn chưa chọn ghế nào!");
        return;
      }
      alert("Bạn đã xác nhận các ghế: " + Array.from(selectedSeats).join(", "));
    }





    // --- Sinh dữ liệu ---
   //---------------------------------------------------TẦNG 1 - KHU PHÍA TRƯỚC SÂN KHẤU (A,B,C,D,E,F,G)--------------------------------------//
const frontRows = ["A","B","C","D","E","F","G"];
frontRows.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "row";

let evenSeat = 2;
let oddSeat = 3;

  // thêm label hàng (A, B, C...)
  const rowLabel = document.createElement("div");
  rowLabel.className = "row-label";
  rowLabel.innerText = row;
  rowDiv.appendChild(rowLabel);

// block trái (chẵn, giảm dần về giữa)
  // tất cả số ghế chẵn từ 2 → 20
  let evenSeats = [];
  for (let i = 2; i <= 20; i += 2) {
    evenSeats.push(i);
  }
  evenSeats.reverse();
  let middleSeats = evenSeats.slice(0, 4);
  let leftSeats = evenSeats.slice(4);

  // render block giữa
  middleSeats.forEach(num => {
    const seat = document.createElement("div");
    seat.className ="seat";
    seat.innerText =row + num;
    seat.dataset.seat = row + num;
    seat.addEventListener("click", () => toggleSeat(seat));
    rowDiv.appendChild(seat);
  });

  // render block trái, nhưng chèn lối đi sau số 10
  leftSeats.forEach(num => {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.innerText = row + num;
    seat.dataset.seat = row + num;
    seat.addEventListener("click", () => toggleSeat(seat));
    rowDiv.appendChild(seat);

    // thêm lối đi sau ghế 10
    if (num === 10) {
      const gap = document.createElement("div");
      gap.style.width = "40px"; // tuỳ chỉnh độ rộng lối đi
      rowDiv.appendChild(gap);
    }
  });

  // cuối cùng là ghế giữa (số 1)
  const centerSeat = document.createElement("div");
  centerSeat.className = "seat";
  centerSeat.innerText = row + "1";
  centerSeat.dataset.seat = row + "1";
  centerSeat.addEventListener("click", () => toggleSeat(centerSeat));
  rowDiv.appendChild(centerSeat);

// dãy phải (lẻ, từ trong ra ngoài)
for (let i = 1; i <= 4; i++) {
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.innerText = row + oddSeat;
  seat.dataset.seat = row + oddSeat;
  seat.addEventListener("click", () => toggleSeat(seat));
  rowDiv.appendChild(seat);
  oddSeat += 2;
}

// lối đi phải
const gapRight = document.createElement("div");
gapRight.style.width = "40px";
rowDiv.appendChild(gapRight);

// block phải (lẻ, tiếp tục từ trong ra ngoài)
for (let i = 1; i <= 6; i++) {
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.innerText = row + oddSeat;
  seat.dataset.seat = row + oddSeat;
  seat.addEventListener("click", () => toggleSeat(seat));
  rowDiv.appendChild(seat);
  oddSeat += 2;
}
  document.getElementById("front-section").appendChild(rowDiv);
});

    //---------------------------------------------------- TẦNG 1 - KHU SAU (H,I,J,K,L,M,N,O,P)--------------------------------------------//
    const backRows = ["H","I","J","K","L","M","N","O","P"];
    backRows.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      // thêm label hàng (A, B, C...)
      const rowLabel = document.createElement("div");
      rowLabel.className = "row-label";
      rowLabel.innerText = row;
      rowDiv.appendChild(rowLabel);

      // dãy trái (lẻ)
      for (let i = 14; i >= 1; i--) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText = row + (i*2);
        seat.dataset.seat = row + (i*2);
        seat.addEventListener("click", () => toggleSeat(seat));
        rowDiv.appendChild(seat);
      }

      // khoảng trống lối đi
      const gap = document.createElement("div");
      gap.style.width = "40px";
      rowDiv.appendChild(gap);

      // dãy phải (chẵn)
      for (let i = 1; i <= 14; i++) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText = row + (i*2 - 1);
        seat.dataset.seat = row + (i*2 - 1);
        seat.addEventListener("click", () => toggleSeat(seat));
        rowDiv.appendChild(seat);
      }

      document.getElementById("back-section").appendChild(rowDiv);
    });

    //-------------------------------------------------------------- TẦNG 2 (LA-LH)------------------------------------------------//
    const floor2Rows = ["LA","LB","LC","LD","LE","LF","LG","LH"];
    floor2Rows.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      // thêm label hàng (A, B, C...)
      const rowLabel = document.createElement("div");
      rowLabel.className = "row-label";
      rowLabel.innerText = row;
      rowDiv.appendChild(rowLabel);

      // dãy trái (lẻ)
      for (let i = 16; i >= 1; i--) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText = row + (i*2);
        seat.dataset.seat = row + (i*2);
        seat.addEventListener("click", () => toggleSeat(seat));
        rowDiv.appendChild(seat);
      }

      // khoảng trống bàn kỹ thuật
      const gap = document.createElement("div");
      gap.style.width = "80px";
      rowDiv.appendChild(gap);

      // dãy phải (chẵn)
      for (let i = 1; i <= 16; i++) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText = row + (i*2 - 1);
        seat.dataset.seat = row + (i*2 - 1);
        seat.addEventListener("click", () => toggleSeat(seat));
        rowDiv.appendChild(seat);
      }

      document.getElementById("floor2-section").appendChild(rowDiv);
    });


// Load lại ghế đã chọn từ localStorage khi mở trang
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("selectedSeats") || "[]");
  saved.forEach(seatId => {
    const seat = document.querySelector(`[data-seat='${seatId}']`);
    if (seat) {
      selectedSeats.add(seatId);
      seat.classList.add("selected");
    }
  });
  updateSelectedList();
});

// Lưu vào localStorage mỗi khi có thay đổi
function saveSeats() {
  localStorage.setItem("selectedSeats", JSON.stringify(Array.from(selectedSeats)));
}

function toggleSeat(seat) {
  if (seat.classList.contains("occupied")) return;

  const seatId = seat.dataset.seat;
  if (selectedSeats.has(seatId)) {
    selectedSeats.delete(seatId);
    seat.classList.remove("selected");
  } else {
    selectedSeats.add(seatId);
    seat.classList.add("selected");
  }
  updateSelectedList();
  saveSeats(); // 👉 Lưu sau khi chọn/bỏ chọn
}