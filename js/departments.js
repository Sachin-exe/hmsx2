function initDepartments(mainCell) {
    // Initialize departments data
    if (!localStorage.getItem("departments")) {
        localStorage.setItem("departments", JSON.stringify([
            { id: 1, name: "Cardiology", head: "Dr. Vikram Singh" },
            { id: 2, name: "Neurology", head: "Dr. Anjali Desai" },
            { id: 3, name: "Orthopedics", head: "Dr. Sanjay Kumar" },
        ]));
    }

    // Departments Grid
    const grid = new dhx.Grid(null, {
        columns: [
            { id: "id", header: [{ text: "ID" }], width: 100 },
            { id: "name", header: [{ text: "Name" }], width: 200 },
            { id: "head", header: [{ text: "Head" }], width: 200 },
        ],
        adjustable: true,
        autoWidth: true,
        editable: true,
        sortable: true,
        data: JSON.parse(localStorage.getItem("departments")),
    });

    // Add Department Form
    const form = new dhx.Form(null, {
        rows: [
            { type: "input", name: "name", label: "Name", required: true },
            { type: "input", name: "head", label: "Head", required: true },
            { type: "button", value: "Add Department", submit: true },
        ],
    });

    const popup = new dhx.Popup();
    popup.attach(form);

    // Toolbar
    const toolbar = new dhx.Toolbar(null, {
        data: [
            { type: "button", id: "add", value: "Add Department", icon: "dxi dxi-plus" },
            { type: "input", id: "search", placeholder: "Search departments...", icon: "dxi dxi-magnify" },
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

    // Add Department
    toolbar.events.on("click", (id) => {
        if (id === "add") {
            form.clear();
            popup.show();
        }
    });

    form.events.on("click", (id) => {
        if (id === "add_department") {
            const newDept = form.getValue();
            newDept.id = Date.now();
            const depts = JSON.parse(localStorage.getItem("departments"));
            depts.push(newDept);
            localStorage.setItem("departments", JSON.stringify(depts));
            grid.data.parse(depts);
            popup.hide();
        }
    });
}
