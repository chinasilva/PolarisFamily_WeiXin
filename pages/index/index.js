
const util = require('../../utils/util.js');
const util2 = require('../../utils/util2.js');

Page({
    data: {
        /**
         * 页面配置
         */
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        // 幻灯片数据
        topStories: [],
        // 精选数据
        datalist: [],
        // 数据
        dataThemes: [],
        dataListDateCurrent: 0,      // 当前日期current
        dataListDateCount: 0,      // 请求次数
        // 显示加载更多 loading
        hothidden: true,
        // loading
        hidden: true,
        /**
         * 滑动面板参数配置
         */
        indicatorDots: false,    // 是否显示面板指示点
        autoplay: false,    // 是否自动切换
        interval: 5000,     // 自动切换时间间隔
        duration: 1000,     // 滑动动画时长
    },

    /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function (options) {
        var that = this;
        /**
         * 获取系统信息
         */
        wx.getSystemInfo({

            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
        /**
         * 显示 loading
         */
        that.setData({
            hidden: false
        });
        
        //请求图片
         util2.AJAX( "Images/getslider", function( res ) {
            // 重新写入数据
            that.setData( {
                images: res.data,
            });
        });
        // 请求日报数据
        util2.AJAX("Themes/getall", function (res) {
            var arr = res.data;
            // 重新写入数据
            that.setData({
                dataThemes: arr,
            });
        });
    },
    onReady: function () {
        // 页面渲染完成
        var that = this;

        // 数据加载完成后 延迟隐藏loading
        setTimeout(function () {
            that.setData({
                hidden: true
            })
        }, 500);
    },

    /**
     * 事件处理
     * scrolltolower 自动加载更多
     */
    scrolltolower: function (e) {

        var that = this;

        // 加载更多 loading
        that.setData({
            hothidden: true
        })

        var currentDate = this.data.dataListDateCurrent;

        // 如果加载数据超过10条
        if (this.data.dataListDateCount >= 8) {

            // 加载更多 loading
            that.setData({
                hothidden: false
            });

        } else {

        }
    },
    /**
     * 滑动切换tab
     */
    bindChange: function (e) {

        var that = this;
        that.setData({ currentTab: e.detail.current });

    },
    /**
     * 点击tab切换
     */
    swichNav: function (e) {

        var that = this;

        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }


    },
})