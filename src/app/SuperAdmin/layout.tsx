import type React from "react"
import DashboardLayout from "./DashboardLayout"

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>
}

