
const util = require( '../../utils/util.js' );
const util2 = require( '../../utils/util2.js' );
var url=null;
Page( {
    data: {
        // text:"这是一个页面"
        data: [],
        databody: null,
        title2:null,
        comments : [],  // 评论

        winHeight: 0,   // 设备高度

        // 弹窗
        modalHidden: true,
        modalValue: null,

        /**
         * 分享配置
         */
        shareShow: 'none',
        shareOpacity: {},
        shareBottom: {},
    },
    
    onLoad: function( options ) {
        // 页面初始化 options 为页面跳转所带来的参数
        var that = this
        var id = options.id;
        var abc=null;
       // var dataurl=null;
        // 请求内容数据
         //    util.AJAX( dataurl, function( res ) {
        util.AJAX( id, function( res ) {
            var  arr = res.data;
        //去除注释
        var  result = arr.replace(/<!--.*-->/g, '');
        //匹配body体
        var body= result.match(/<body.*?>(.|\s|\r|\n|\f)*<\/body>/g).toString();
        //body=body.replace(/<document.*/g,'').toString();
        //去除script体
        body=body.replace(/<script[^>]*>([^<])*|([^>]*)<*\/script>/g,'').toString();
        
            body = body.match(/<[^>]*>([^<])*|<[^>]*>/g);
            var ss = [];
            var vv = [];
            for( var i = 0, len = body.length; i < len;i++ ) {
                ss[ i ] = /<img.*?>/.test( body[ i ] );
                vv[i]=/<iframe.*?>/.test( body[ i ] );
                if( ss[ i ] || vv[i]) {
                    body[ i ] = body[ i ].match( /[a-zA-z]+:\/\/[^\s]*/g );
                } else {
                    body[ i ] = body[ i ].replace( /<[^>]*>/g, '' )
                        .replace( /&nbsp;/g, '' )
                        .replace( /&ldquo;/g, '' )
                        .replace( /&rdquo;/g, '' )
                        .replace( /\s/g, '' )
                        .replace( /\n/g, '' )
                        .replace( /\r/g, '' )
                }
            }
            for( var i = 0, len = body.length-1; i < len;i++ ) {
            if(body[i]=="" ||body[i]==null)
            {
                if(i==body.length)
                {
                    break;
                }
                body.splice(i--,1)
            }
            }
            for( var i = 0, len = body.length-1; i < len;i++ ) {
                {
                    //图片长度变为1,视频长度变为2
                    if((body[i].length==1 ||body[i].length==2) && body[i].toString().match("http")==null && body[i].toString().match("v.qq")==null)
                    {
                        body[i]=body[i]+"   ";
                    }
                    //视频长度变为2
                    else  if(body[i].length==1 && body[i].toString().match("v.qq")!=null)
                    {
                        body[i][1]=" ";
                    }
            }}
            // 重新写入数据
            that.setData( {
                data: arr,
                databody: body,
            });

        });
/*
        // 请求评论
        util.AJAX( "story/" + id + "/short-comments", function( res ) {

            var arr = res.data.comments;
            
            for ( var i = 0, len = arr.length; i < len; i++ ){
                arr[i]['times'] = util.getTime( arr[i].time );
            }

            // 重新写入数据
            that.setData( {
                comments: arr
            });

        });
*/
        /**
         * 获取系统信息
         */
        wx.getSystemInfo( {

            success: function( res ) {
                that.setData( {
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },
    /**
     * 显示分享
     */
    showShare: function( e ) {
        // 创建动画
        var animation = wx.createAnimation( {
            duration: 100,
            timingFunction: "ease",
        })
        this.animation = animation;

        var that = this;
        that.setData( {
            shareShow: "block",
        });

        setTimeout( function() {
            that.animation.bottom( 0 ).step();
            that.setData( {
                shareBottom: animation.export()
            });
        }.bind( this ), 400 );

        // 遮罩层
        setTimeout( function() {
            that.animation.opacity( 0.3 ).step();
            that.setData( {
                shareOpacity: animation.export()
            });
        }.bind( this ), 400 );

    },

    /**
     * 关闭分享
     */
    shareClose: function() {
        // 创建动画
        var animation = wx.createAnimation( {
            duration: 0,
            timingFunction: "ease"
        })
        this.animation = animation;

        var that = this;

        setTimeout( function() {
            that.animation.bottom( -210 ).step();
            that.setData( {
                shareBottom: animation.export()
            });
        }.bind( this ), 500 );

        setTimeout( function() {
            that.animation.opacity( 0 ).step();
            that.setData( {
                shareOpacity: animation.export()
            });
        }.bind( this ), 500 );

        setTimeout( function() {
            that.setData( {
                shareShow: "none",
            });
        }.bind( this ), 1500 );
    },

    /**
     * 点击分享图标弹出层
     */
    modalTap: function( e ) {
        var that = this;
        that.setData( {
            modalHidden: false,
            modalValue: e.target.dataset.share
        })
    },
    
    /**
     * 关闭弹出层
     */
    modalChange: function( e ) {
        var that = this;
        that.setData( {
            modalHidden: true
        })
    },

    onReady: function(res) {
        // 页面渲染完成
        // 修改页面标题
        wx.setNavigationBarTitle( {
            title: "新闻"//this.data.data.title
        })
         this.videoContext = wx.createVideoContext('myVideo')
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})