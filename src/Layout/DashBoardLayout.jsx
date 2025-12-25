import React from "react";
import { SiPlatformdotsh } from "react-icons/si";
import { Outlet } from "react-router";

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open min-h-screen">
            {/* Drawer Toggle */}
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* ================= Main Content ================= */}
            <div className="drawer-content flex flex-col ">
                {/* Navbar */}
                <div className="navbar bg-base-300 px-4 lg:hidden">
                    {/* 3-dot button (Mobile only) */}
                    <div className="lg:hidden">
                        <label
                            htmlFor="dashboard-drawer"
                            className="btn btn-ghost btn-sm btn-circle"
                        >
                            {/* Vertical 3 dots icon */}
                            <SiPlatformdotsh size={22} />
                        </label>
                    </div>
                </div>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>

            {/* ================= Sidebar ================= */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="w-80 min-h-full bg-base-200 p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        Sidebar Menu
                    </h2>

                    <ul className="menu gap-1">
                        <li><a>Dashboard</a></li>
                        <li><a>Orders</a></li>
                        <li><a>Users</a></li>
                        <li><a>Settings</a></li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
