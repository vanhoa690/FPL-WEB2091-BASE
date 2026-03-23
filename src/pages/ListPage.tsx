import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, Popconfirm, Table } from "antd";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function ListPage() {
  const [idEdit, setIdEdit] = useState<number | null>(null);

  const qc = useQueryClient();
  const onFinish = (values: any) => {
    if (idEdit) {
      updateMovies(values);
    } else {
      mutate(values);
    }
  };
  const { mutate } = useMutation({
    mutationFn: async (values: any) => {
      return await axios.post("http://localhost:3000/movies", values);
    },
    onSuccess: () => {
      message.success("Done");
      qc.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const { mutate: deleteMovie } = useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete("http://localhost:3000/movies/" + id);
    },
    onSuccess: () => {
      message.success("Done");
      qc.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const { mutate: updateMovies } = useMutation({
    mutationFn: async (values: any) => {
      return await axios.put("http://localhost:3000/movies/" + idEdit, values);
    },
    onSuccess: () => {
      message.success("Done");
      qc.invalidateQueries({ queryKey: ["movies"] });
      form.resetFields();
      setIdEdit(null);
    },
  });

  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/movies");
      return data;
    },
  });

  const { data: movieDetail } = useQuery({
    queryKey: ["movie", idEdit],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/movies/" + idEdit,
      );
      return data;
    },
    enabled: !!idEdit,
  });
  const [form] = Form.useForm();
  useEffect(() => {
    if (movieDetail) {
      console.log(movieDetail);
      form.setFieldsValue(movieDetail);
    }
  }, [movieDetail]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <>
          <Popconfirm
            title={"Delete?"}
            onConfirm={() => deleteMovie(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Button danger onClick={() => setIdEdit(record.id)}>
            Edit
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="p-6">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

        <Form layout="vertical" onFinish={onFinish} form={form}>
          {/* Text input */}
          <Form.Item label="Title" name="title">
            <Input placeholder="title" />
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

      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} rowKey={"id"} />
      </div>
    </div>
  );
}

export default ListPage;
