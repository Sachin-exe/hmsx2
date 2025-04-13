function initDoctors(mainCell) {
    // Initialize doctors data
    if (!localStorage.getItem("doctors")) {
        localStorage.setItem("doctors", JSON.stringify([
            { id: 1, name: "Dr. Vikram Singh", specialty: "Cardiology", contact: "vikram@hospital.com" },
            { id: 2, name: "Dr. Anjali Desai", specialty: "Neurology", contact: "anjali@hospital.com" },
            { id: 3, name: "Dr. Sanjay Kumar", specialty: "Orthopedics", contact: "sanjay@hospital.com" },
        ]));
    }

    // Doctors Grid
    const grid = new dhx.Grid(null, {
        columns: [
            { id: "id", header: [{ text: "ID" }], width: 100 },
            { id: "name", header: [{ text: "Name" }], width: 200 },
            { id: "specialty", header: [{ text: "Specialty" }], width: 150 },
            { id: "contact", header: [{ text: "Contact" }], width: 200 },
        ],
        adjustable: true,
        autoWidth: true,
        editable: true,
        sortable: true,
        data: JSON.parse(localStorage.getItem("doctors")),
    });

    // Add Doctor Form
    const form = new dhx.Form(null, {
        rows: [
            { type: "input", name: "name", label: "Name", required: true },
            { type: "input", name: "specialty", label: "Specialty", required: true },
            { type: "input", name: "contact", label: "Contact", required: true },
            { type: "button", value: "Add Doctor", submit: true },
        ],
    });

    const popup = new dhx.Popup();
    popup.attach(form);

    // Toolbar
    const toolbar = new dhx.Toolbar(null, {
        data: [
            { type: "button", id: "add", value: "Add Doctor", icon: "dxi dxi-plus" },
            { type: "input", id: "search", placeholder: "Search doctors...", icon: "dxi dxi-magnify" },
        ],
    });

    // Layout
    const layout = new dhx.Layout(null, {
        rows: [
            { id: "toolbar", height: "48px" },
            { id: "grid" },
        ],
    });

    layout.getCell("toolbar").attach(toolbar);
    layout.getCell("grid").attach(grid);
    mainCell.attach(layout);

    // Search
    toolbar.events.on("inputChange", (id, value) => {
        if (id === "search") {
            grid.data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        }
    });

    // Add Doctor
    toolbar.events.on("click", (id) => {
        if (id === "add") {
            form.clear();
            popup.show();
        }
    });

    form.events.on("click", (id) => {
        if (id === "add_doctor") {
            const newDoctor = form.getValue();
            newDoctor.id = Date.now();
            const doctors = JSON.parse(localStorage.getItem("doctors"));
            doctors.push(newDoctor);
            localStorage.setItem("doctors", JSON.stringify(doctors));
            grid.data.parse(doctors);
            popup.hide();
        }
    });
}
