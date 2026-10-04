const { getOrders, getRole, updateOrder } = require('../../utils/store')

Page({
  data: { order: null, role: 'owner' },
  onLoad(query) { this.orderId = query.id },
  onShow() { this.load() },
  load() { this.setData({ order: getOrders().find(item => item.id === this.orderId), role: getRole() }) },
  accept() { updateOrder(this.orderId, { status: 'accepted', statusText: '待上门', provider: '宠伴体验官' }); this.load(); wx.showToast({ title: '接单成功' }) },
  start() { updateOrder(this.orderId, { status: 'serving', statusText: '服务中' }); this.load(); wx.showToast({ title: '已定位打卡' }) },
  finish() {
    updateOrder(this.orderId, { status: 'done', statusText: '已完成', report: { summary: '已添粮换水，清理猫砂并陪玩 20 分钟。宠物精神和排泄情况正常。', photos: ['📷', '📷', '📷'] } }); this.load(); wx.showToast({ title: '报告已提交' })
  }
})
