const { getRole, setRole, getOrders } = require('../../utils/store')

Page({
  data: { role: 'owner', orderCount: 0, doneCount: 0 },
  onShow() {
    const orders = getOrders(); this.setData({ role: getRole(), orderCount: orders.length, doneCount: orders.filter(item => item.status === 'done').length })
  },
  switchRole(e) {
    const role = e.currentTarget.dataset.role; setRole(role); getApp().globalData.role = role; this.setData({ role }); wx.showToast({ title: role === 'owner' ? '已切换为宠物主人' : '已切换为服务者', icon: 'none' })
  },
  goOrders() { wx.switchTab({ url: '/pages/orders/index' }) },
  resetDemo() { wx.removeStorageSync('pawmate_orders'); this.onShow(); wx.showToast({ title: '演示订单已清空', icon: 'none' }) }
})
