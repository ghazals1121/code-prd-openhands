export function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      <div className="border rounded p-4"><p className="text-sm text-gray-500">Total Bookings</p><p className="text-2xl font-bold">12</p></div>
      <div className="border rounded p-4"><p className="text-sm text-gray-500">Upcoming</p><p className="text-2xl font-bold">3</p></div>
      <div className="border rounded p-4"><p className="text-sm text-gray-500">Total Spent</p><p className="text-2xl font-bold">$4,200</p></div>
    </div>
  );
}
