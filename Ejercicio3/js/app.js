document.addEventListener("DOMContentLoaded", () => {
  M.Sidenav.init(document.querySelectorAll(".sidenav"));
  M.Tabs.init(document.querySelectorAll(".tabs"));
  M.Modal.init(document.querySelectorAll(".modal"));
  M.Collapsible.init(document.querySelectorAll(".collapsible"));
  M.FormSelect.init(document.querySelectorAll("select"));
  M.Datepicker.init(document.querySelectorAll(".datepicker"), {
    format: "dd/mm/yyyy",
    minDate: new Date(),
    i18n: {
      cancel: "Cancelar",
      clear: "Limpiar",
      done: "Aceptar",
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"]
    },
    onSelect: updateBookingSummary
  });
  M.Timepicker.init(document.querySelectorAll(".timepicker"), {
    twelveHour: false,
    i18n: { cancel: "Cancelar", done: "Aceptar", clear: "Limpiar" },
    onCloseEnd: updateBookingSummary
  });

  setTimeout(() => document.getElementById("pageLoader").classList.add("hidden"), 550);

  const doctorSearch = document.getElementById("doctorSearch");
  const chips = document.querySelectorAll(".filter-chips .chip");
  const doctorItems = document.querySelectorAll(".doctor-item");
  let activeFilter = "todos";

  function filterDoctors() {
    const query = doctorSearch.value.trim().toLowerCase();
    doctorItems.forEach((item) => {
      const byFilter = activeFilter === "todos" || item.dataset.specialty === activeFilter;
      const byText = item.dataset.name.includes(query);
      item.style.display = byFilter && byText ? "" : "none";
    });
  }

  doctorSearch.addEventListener("input", filterDoctors);
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((item) => item.classList.remove("active-filter"));
      chip.classList.add("active-filter");
      activeFilter = chip.dataset.filter;
      filterDoctors();
    });
  });

  document.querySelectorAll("[data-doctor]").forEach((button) => {
    button.addEventListener("click", () => {
      const [name, specialty, info, location] = button.dataset.doctor.split("|");
      document.getElementById("modalName").textContent = name;
      document.getElementById("modalSpecialty").textContent = specialty;
      document.getElementById("modalInfo").textContent = info;
      document.getElementById("modalLocation").textContent = location;
      document.getElementById("modalInitials").textContent = name.split(" ").slice(-2).map((part) => part[0]).join("");
    });
  });

  ["sede", "especialidad", "medico", "fecha", "hora"].forEach((id) => {
    document.getElementById(id).addEventListener("change", updateBookingSummary);
  });

  document.getElementById("bookingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = getBookingFields();
    const missing = Object.values(fields).some((value) => !value);
    if (missing) {
      M.toast({ html: "Completa todos los datos antes de confirmar.", classes: "orange darken-2" });
      updateSteps();
      return;
    }

    const row = document.createElement("tr");
    row.innerHTML = `<td>${fields.fecha} ${fields.hora}</td><td>${fields.especialidad}</td><td>${fields.medico}</td><td>${fields.sede}</td><td><span class="status confirmed">Confirmada</span></td><td><a class="btn-flat action-link">Reprogramar</a></td>`;
    document.getElementById("appointmentsBody").prepend(row);
    M.toast({ html: "Cita confirmada correctamente.", classes: "teal darken-2" });
    document.querySelector('[data-step="5"]').classList.add("active", "done");
  });

  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    M.toast({ html: "Mensaje enviado. Te contactaremos pronto.", classes: "teal darken-2" });
    event.target.reset();
    M.updateTextFields();
  });
});

function getBookingFields() {
  return {
    sede: document.getElementById("sede").value,
    especialidad: document.getElementById("especialidad").value,
    medico: document.getElementById("medico").value,
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value
  };
}

function updateBookingSummary() {
  const fields = getBookingFields();
  const summary = document.getElementById("bookingSummary");
  const values = Object.values(fields);
  const complete = values.every(Boolean);
  summary.classList.toggle("ready", complete);
  summary.innerHTML = complete
    ? `<i class="material-icons-round">task_alt</i><span>${fields.especialidad} con ${fields.medico}, ${fields.fecha} a las ${fields.hora}, sede ${fields.sede}.</span>`
    : `<i class="material-icons-round">info</i><span>Completa los campos para ver el resumen de tu cita.</span>`;
  updateSteps();
}

function updateSteps() {
  const fields = getBookingFields();
  const progress = [fields.sede, fields.especialidad, fields.medico, fields.fecha && fields.hora];
  document.querySelectorAll(".step").forEach((step, index) => {
    step.classList.toggle("done", Boolean(progress[index]));
    step.classList.toggle("active", index === progress.filter(Boolean).length);
  });
}
