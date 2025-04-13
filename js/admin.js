function initAdmin(mainCell) {
    // Users Grid
    const grid = new dhx.Grid(null, {
        columns: [
            { id: "id", header: [{ text: "User ID" }], width: 150 },
            { id: "password", header: [{ text: "Password" }], width: 150 },
            { id: "role", header: [{ text: "Role" }], width: 100 },
        ],
        adjustable: true,
        autoWidth: true,
        editable: true,
        sortable: true,
        data: JSON.parse(localStorage.getItem("users")),
    });

    // Add User Form
    const form = new dhx.Form(null, {
        rows: [
            { type: "input", name: "id", label: "User ID", required: true },
            { type: "input", name: "password", label: "Password", required: true },
            { type: "combo", name: "role", label: "Role", data: ["admin", "user"], required: true },
            { type: "button", value: "Add User", submit: true },
        ],
    });

    const popup = new dhx.Popup();
    popup.attach(form);

    // Toolbar
    const toolbar = new dhx.Toolbar(null, {
        data: [
            { type: "button", id: "add", value: "Add User", icon: "dxi dxi-plus" },
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

    // Add User
    toolbar.events.on("click", (id) => {
        if (id === "add") {
            form.clear();
            popup.show();
        }
    });

    form.events.on("click", (id) => {
        if (id === "add_user") {
            const newUser = form.getValue();
            const users = JSON.parse(localStorage.getItem("users"));
            if (users.find((u) => u.id === newUser.id)) {
                alert("User ID already exists");
                return;
            }
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            grid.data.parse(users);
            popup.hide();
        }
    });
}
