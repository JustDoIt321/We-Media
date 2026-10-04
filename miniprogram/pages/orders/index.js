const { getOrders, getRole } = require('../../utils/store')

Page({
  data: { orders: [], role: 'owner', filter: 'all' },
  onShow() { this.load() },
  load() {
    const role = getRole(); let orders = getOrders()
    if (role === 'provider') orders = orders.filter(item => item.provider || item.status === 'waiting')
    this.setData({ role, orders })
  },
  viewTask(e) { wx.navigateTo({ url: `/pages/task/index?id=${e.currentTarget.dataset.id}` }) }
})
