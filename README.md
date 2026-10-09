# LƯU HẢI QUÂN · 23730261 · https://github.com/USERNAME/23730261_TH2.git · Stamp 075370 · Số cuối 1 · VARIANT Dưới/phone/shopFirst/selection/B/card

## KTXGo TH2

Ứng dụng React Native CLI + TypeScript đặt đồ và giao tận phòng ký túc xá.

### Tính năng

- Auth Stack đăng nhập bằng số điện thoại theo biến thể MSSV.
- Bottom Tabs gồm Cửa hàng, Giỏ và Tôi; badge giỏ lấy từ Zustand.
- Home dùng FlashList 2 cột, debounce 400ms, pull-to-refresh.
- Dữ liệu Fake Store API qua Axios instance và TanStack Query.
- Detail lấy dữ liệu từ cache, thêm giỏ và haptic selection.
- Giỏ hàng Zustand persist với AsyncStorage.
- Location xử lý granted, denied, blocked; tính Haversine và phí ship công thức B.
- Watermark định danh hiển thị phía dưới mọi màn hình.

### Chạy dự án

```bash
npm install
npm run android
```

Với iOS, chạy `bundle install`, `bundle exec pod install` trong thư mục `ios`, sau đó `npm run ios`.

### Ảnh minh chứng

Sau khi chạy máy ảo, lưu ảnh vào:

- `docs/screenshot-th2-home.png`
- `docs/screenshot-th2-cart.png`

Thay `USERNAME` ở dòng đầu bằng tài khoản GitHub trước khi nộp.
