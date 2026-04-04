import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function AdminSettingsPage() {
    return (
        <div className="admin-settings-page">
            <Breadcrumbs items={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Settings" }]} />

            <div className="page-header">
                <h1>Admin Settings</h1>
                <p>Manage your portal preferences and configurations.</p>
            </div>

            <div className="settings-content py-8">
                <div className="settings-section max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                    <div className="space-y-4">
                        <div className="setting-item">
                            <label className="block text-sm font-medium text-gray-700">Portal Name</label>
                            <input
                                type="text"
                                defaultValue="mediPortal247"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                                disabled
                            />
                            <p className="mt-1 text-xs text-gray-500">Contact system administrator to change the portal name.</p>
                        </div>

                        <div className="setting-item">
                            <label className="block text-sm font-medium text-gray-700">Primary Domain</label>
                            <input
                                type="text"
                                defaultValue="mediportal247.online"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <div className="settings-section max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-8">
                    <h2 className="text-xl font-semibold mb-4">Security</h2>
                    <p className="text-gray-600 mb-4">Admin accounts can be managed through the database or by contacting support.</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" disabled>
                        Change Admin Password (Coming Soon)
                    </button>
                </div>
            </div>
        </div>
    );
}
