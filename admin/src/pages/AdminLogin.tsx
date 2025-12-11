import { useState } from "react";
import { Form, Input, Button, Alert, Card, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

// interface AdminLoginProps {
//   onLogin: (token: string) => void;
// }

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (values.email === "admin@cinema.com" && values.password === "admin123") {
      //   const mockToken = btoa(`${values.email}:${Date.now()}`);
      //   onLogin(mockToken);
    } else {
      setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }

    setIsLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #fae8ff 100%)",
        padding: "16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "450px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #2563eb 0%, #9333ea 100%)",
              marginBottom: "16px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <VideoCameraOutlined style={{ fontSize: "32px", color: "white" }} />
          </div>
          <Title level={2} style={{ marginBottom: "8px" }}>
            Cinema Admin Portal
          </Title>
          <Paragraph style={{ color: "#6b7280", marginBottom: 0 }}>
            Đăng nhập để quản lý hệ thống
          </Paragraph>
        </div>

        <Card
          style={{
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
                placeholder="admin@cinema.com"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>

            {error && (
              <Form.Item>
                <Alert message={error} type="error" showIcon closable />
              </Form.Item>
            )}

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                style={{
                  height: "44px",
                  background:
                    "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)",
                  border: "none",
                  fontWeight: 500,
                }}
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </Form.Item>
          </Form>

          <div
            style={{
              marginTop: "24px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Paragraph
              style={{
                textAlign: "center",
                color: "#6b7280",
                marginBottom: "12px",
              }}
            >
              Tài khoản demo:
            </Paragraph>
            <div
              style={{
                background: "#f9fafb",
                borderRadius: "8px",
                padding: "12px 16px",
              }}
            >
              <div style={{ marginBottom: "4px" }}>
                <Text style={{ color: "#6b7280" }}>Email: </Text>
                <Text style={{ color: "#374151" }}>admin@cinema.com</Text>
              </div>
              <div>
                <Text style={{ color: "#6b7280" }}>Mật khẩu: </Text>
                <Text style={{ color: "#374151" }}>admin123</Text>
              </div>
            </div>
          </div>
        </Card>

        <Paragraph
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginTop: "24px",
            fontSize: "14px",
          }}
        >
          © 2025 Cinema Management System. All rights reserved.
        </Paragraph>
      </div>
    </div>
  );
}
