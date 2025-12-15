import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Alert,
  Card,
  Typography,
  ConfigProvider,
  theme,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (values.email === "admin@cinema.com" && values.password === "admin123") {
      const mockToken = btoa(`${values.email}:boMayLaAdmin`);
      localStorage.setItem("token", mockToken);
      window.location.href = "/";
    } else {
      setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }

    setIsLoading(false);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#6366f1",
          colorBgContainer: "#1e293b",
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
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
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                marginBottom: "16px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
              }}
            >
              <VideoCameraOutlined
                style={{ fontSize: "32px", color: "white" }}
              />
            </div>
            <Title level={2} style={{ marginBottom: "8px", fontWeight: 700 }}>
              Cinema Admin Portal
            </Title>
            <Paragraph style={{ color: "#94a3b8", marginBottom: 0 }}>
              Đăng nhập để quản lý hệ thống
            </Paragraph>
          </div>

          <Card
            style={{
              borderRadius: "16px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
              background: "#1e293b",
              border: "1px solid #334155",
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
                label={<span style={{ color: "#e2e8f0" }}>Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#64748b" }} />}
                  placeholder="admin@cinema.com"
                  autoComplete="email"
                  style={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    color: "white",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#e2e8f0" }}>Mật khẩu</span>}
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#64748b" }} />}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    color: "white",
                  }}
                />
              </Form.Item>

              {error && (
                <Form.Item>
                  <Alert
                    message={error}
                    type="error"
                    showIcon
                    closable
                    style={{
                      background: "#450a0a",
                      borderColor: "#7f1d1d",
                      color: "#fca5a5",
                    }}
                  />
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
                      "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                    border: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
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
                borderTop: "1px solid #334155",
              }}
            >
              <Paragraph
                style={{
                  textAlign: "center",
                  color: "#94a3b8",
                  marginBottom: "12px",
                }}
              >
                Tài khoản demo:
              </Paragraph>
              <div
                style={{
                  background: "#0f172a",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  border: "1px solid #1e293b",
                }}
              >
                <div style={{ marginBottom: "4px" }}>
                  <Text style={{ color: "#64748b" }}>Email: </Text>
                  <Text style={{ color: "#e2e8f0" }}>admin@cinema.com</Text>
                </div>
                <div>
                  <Text style={{ color: "#64748b" }}>Mật khẩu: </Text>
                  <Text style={{ color: "#e2e8f0" }}>admin123</Text>
                </div>
              </div>
            </div>
          </Card>

          <Paragraph
            style={{
              textAlign: "center",
              color: "#64748b",
              marginTop: "24px",
              fontSize: "14px",
            }}
          >
            © 2025 Cinema Management System. All rights reserved.
          </Paragraph>
        </div>
      </div>
    </ConfigProvider>
  );
}
