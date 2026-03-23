import { Button, Form, Input, Select } from "antd";

function AddPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form layout="vertical" className="space-y-6">
        {/* Text input */}
        <Form.Item label="Input">
          <Input placeholder="input" />
        </Form.Item>

        {/* Select */}
        <Form.Item label="Danh mục" name="category">
          <Select placeholder="Chọn danh mục" options={[]} />
        </Form.Item>

        {/* Submit button */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPage;
