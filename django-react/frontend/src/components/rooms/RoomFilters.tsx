export function RoomFilters({ onFilter }: { onFilter: (f: any) => void }) {
  return (
    <aside className="w-64">
      <select onChange={e => onFilter({ room_type: e.target.value })}>
        <option value="">All Types</option>
        <option value="SINGLE">Single</option>
        <option value="DOUBLE">Double</option>
        <option value="SUITE">Suite</option>
      </select>
    </aside>
  );
}
