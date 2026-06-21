"use client";

import { useState } from "react";
import { AdminSidebar } from "../../components/Admin/AdminSidebar";
import { AdminOverview } from "../../components/Admin/AdminOverview";
import { AdminPredictions } from "../../components/Admin/AdminPrediction";
import { AdminUsers } from "../../components/Admin/AdminUsers";
import { AdminDataset } from "../../components/Admin/AdminDataset";
import { AdminSettings } from "../../components/Admin/AdminSettings";

export type NavKey = "overview" | "predictions" | "users" | "dataset" | "settings";

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState<NavKey>("overview");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <main className="ml-56 flex-1 p-7">
        {activeNav === "overview"     && <AdminOverview    onNavChange={setActiveNav} />}
        {activeNav === "predictions"  && <AdminPredictions />}
        {activeNav === "users"        && <AdminUsers />}
        {activeNav === "dataset"      && <AdminDataset />}
        {activeNav === "settings"     && <AdminSettings />}
      </main>
    </div>
  );
}