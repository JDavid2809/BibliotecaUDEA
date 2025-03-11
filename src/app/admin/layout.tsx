import type React from "react"
import DashboardLayout from "./DashboardLayout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>
}

