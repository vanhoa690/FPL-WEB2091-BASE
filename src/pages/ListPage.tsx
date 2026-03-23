import { Table } from "antd";

function ListPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={[]} dataSource={[]} />
      </div>
    </div>
  );
}

export default ListPage;
