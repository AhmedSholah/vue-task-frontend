import { notification } from "ant-design-vue";

export type NotificationType = "success" | "info" | "warning" | "error";

export const showSuccessNotification = (
  message: string,
  description?: string
) => {
  notification.success({
    message,
    description,
  });
};

export const showErrorNotification = (
  message: string,
  description?: string
) => {
  notification.error({
    message,
    description,
  });
};
