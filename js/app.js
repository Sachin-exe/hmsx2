function initApp(role) {
    // Layout
    const layout = new dhx.Layout("main", {
        type: "space",
        cols: [
            { width: "250px", id: "sidebar" },
            {
                id: "content",
                rows: [
                    { id: "toolbar", height: "48px" },
                    { id: "main" },
                ],
            },
        ],
    });

    // Sidebar
    const sidebarData = [
        { id: "patients", value: "Patients", icon: "dxi dxi-account" },
        { id: "doctors", value: "Doctors", icon: "dxi dxi-doctor" },
        { id: "departments", value: "Departments", icon: "dxi dxi-hospital" },
    ];
    if (role === "admin") {
        sidebarData.push({ id: "admin", value: "Admin Panel", icon: "dxi dxi-settings" });
    }
    const sidebar = new dhx.Sidebar("sidebar", {
        css: "dhx_sidebar--border_right",
        data: sidebarData,
    });
    layout.getCell("sidebar").attach(sidebar);

    // Toolbar
    const toolbar = new dhx.Toolbar("toolbar", {
        css: "dhx_toolbar--border_bottom",
        data: [
            { type: "spacer" },
            { type: "button", id: "logout", value: "Logout", icon: "dxi dxi-logout" },
        ],
    });
    layout.getCell("toolbar").attach(toolbar);

    // Navigation
    sidebar.events.on("click", (id) => {
        const mainCell = layout.getCell("main");
        if (id === "patients") {
            initPatients(mainCell);
        } else if (id === "doctors") {
            initDoctors(mainCell);
        } else if (id === "departments") {
            initDepartments(mainCell);
        } else if (id === "admin" && role === "admin") {
            initAdmin(mainCell);
        }
    });

    // Default view
    initPatients(layout.getCell("main"));

    // Logout
    toolbar.events.on("click", (id) => {
        if (id === "logout") {
            localStorage.removeItem("currentUser");
            document.getElementById("app").style.display = "none";
            document.getElementById("login").style.display = "block";
            loginForm.clear();
        }
    });
}
