/* eslint-disable react/prop-types */
import React from "react";

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <span
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></span>
      <div className="bg-white rounded-lg max-w-2xl w-full  max-h-[90vh] overflow-y-auto relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Chi tiết đơn hàng #{order.order_id}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">Thông tin đơn hàng</h3>
              <p>Ngày đặt: {order.created_at}</p>
              <p>
                Trạng thái:{" "}
                {order.order_status
                  .toLocaleLowerCase()
                  .replace("pending", "Chờ xác nhận")
                  .replace("preparing", "Đang chuẩn bị")
                  .replace("delivery", "Đang giao")
                  .replace("completed", "Hoàn thành")
                  .replace("cancel", "Đã hủy")}
              </p>
              <p>Ghi chú: {order.shipping_info.note || "Không có ghi chú"}</p>
              <p>Tổng tiền: {parseInt(order.total_price).toLocaleString()}đ</p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">Thông tin giao hàng</h3>
              <p>Địa chỉ: {order.shipping_info.address}</p>
              <p>Số điện thoại: {order.shipping_info.phone}</p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">Thông tin thanh toán</h3>
              <p>
                Phương thức:{" "}
                {order.payment.payment_method === "cash"
                  ? "Tiền mặt"
                  : "Thẻ tín dụng"}
              </p>
              <p>
                Mã giảm giá:{" "}
                {order.discount.code ? order.discount.code : "Không có"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Sản phẩm ({order.products.length})
              </h3>
              {order.products.map((product, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <p className="font-medium">{product.product_name}</p>
                    <p className="text-sm text-gray-500">
                      Số lượng: {product.quantity} x{" "}
                      {parseInt(product.price).toLocaleString()}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
