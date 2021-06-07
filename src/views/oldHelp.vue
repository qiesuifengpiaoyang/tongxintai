<template>
  <div class="endHelpBox">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="老互帮公约"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="textBox">
      <p class="subtitle">《老互帮》公约</p>
      <p class="subtitle">【同心台】所有电商消费用户：</p>
      <div class="text">
        <p>
          关爱老人是中华民族的传统美德，国家也一直倡导全社会要关心和爱护老人，关心我们身边的孤寡残疾群体，给予他们多一些关心，让社会更加和谐和温暖。
        </p>
        <p>
          【同心台】电商平台，立足“消费创富、互帮互助、全民受益分红”，勇于承担社会责任，积极参与到“关爱老人”的行动中去，在平台“互帮体系”独立设计“老互帮”板块，服务社会养老敬老事业。电商平台每一位消费受益者，在参与平台其他互帮互助板块时，首先要参与“老互帮”，为社会养老事业做一份贡献。每一位参与平台消费受益的个人，要参与互帮互助公益事业，首先要对养老事业有高度的认知；同时严格遵守平台的约定，在尊重老人、帮助孤寡残疾人的前提下参与其他互帮，请参与者认真阅读理解透彻的情况下自愿参与。
        </p>
      </div>
      <p class="subtitle">一、老互帮的价值：</p>
      <div class="text">
        由于城市经济的迅猛发展，很多户口的年轻人都进入城市发展和生活，更多的人已安居城市，导致很多空巢老人变得孤独，由于更多的老人已习惯了出生环境的生活，根本不适应城市生活，让儿女和父母成了各自一方，年老的父母就很容易孤独无助，这种现象在全国出现了一定的比例。作为平台的消费受益用户，在我们自己能够受益的同时，联合平台的所有用户，去关心我们身边的孤寡老人及残疾人，是一件正能量的事业，更会唤起社会更多的人参与其中，让社会出现更加温暖和谐的美好画面，让我们身边那些孤独的空巢老人和残疾人会感觉到幸福的存在。
      </div>
      <p class="subtitle">二、参与老互帮的条件：</p>
      <div class="text">
        每个平台的消费用户，在使用互帮体系时，要先办理“老互帮贡献服务卡”，服务卡是30元，平台赠送28.5个爱心值。参与者就可以参与“老互帮贡献”服务。
      </div>
      <p class="subtitle">三、关心帮扶老人的用户要求：</p>
      <div class="text">
        关爱老人是平台发起互帮互助的核心，为了把这个活动做好，平台用户须达到“董事以上”级别，才能代替公司去参与协助执行“老互帮”具体事务。凡是上了“董事”级别的用户，在当地运营中心的指导下，经当地政府或民政部门的允许和支持下，对孤寡老人或生活难以自理的残疾人给予生活用品的帮扶。
      </div>
      <p class="subtitle">四、董事帮扶标准：</p>
      <div class="text">
        <p>
          ①、凡是公司平台的星级董事，每年有一次帮扶孤寡老人或重度残疾人的机会。每次帮扶公司支持生活用品20斤大米、10斤植物油。（产品由公司统一指定）
        </p>
        <p>
          ②生活非常困难的“孤寡老人”和“残疾人”，一年可以接受4次帮扶，每季度一次。（需由筹备运营中心上报星级董事的资格名额）
        </p>
        <p>
          ③凡董事要参与连续帮扶孤寡老人或重度残疾人，需每季度累积增加管理3个医互帮参与者，才有资格参与下一次执行帮扶。
        </p>
      </div>
      <p class="subtitle">五、爱心值归零说明：</p>
      <div class="text">
        每一位参与“老互帮”养老敬老事业的用户，都是热心社会公益事业的贡献者，根据平台的规定，每月要确保“老互帮”爱心值的余值不低于5个爱心值，如因爱心值归零，其他互帮系统也会同步失效。如要使用互帮系统，观察期从零开始重新计算考核所有互帮的观察期。
      </div>
      <p class="subtitle">六、老互帮帮扶爱心值说明：</p>
      <div class="text">
        老互帮每季度一次，针对平台帮扶的老人，平台老互帮所有用户，平均扣爱心值。（公司折合成现金，去购买生活用品帮扶老人）
      </div>
      <p class="subtitle">七、老互帮规定时间：</p>
      <div class="text">
        每年每季度末的3
        ~7天执行，由公司统一规划各地方统一时间段执行“老互帮”实施细节。公司负责把款项或生活用品负责分配到指定“同心台筹备运营中心”。
      </div>

      <p class="subtitle">
        特别提示：平台的核心服务之一是养老互助，凡用户参与要认真阅读。
      </p>

      <p class="text">生效时间： 2021年 05 月 25日</p>

      <div class="dibu">
        <div class="dibuC">
          <p>第一届 公司常委会执行常委：李帅</p>
          <p>本解释权最终归四川省圆又缘网络科技有限公司所有</p>
          <p>四川省圆又缘网络科技有限公司</p>
          <img src="../assets/img/chapter.png" alt="" />
        </div>
      </div>
    </div>
    <popup></popup>
  </div>
</template>
<script>
import popup from "@/components/popup.vue";
export default {
  data() {
    return {};
  },
  components: {
    popup,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      //21-5-20修改，点开协议后，返回之前输入的不应该清空
      //加两个动态路由进去
      //舍弃，不让写在路由中
      // let params = {};
      // if (this.$route.params.sess_name) {
      //   params.sess_name = this.$route.params.sess_name;
      // }
      // if (this.$route.params.sess_carid) {
      //   params.sess_carid = this.$route.params.sess_carid;
      // }
      // this.$router.push({
      //   name: "recharge",
      //   params: params,
      //   query: { fr: "dibu" },
      // });
    },
  },
};
</script>
<style lang='scss' scoped>
.endHelpBox {
  font-size: 0.28rem;
  text-align: left;
  .textBox {
    padding: 10px;
    padding-bottom: 300px;
    .subtitle {
      padding: 5px;
      font-weight: bold;
    }
    .text {
      text-indent: 2em;
      margin-bottom: 0.5em;
    }
    .end {
      text-indent: 2em;
      padding: 5px;
      margin-top: 1.5em;
    }
    //底部的章印等
    .dibu {
      position: relative;
      .dibuC {
        float: right;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > img {
          position: absolute;
          width: 70vw;
          top: -60px;
        }
      }
    }
  }
}
</style>