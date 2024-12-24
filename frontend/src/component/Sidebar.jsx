import { Users } from 'lucide-react';
import React from "react";

export function Sidebar() {
    return (
        <div className="w-64 bg-white border-r h-screen p-6">
            <div className="mb-8">
                <img src="/images/quyl-logo.svg" alt="Quyl Logo" className="h-8" />
            </div>

            <nav className="space-y-2">
                <SidebarItem icon={<Users />} label="Students" active />
            </nav>
        </div>
    );
}

function SidebarItem({ icon, label, active = false }) {
    return (
        <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer
      ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
      <span className={`${active ? 'text-primary' : 'text-gray-500'}`}>
        {icon}
      </span>
            <span className={`${active ? 'font-medium text-primary' : 'text-gray-700'}`}>
        {label}
      </span>
        </div>
    );
}
