const card = document.getElementById("card");
const cardInner = card.querySelector(".card-inner");
const copyBtn = document.getElementById("copy-btn");
const toast = document.getElementById("toast");

const contactInfo = `김태헌 | SideOnAI 대표
이메일: th@sideonai.com
연락처: 010-1111-1111
LinkedIn: https://www.linkedin.com/
YouTube: https://www.youtube.com/@ai-study`;

// 3D tilt effect
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -8;
  const rotateY = ((x - centerX) / centerX) * 8;

  cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
  cardInner.style.transform = "rotateX(0) rotateY(0)";
});

// Copy contact info
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(contactInfo);
    showToast("연락처가 클립보드에 복사되었습니다!");
  } catch {
    showToast("복사에 실패했습니다. 직접 선택해 주세요.");
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Pupils follow cursor
document.addEventListener("mousemove", (e) => {
  const pupils = document.querySelectorAll(".pupil");
  const avatar = document.querySelector(".avatar");
  if (!avatar) return;

  const rect = avatar.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = (e.clientX - centerX) / rect.width;
  const dy = (e.clientY - centerY) / rect.height;

  const eyeBases = [
    { cx: 83, cy: 99 },
    { cx: 119, cy: 99 },
  ];

  pupils.forEach((pupil, i) => {
    const base = eyeBases[i];
    const offsetX = Math.max(-2.5, Math.min(2.5, dx * 10));
    const offsetY = Math.max(-2, Math.min(2, dy * 7));
    pupil.setAttribute("cx", base.cx + offsetX);
    pupil.setAttribute("cy", base.cy + offsetY);
  });
});
