const ctx = document.getElementById('trendsChart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  // Scales
  data: {
    labels: Array.from({ length: 23 }, (_, i) => i), // Data points remain the same
    datasets: [
     {
        label: 'Today',
        data: [20, 18, 16, 15, 14, 16, 20, 28, 38, 42, 40, 36, 32, 28, 25, 26, 28, 30, 32, 34, 33, 30, 28],
        borderColor: '#3366FF',
        backgroundColor: 'rgba(51, 102, 255, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3366FF',

        // ONE point (index 10 = value 40)
        pointRadius: (ctx) => ctx.dataIndex === 10 ? 6 : 0,
        pointHoverRadius: (ctx) => ctx.dataIndex === 10 ? 8 : 0
        },
      {
        label: 'Yesterday',
        data: [8, 5, 4, 6, 10, 18, 28, 42, 50, 46, 38, 30, 24, 20, 38, 44, 42, 36, 32, 28, 25, 23, 22],
        borderColor: '#AAB2C8',
        backgroundColor: 'rgba(170, 178, 200, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4
      }
    ]
  },

  // Chart Graph Options
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        min: 0,
        max: 60,         
        ticks: {
          color: '#AAB2C8',
          stepSize: 10     
        },
        grid: { display: false }
      },
      y: {
        min: 0,
        max: 60,        
        grid: { color: '#F0F2F6' },
        ticks: { color: '#AAB2C8', stepSize: 10 },
        position: 'right'
      }
    }
  }
});

const storyLines = [
  "It was a quiet night on the dashboard...",
  "Numbers flickered, charts whispered secrets.",
  "A single click changed everything.",
  "The system came alive.",
  "And you... were now part of it."
];

const storyText = document.getElementById("storyText");
const modal = document.getElementById("storyModal");
const audio = document.getElementById("storyAudio");

let lineIndex = 0;

modal.addEventListener("shown.bs.modal", () => {
  storyText.innerHTML = "";
  lineIndex = 0;

  // Play audio
  audio.currentTime = 0;
  audio.play();

  showNextLine();
});

function showNextLine() {
  if (lineIndex < storyLines.length) {
    const p = document.createElement("div");
    p.textContent = storyLines[lineIndex];
    p.style.opacity = 0;
    p.classList.add("mb-2");

    storyText.appendChild(p);

    setTimeout(() => {
      p.style.transition = "opacity 0.8s";
      p.style.opacity = 1;
    }, 100);

    lineIndex++;
    setTimeout(showNextLine, 1500);
  }
}

// Stop audio when modal closes
modal.addEventListener("hidden.bs.modal", () => {
  audio.pause();
  audio.currentTime = 0;
});