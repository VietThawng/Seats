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
          seat.innerText = seatNumber;
          seat.dataset.seat = seatNumber;

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
   // Tầng 1 - khu trước (A-G) chia 3 block, có lối đi
const frontRows = ["A","B","C","D","E","F","G"];
frontRows.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "row";

let evenSeat = 2;
let oddSeat = 3;

// block trái (chẵn, giảm dần về giữa)
let leftSeats = [];
for (let i = 1; i <= 6; i++) {
  leftSeats.push(evenSeat);
  evenSeat += 2;
}
leftSeats.reverse().forEach(num => {
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.innerText = num;
  seat.dataset.seat = num;
  seat.addEventListener("click", () => toggleSeat(seat));
  rowDiv.appendChild(seat);
});

// lối đi trái
const gapLeft = document.createElement("div");
gapLeft.style.width = "40px";
rowDiv.appendChild(gapLeft);

// block giữa (chẵn, tiếp tục tăng nhưng vẫn xếp từ ngoài vào trong)
let middleSeats = [];
for (let i = 1; i <= 4; i++) {
  middleSeats.push(evenSeat);
  evenSeat += 2;
}
middleSeats.reverse().forEach(num => {
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.innerText = num;
  seat.dataset.seat = num;
  seat.addEventListener("click", () => toggleSeat(seat));
  rowDiv.appendChild(seat);
});

// ghế giữa
const centerSeat = document.createElement("div");
centerSeat.className = "seat";
centerSeat.innerText = "1";
centerSeat.dataset.seat = "1";
centerSeat.addEventListener("click", () => toggleSeat(centerSeat));
rowDiv.appendChild(centerSeat);

// dãy phải (lẻ, từ trong ra ngoài)
for (let i = 1; i <= 4; i++) {
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.innerText = oddSeat;
  seat.dataset.seat = oddSeat;
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
  seat.innerText = oddSeat;
  seat.dataset.seat = oddSeat;
  seat.addEventListener("click", () => toggleSeat(seat));
  rowDiv.appendChild(seat);
  oddSeat += 2;
}



  document.getElementById("front-section").appendChild(rowDiv);
});

    // Tầng 1 - khu sau (H-P) - chia trái/phải
    const backRows = ["H","I","J","K","L","M","N","O","P"];
    backRows.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      // dãy trái (lẻ)
      for (let i = 1; i <= 14; i++) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText =  (i*2);
        seat.dataset.seat =  (i*2);
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
        seat.innerText =  (i*2 - 1);
        seat.dataset.seat =  (i*2 - 1);
        seat.addEventListener("click", () => toggleSeat(seat));
        rowDiv.appendChild(seat);
      }

      document.getElementById("back-section").appendChild(rowDiv);
    });

    // Tầng 2 (LA-LH)
    const floor2Rows = ["LA","LB","LC","LD","LE","LF","LG","LH"];
    floor2Rows.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      // dãy trái (lẻ)
      for (let i = 1; i <= 16; i++) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText =  (i*2);
        seat.dataset.seat =  (i*2);
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
        seat.innerText =  (i*2 - 1);
        seat.dataset.seat = (i*2 - 1);
        seat.addEventListener("click", () => toggleSeat(seat));
        rowDiv.appendChild(seat);
      }

      document.getElementById("floor2-section").appendChild(rowDiv);
    });