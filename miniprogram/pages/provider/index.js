const { getProviders } = require('../../utils/store')

Page({
  data: { provider: null },
  onLoad(query) { this.setData({ provider: getProviders().find(item => item.id === query.id) || getProviders()[0] }) },
  book() { wx.setStorageSync('pawmate_selected_service', 'feed'); wx.switchTab({ url: '/pages/publish/index' }) }
})
