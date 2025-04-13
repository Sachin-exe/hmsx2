function initPatients(mainCell) {
    // Initialize patients data
    if (!localStorage.getItem("patients")) {
        localStorage.setItem("patients", JSON.stringify([
            { id: 1, name: "Amit Sharma", age: 45, condition: "Stable", last_visit: "2025-04-10" },
            { id: 2, name: "Priya Patel", age: 32, condition: "Critical", last_visit: "2025-04-12" },
            { id: 3, name: "Rohan Gupta", age: 60, condition: "Recovering", last_visit: "2025-04-08" },
        ]));
    }

    // Patient Grid
    const grid = new dhx.Grid(null, {
        columns: [
            { id: "id", header: [{ text: "ID" }], width: 100 },
            { id: "name", header: [{ text: "Name" }], width: 200 },
            { id: "age", header: [{ text: "Age" }], width: 100 },
            { id: "condition", header: [{ text: "Condition" }], width: 150 },
            { id: "last_visit", header: [{ text: "Last Visit" }], width: 150 },
        ],
        adjustable: true,
        autoWidth: true,
        editable: true,
        sortable: true,
        data: JSON.parse(localStorage.getItem("patients")),
    });

    // Add Patient Form
    const form = new dhx.Form(null, {
        rows: [
            { type: "input", name: "name", label: "Name", required: true },
            { type: "input", name: "age", label: "Age", type: "number", required: true },
            { type: "input", name: "condition", label: "Condition", required: true },
            { type: "input", name: "last_visit", label: "Last Visit", type: "date", required: true },
            { type: "button", value: "Add Patient", submit: true },
        ],
    });

    const popup = new dhx.Popup();
    popup.attach(form);

    // Toolbar with Add Patient button
    const toolbar = new dhx.Toolbar(null, {
        data: [
            { type: "button", id: "add", value: "Add Patient", icon: "dxi dxi-plus" },
            { type: "input", id: "search", placeholder: "Search patients...", icon: "dxi dxi-magnify" },
        ],
    });

    // Layout for patients section
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

    // Add Patient
    toolbar.events.on("click", (id) => {
        if (id === "add") {
            form.clear();
            popup.show();
        }
    });

    form.events.on("click", (id) => {
        if (id === "add_patient") {
            const newPatient = form.getValue();
            newPatient.id = Date.now(); // Simple ID generation
            const patients = JSON.parse(localStorage.getItem("patients"));
            patients.push(newPatient);
            localStorage.setItem("patients", JSON.stringify(patients));
            grid.data.parse(patients);
            popup.hide();
        }
    });
}
