import { Metadata } from "next";
import { ProtectedRoute } from "@/components/protected-route";
import { SettingsForm } from "./components/settings-form";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
};

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>
        <SettingsForm />
      </div>
    </ProtectedRoute>
  );
}
