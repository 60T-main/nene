(function () {
  var introOverlay = document.getElementById("introOverlay");
  var introAngel = document.getElementById("introAngel");

  function runIntro() {
    if (!introOverlay || !introAngel) {
      document.body.classList.remove("intro-locked");
      document.body.classList.add("intro-ready");
      return;
    }

    window.scrollTo(0, 0);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        introAngel.classList.add("is-centered");
      });
    });

    setTimeout(function () {
      introAngel.classList.remove("is-centered");
      introAngel.classList.add("is-exiting");
      document.body.classList.add("intro-ready");
    }, 2200);

    setTimeout(function () {
      introOverlay.classList.add("is-hidden");
      document.body.classList.remove("intro-locked");
    }, 3300);

    setTimeout(function () {
      introOverlay.style.display = "none";
    }, 4300);
  }

  if (document.readyState === "complete") {
    runIntro();
  } else {
    window.addEventListener("load", runIntro);
  }

  var timelineData = {
    arrival: {
      img: "dove-r.png",
      title: "შუაგული",
      body: "18:00 - სტუმრების მიღება. გთხოვთ, არ დააგვიანოთ."
    },
    blessing: {
      img: "dove-r.png",
      title: "ნათლობის ცერემონია",
      body: "18:30 - ნენეს დალოცვა და ნათლობის საზეიმო მომენტი."
    },
    celebration: {
      img: "dove-r.png",
      title: "სადღესასწაულო სუფრა",
      body: "19:00 - ერთად აღვნიშნავთ ნენეს ნათლობის დღეს."
    }
  };

  var tlItems = document.querySelectorAll(".tl-item");
  var tlDove = document.getElementById("tlDove");
  var modalOverlay = document.getElementById("modalOverlay");
  var modalImg = document.getElementById("modalImg");
  var modalTitle = document.getElementById("modalTitle");
  var modalBody = document.getElementById("modalBody");
  var modalClose = document.getElementById("modalClose");
  var doveBaseTop = -120;

  function moveDoveTo(item) {
    if (!tlDove || !item) return;

    var dotCenterY = item.offsetTop + item.offsetHeight / 2;
    doveBaseTop = dotCenterY - tlDove.offsetHeight + 28;
    tlDove.style.top = doveBaseTop + "px";
    tlDove.classList.add("visible");
  }

  function openModal(id) {
    var data = timelineData[id];
    if (!data || !modalOverlay || !modalImg || !modalTitle || !modalBody) return;

    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalBody.textContent = data.body;
    modalOverlay.classList.add("active");
    modalOverlay.removeAttribute("aria-hidden");
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
  }

  tlItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      if (!tlDove) return;
      tlDove.style.transition = "top 0.4s ease, opacity 0.4s ease, background-color 1.5s ease, color 1.5s ease, border-color 1.5s ease";
      tlDove.style.top = doveBaseTop + 18 + "px";
    });

    item.addEventListener("mouseleave", function () {
      if (!tlDove) return;
      tlDove.style.transition = "top 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease, background-color 1.5s ease, color 1.5s ease, border-color 1.5s ease";
      tlDove.style.top = doveBaseTop + "px";
    });
  });

  document.querySelectorAll(".tl-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var item = card.closest(".tl-item");
      if (!item) return;

      tlItems.forEach(function (timelineItem) {
        timelineItem.classList.remove("active");
      });

      item.classList.add("active");
      moveDoveTo(item);
      openModal(item.dataset.id);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (event) {
      if (event.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });
})();
