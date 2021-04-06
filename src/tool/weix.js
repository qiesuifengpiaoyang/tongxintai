// import axios from "@/tool/axios.js";
// import qs from "qs";
import wx from "weixin-js-sdk";
// import sss from '../store/index.js'

// const postConfig = async (data) => {
//     let res
//     await axios.post(`${sss.state.apiDomain}/wechatShare/config`, qs.stringify({
//         url: data
//     })).then(val => {
//         let { data } = val;
//         let { info } = data;
//         wx.config({
//             debug: false, // 开启调试模式,
//             appId: "wx6422171c82896e15", // 必填，企业号的唯一标识，此处填写企业号corpid
//             timestamp: info.timestamp, // 必填，生成签名的时间戳
//             nonceStr: info.noncestr, // 必填，生成签名的随机串
//             signature: info.sign, // 必填，签名，见附录1
//             jsApiList: [
//                 "updateAppMessageShareData",
//                 "updateTimelineShareData",
//                 "onMenuShareAppMessage",
//                 "onMenuShareTimeline"
//             ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//             //“分享给朋友”及“分享到QQ”
//             //“分享到朋友圈”及“分享到QQ空间”
//         });
//         res = (info)
//     })
//     return res
// }

// 分享给朋友
const onMenuShareTimeline = (data) => {
    wx.onMenuShareTimeline({
        title: `${data.title}`, // 分享标题
        link: `${data.link}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${data.imgUrl}`, // 分享图标
        success: () => {
            // 用户点击了分享后执行的回调函数
            this.$toast("分享成功！");
        },
        cancel: () => {
            this.$toast("已取消分享！");
        },
    });
}

const onMenuShareAppMessage = (data) => {
    wx.onMenuShareAppMessage({
        title: `${data.title}`, // 分享标题
        desc: `${data.desc}`, // 分享描述
        link: `${data.link}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${data.icon}`, // 分享图标
        type: "", // 分享类型,music、video或link，不填默认为link
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        success: () => {
            // 用户点击了分享后执行的回调函数
            this.$toast("分享成功！");
        },
        cancel: () => {
            this.$toast("已取消分享！");
        },
    });
}

// “分享给朋友”及“分享到QQ”
const updateAppMessageShareData = (data) => {
    wx.updateAppMessageShareData({
        title: `${data.title}`, // 分享标题
        desc: `${data.desc}`, // 分享描述
        link: `${data.link}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${data.imgUrl}`, // 分享图标
        success: () => {
            this.$toast("分享成功！");
        },
        cancel: () => {
            this.$toast("已取消分享！");
        },
    })
}

//“分享到朋友圈”及“分享到QQ空间”
const updateTimelineShareData = (data) => {
    wx.updateTimelineShareData({
        title: `${data.title}`, // 分享标题
        link: `${data.link}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${data.imgUrl}`, // 分享图标
        success: () => {
            this.$toast("分享成功！");
        },
        cancel: () => {
            this.$toast("已取消分享！");
        },
    })
}
export { onMenuShareTimeline, onMenuShareAppMessage, updateAppMessageShareData, updateTimelineShareData };