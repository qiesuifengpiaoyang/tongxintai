<template>
  <div class="helpapply-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="互帮申请"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="re-hed" v-if="csid">
      <!-- <div class="re-hed-1" v-if="idshow">
        <span class="bm">{{reqTitle}}</span>
      </div> -->
      <div class="re-hed-2">
        <van-dropdown-menu active-color="#ee0a24">
          <van-dropdown-item v-model="type" :options="option1" />
        </van-dropdown-menu>
      </div>
    </div>
    <van-cell-group :border="false">
      <p class="ce_tit">请选择常住地址：</p>
      <div class="helpapply-ya">
        <div class="he-ya-1">
          <van-field
            class="he-ya-cl mb10 br5"
            :border="false"
            readonly
            clickable
            :value="province_name"
            placeholder="选择省份"
            @click="getCity(1)"
          />
          <van-field
            class="he-ya-cl mb10 br5"
            :border="false"
            readonly
            clickable
            :value="city_name"
            placeholder="选择市"
            @click="getCity(2)"
          />
          <van-field
            class="he-ya-cl mb10 br5"
            :border="false"
            readonly
            clickable
            :value="county_name"
            placeholder="选择县"
            @click="getCity(3)"
          />
        </div>
        <div class="he-ya-2">
          <van-field
            class="he-ya-mp mb10 br5"
            v-model="permanent_address"
            placeholder="请输入具体门牌号"
          />
        </div>
      </div>
      <div v-if="showadmin">
        <p class="ce_tit">
          管理员信息：
          <small>无需填写</small>
        </p>
        <van-field
          :border="false"
          class="mb10 br5"
          label="推荐人姓名"
          :value="recommender_name"
          placeholder="推荐人姓名"
          readonly
        />
        <van-field
          :border="false"
          class="mb10 br5"
          label="联系电话"
          :value="recommender_mobile"
          placeholder="联系电话"
          readonly
        />
        <div v-for="(item, index) in supervisor" :key="index">
          <van-field
            :border="false"
            class="mb10 br5"
            :label="`${index === 0 ? '①' : index === 1 ? '②' : ''}号监督管理员`"
            :value="item.name"
            readonly
            :placeholder="`${
              index === 0 ? '①' : index === 1 ? '②' : ''
            }号监督管理员`"
          />
          <van-field
            :border="false"
            class="mb10 br5"
            :label="`${index === 0 ? '①' : index === 1 ? '②' : ''}号联系电话`"
            readonly
            :value="item.mobile"
            placeholder="请输联系电话"
          />
        </div>
        <van-field
          :border="false"
          class="mb10 br5"
          label="公司督察员姓名"
          placeholder="公司督察员姓名"
          :value="inspector"
          readonly
        />
        <van-field
          :border="false"
          class="mb10 br5"
          label="联系电话"
          placeholder="联系电话"
          :value="inspector_mobile"
          readonly
        />
        <van-field
          :border="false"
          class="mb10 br5"
          label="公司专线"
          placeholder="公司专线"
          :value="vip_mobile"
          readonly
        />
        <p class="ce_tit_1">
          说明：凡是公司管理员，电话必须是注册时所用电话，在现场监督审核时，必须随身携带专用电话，以便督察员核实情况
        </p>
      </div>
      <!-- <p class="ce_tit">监督管理员协助填写：</p> -->
      <van-field
        :border="false"
        class="mb10 br5"
        v-model="name"
        label="姓名"
        placeholder="请输入姓名"
      />
      <div class="mb10 br5 payment-form-upload">
        <div class="payment-form-upload-left">
          <span>病情现状</span>
          <span class="sf">(上传诊断及医生建议)</span>
        </div>
        <div class="payment-form-upload-right">
          <van-uploader
            :preview-full-image="false"
            :after-read="afterRead1"
            multiple
            :max-count="6"
            v-model="fileList"
            @delete="deleteCl"
          >
            <div class="paymentFormItem_1">
              <div class="paymentFormItem_1_img">
                <van-icon name="add" v-if="!card_img_front1" />
                <img
                  :src="card_img_front1"
                  alt
                  v-else
                  style="width: 100%; height: 3rem"
                />
              </div>
            </div>
          </van-uploader>
        </div>
      </div>
      <!-- <van-field
        class="mb10 br5"
        :border="false"
        v-model="money"
        label="需要费用"
        placeholder="请输入需要费用"
      /> -->
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="diseasename"
        label="主要症状"
        placeholder="请描述主要症状"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="diseasedesc"
        label="病情描述"
        rows="2"
        autosize
        maxlength="50"
        show-word-limit
        type="textarea"
        placeholder="请输入病情描述"
      />
      <p class="ce_tit">指定收款人:</p>
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appoint_name"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appoint_h_name"
        label="银行名称"
        placeholder="请输入银行名称"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appoint_h_adress"
        label="开户行地址"
        placeholder="请输入开户行地址"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        :value="appoint_account"
        label="银行帐号"
        readonly
        clickable
        @touchstart.native.stop="appointkshow = true"
        placeholder="请输入银行帐号"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appoint_phone"
        label="联系电话"
        placeholder="请输入联系电话"
      />
      <!-- <p class="ce_tit">指定监护人:</p>
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appointj_name"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appointj_h_name"
        label="银行名称"
        placeholder="请输入银行名称"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appointj_adress"
        label="开户行地址"
        placeholder="请输入开户行地址"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        :value="appointj_account"
        label="银行帐号"
        readonly
        clickable
        @touchstart.native.stop="appointkjshow = true"
        placeholder="请输入银行帐号"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appointj_phone"
        label="联系电话"
        placeholder="请输入联系电话"
      /> -->
      <div class="helpdbtn" @click="applyCl">正式申请</div>
    </van-cell-group>

    <van-popup v-model="showPickercity" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPickercity = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-number-keyboard
      :show="appointkjshow"
      :maxlength="30"
      v-model="appointj_account"
      @blur="appointkjshow = false"
    />
    <van-number-keyboard
      :show="appointkshow"
      :maxlength="30"
      v-model="appoint_account"
      @blur="appointkshow = false"
    />
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import popup from "@/components/popup.vue";
import qs from "qs";
export default {
  data() {
    return {
      csid: true,
      //   reqTitle: "",
      option1: [{ text: "请选择互助类型", value: 0 }],
      pageshow: false,
      // 管理员status
      showadmin: false,
      appointkshow: false,
      appointkjshow: false,
      appointtype: 0,
      keyboardvalue: "",
      type: 0,
      // 省市
      pid: 0,
      id: 0,
      columns: [],
      showPickercity: false,
      province_name: "",
      province_id: "",
      city_name: "",
      city_id: "",
      county_name: "",
      county_id: "",
      permanent_address: "",
      // 检察官
      inspector: "",
      inspector_mobile: "",
      vip_mobile: "",
      recommender_name: "",
      recommender_mobile: "",
      supervisor: [],

      user_city_name: "",
      user_city_id_phone: "",
      user_city_name_2: "",
      user_city_id_phone_2: "",
      inspector: "",
      inspector_mobile: "",
      vip_mobile: "",

      money: "",
      diseasename: "", //主要症状
      name: "",
      diseasedesc: "",

      appoint_name: "",
      appoint_h_name: "",
      appoint_h_adress: "",
      appoint_account: "",
      appoint_phone: "",

      appointj_name: "",
      appointj_h_name: "",
      appointj_adress: "",
      appointj_account: "",
      appointj_phone: "",

      card_img_front1: "",
      uploadMask1: false,

      fileList: [],
      filelista: [],
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      num: 0,
    };
  },
  components: {
    popup
  },
  created() {
    var url = window.location.href; //获取网站的hash值
    var _page = url.split("?")[1]; //获取hash后面的数字
    //将获取的值转为数字,如果不能转换为数字
    if (_page) {
      _page = parseInt(_page); //转为数字
      this.num = _page;
      //1就是医护帮，医护帮没有【选择类型】
      if (_page == 1) {
        this.csid = false;
      } else {
        this.csid = true;
      }
    }
    // axios.get(`${this.apiUrl}/getChargeMoney`).then(res=>{
    // })
    axios.get(`${this.apiUrl}/ehelp`).then((res) => {
      let { data } = res;
      let { info } = data;
      info.map((item, index) => {
        let obj = Object.create(null);
        obj.text = item.title;
        obj.value = item.id;
        this.option1.push(obj);
      });
    });
  },
  mounted() {
    this.reqTitle = decodeURIComponent(this.$route.query.text);
  },
  watch: {
    type: {
      handler(val) {
        this.type = val;
      },
      deep: true,
    },
  },
  methods: {
    // onBlur(){
    //     this.keyboardshow = false;
    //     this.keyboardvalue="";
    // },
    // onInput(value){
    //     if(this.appointtype === 1){
    //         this.appoint_account = this.appoint_account
    //     }else if(this.appointtype === 2){
    //         this.appointj_account = this.keyboardvalue
    //     }
    // },
    appointCl() {
      this.keyboardshow = true;
      this.appointtype = 1;
    },
    appointjCl() {
      this.keyboardshow = true;
      this.appointtype = 2;
    },
    onConfirm(n) {
      let that = this;
      if (that.pid === 1) {
        that.id = n.id;
        that.province_id = n.id;
        that.province_name = n.text;
        that.city_name = "";
        that.city_id = 0;
        that.county_id = 0;
        that.county_name = "";
        that.columns = [];
        // that.getRecommender();
      } else if (that.pid === 2) {
        that.id = n.id;
        that.city_id = n.id;
        that.city_name = n.text;
        that.county_id = 0;
        that.county_name = "";
        that.columns = [];
        // that.getRecommender();
      } else if (that.pid === 3) {
        that.id = n.id;
        that.county_id = n.id;
        that.county_name = n.text;
        that.columns = [];
        that.getRecommender();
      }
      that.showPickercity = false;
    },
    getRecommender() {
      let that = this;
      const toast1 = that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      axios
        .get(`${that.apiUrl}/getRecommender`, {
          params: {
            cityid: parseInt(that.county_id),
          },
        })
        .then((res) => {
          toast1.clear();
          let { data } = res;
          if (data.status === 1) {
            that.inspector = data.info.inspector;
            that.inspector_mobile = data.info.inspector_mobile;
            that.vip_mobile = data.info.vip_mobile;
            that.recommender_name = data.info.recommender_name;
            that.recommender_mobile = data.info.recommender_mobile;
            that.supervisor = data.info.supervisor;
            if (Array.isArray(data.info.supervisor)) {
              data.info.supervisor.map((item, index) => {
                if (index === 0) {
                  that.user_city_name = item.name;
                  that.user_city_id_phone = item.mobile;
                } else if (index === 1) {
                  that.user_city_name_2 = item.name;
                  that.user_city_id_phone_2 = item.mobile;
                }
              });
            }
            if (!that.showadmin) {
              that.showadmin = true;
            }
          } else {
            that.$toast(data.message);
          }
        })
        .catch((error) => {
          toast1.clear();
        });
    },
    mapArr(data, n, m, d, i) {
      let that = this;
      try {
        if (Array.isArray(data.info)) {
          if (data.info.length > 0) {
            let arr1 = [...data.info];
            arr1.map((item) => {
              item.text = item.name;
            });
            that[d] = true;
            that[n] = arr1;
            that[m] = true;
          } else {
            that[d] = false;
            if (i === 1) {
              that.$toast("省不存在");
            } else if (i === 2) {
              that.$toast("市不存在,请联系管理员");
            } else if (i === 3) {
              that.$toast("县不存在,请联系管理员");
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    getCity(n) {
      let that = this;
      that.pid = n;
      if (n === 1) {
        that.id = 0;
      }
      if (n === 2) {
        if (!that.province_id) {
          return;
        }
        that.id = that.province_id;
      }
      if (n === 3) {
        if (!that.city_id) {
          return;
        }
        that.id = that.city_id;
      }
      const toast1 = that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      axios
        .get(`${that.apiUrl}/getCity`, {
          params: {
            id: that.id,
          },
        })
        .then((res) => {
          toast1.clear();
          that.pageshow = true;
          let { data } = res;
          if (data.status === 1) {
            if (Array.isArray(data.info)) {
              if (data.info.length > 0) {
                let arr1 = [...data.info];
                arr1.map((item) => {
                  item.text = item.name;
                });
                that.showPickercity = true;
                that.columns = arr1;
              } else {
                if (n === 1) {
                  that.$toast("省不存在");
                } else if (n === 2) {
                  that.$toast("市不存在, 请联系管理员");
                } else if (n === 3) {
                  that.$toast("县不存在, 请联系管理员");
                }
              }
            }
          } else {
            that.$toast(data.message);
          }
        })
        .catch((error) => {
          toast1.clear();
        });
    },
    deleteCl(file, detail) {
      let that = this;
      that.filelista = that.filelista.filter((item, index) => {
        return item.index != detail.index;
      });
      that.filelista.map((item, index) => {
        item.index = index;
      });
    },
    afterRead1(file, detail) {
      Array.isArray(file)
        ? this.typeArrayStatus(file, detail)
        : this.typeObjectStatus(file, detail);
    },
    typeArrayStatus(file, detail) {
      let that = this;
      file.map(function (item, index) {
        item.index = index + detail.index;
        item.status = "uploading";
        item.message = "上传中...";
        that.uploadFile(item);
      });
    },
    typeObjectStatus(file, detail) {
      file.index = detail.index;
      file.status = "uploading";
      file.message = "上传中...";
      this.uploadFile(file);
    },
    uploadFileApi: function (file) {
      let that = this;
      let formdata = new FormData();
      formdata.append("img", file.file);
      axios
        .post(`${this.apiUrl}/uploadImage?id=${file.index}`, formdata)
        .then((res) => {
          let { data } = res;
          this.uploadMask = false;
          if (data.status === 1) {
            let obj = Object.create(null);
            obj.index = file.index;
            obj.url = data.info.filename;

            that.filelista.push(obj);

            file.status = "done";
            file.message = "上传完成";
          } else {
            file.status = "failed";
            // file.message = "上传失败";
            file.message = `${data.message}`;
          }
        })
        .catch((e) => {
          file.status = "failed";
          file.message = "上传失败";
        });
    },
    uploadFile: function (file, n, s) {
      let that = this;
      that.uploadFileApi(file);
    },
    applyCl() {
      let that = this;
      if (that.num != 1 && that.type <= 0) {
        that.$toast("请选择互助类型");
        return;
      }
      if (!that.county_name) {
        that.$toast("请选择县");
        return;
      }
      if (!that.name) {
        that.$toast("请输入姓名");
        return;
      }
      if (!that.diseasename) {
        that.$toast("请描述主要症状");
        return;
      }
      if (!that.diseasedesc) {
        that.$toast("请输入病情描述");
        return;
      }
      if (!that.appoint_name) {
        that.$toast("请输入收款人姓名");
        return;
      }
      if (!that.appoint_h_name) {
        that.$toast("请输入收款人银行名称");
        return;
      }
      if (!that.appoint_account) {
        that.$toast("请输入收款人银行卡号");
        return;
      }
      if (!that.appoint_phone) {
        that.$toast("请输入收款人联系电话");
        return;
      }
      // if (!that.appointj_name) {
      //   that.$toast("请输入监护人名字");
      //   return;
      // }
      // if (!that.appointj_h_name) {
      //   that.$toast("请输入监护人银行名称");
      //   return;
      // }
      // if (!that.appointj_account) {
      //   that.$toast("请输入监护人银行卡号");
      //   return;
      // }
      // if (!that.appointj_phone) {
      //   that.$toast("请输入监护人联系电话");
      //   return;
      // }

      that.filelista1 = [];
      that.filelista.map((item) => {
        // that.filelista1.push(imgs.jpg);
        that.filelista1.push(item.url);
      });
      const toast1 = that.$toast.loading({
        message: "提交中...",
        forbidClick: true,
        duration: 0,
      });

      let datas = Object.create(null);
      datas = {
        // type: String(that.type),
        // money: String(that.money),
        name: String(that.name),
        // address:address,
        user_id: String(sessionStorage.getItem("id") || ""),
        diseasename: String(that.diseasename),
        diseasedesc: String(that.diseasedesc),
        permanent_address: String(
          `${that.province_name}${that.city_name}${that.county_name}${that.permanent_address}`
        ),
        diseaseimg: that.filelista1,
        appoint_name: String(that.appoint_name),
        appoint_h_name: String(that.appoint_h_name),
        appoint_h_adress: String(that.appoint_h_adress),
        appoint_account: String(that.appoint_account),
        appoint_phone: String(that.appoint_phone),
        // appointj_name: String(that.appointj_name),
        // appointj_h_name: String(that.appointj_h_name),
        // appointj_adress: String(that.appointj_adress),
        // appointj_account: String(that.appointj_account),
        // appointj_phone: String(that.appointj_phone),
        user_city_name: String(that.user_city_name),
        user_city_id_phone: String(that.user_city_id_phone),
        user_city_name_2: String(that.user_city_name_2),
        user_city_id_phone_2: String(that.user_city_id_phone_2),
      };
      if (this.num != 1) {
        datas["type"] = String(that.type);
      }
      axios
        .post(
          `${this.apiUrl}/report`,
          qs.stringify(
            datas
            // // type: String(that.type),
            // // money: String(that.money),
            // name: String(that.name),
            // user_id: String(sessionStorage.getItem("id") || ""),
            // // diseasename: String(that.diseasename),
            // diseasedesc: String(that.diseasedesc),
            // permanent_address: String(
            //   `${that.province_name}${that.city_name}${that.county_name}${that.permanent_address}`
            // ),
            // diseaseimg: that.filelista1,
            // appoint_name: String(that.appoint_name),
            // appoint_h_name: String(that.appoint_h_name),
            // appoint_h_adress: String(that.appoint_h_adress),
            // appoint_account: String(that.appoint_account),
            // appoint_phone: String(that.appoint_phone),
            // // appointj_name: String(that.appointj_name),
            // // appointj_h_name: String(that.appointj_h_name),
            // // appointj_adress: String(that.appointj_adress),
            // // appointj_account: String(that.appointj_account),
            // // appointj_phone: String(that.appointj_phone),
            // user_city_name: String(that.user_city_name),
            // user_city_id_phone: String(that.user_city_id_phone),
            // user_city_name_2: String(that.user_city_name_2),
            // user_city_id_phone_2: String(that.user_city_id_phone_2),
          )
        )
        .then((res) => {
          toast1.clear();
          that.pageshow = true;
          let { data } = res;
          if (data.status === 1) {
            that.$dialog
              .alert({
                message: "提交成功",
              })
              .then(() => {
                // on close
                that.$router.push("/helpCenter");
              });
          } else {
            that.$dialog
              .alert({
                message: `提交失败-${data.message}`,
              })
              .then(() => {
                // on close
              });
          }
        })
        .catch((error) => {
          toast1.clear();
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.helpapply-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  .he-ya-1 {
    display: flex;
    justify-content: space-between;
    .he-ya-cl {
      flex-basis: 30%;
    }
  }
  .van-cell-group {
    background: transparent;
    padding: 0.24rem;
    .van-cell__title {
      color: #abbddb;
      text-align: left;
    }
    .van-field__label {
      width: 2.2rem;
    }
    .van-cell {
      background-color: #3b4576;
    }
    .van-field__value,
    .van-field__control {
      color: #7388ab;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: #7388ab;
    }
    .payment-form-upload {
      display: flex;
      flex-wrap: nowrap;
      background-color: #3b4375;
      align-items: center;
      padding: 0.25rem;
      margin-top: 0.1rem;
      border-radius: 0.1rem;
      line-height: 1;
      // flex-direction: column;
      // justify-content: center;
      align-items: center;
      .payment-form-upload-left {
        width: 2.2rem;
        font-size: 14px;
        line-height: 1.4;
        color: #abbddb;
        text-align: left;
        display: flex;
        flex-direction: column;
        .sf {
          font-size: 0.1rem;
        }
      }
      .payment-form-upload-right {
        text-align: left;
        flex: 1;
        min-width: 0;
        .van-uploader__wrapper {
          > div:nth-child(3n + 3) {
            padding-right: 0;
          }
        }
        .van-uploader__preview-delete {
          position: absolute;
          top: -0.1rem;
          right: 0;
          color: #969799;
          font-size: 0.3rem;
          background-color: #fff;
          border-radius: 100%;
        }
        .van-uploader__preview-image {
          width: 100%;
          height: 1.4rem;
        }
        .van-uploader__preview,
        .van-uploader__input-wrapper {
          position: relative;
          padding: 0 0.1rem 0.1rem 0;
          margin: 0;
          cursor: pointer;
          flex-basis: 33%;
        }
      }
      .paymentFormItem_1_img {
        background-color: #454d80;
        // padding: .24rem;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 5px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .van-icon {
          font-size: 1rem;
          color: #fbbb5f;
        }
      }
      .paymentFormItem_2 {
        color: #7489ac;
        margin-top: 0.2rem;
        font-size: 0.14rem;
        display: none;
      }
      .payment-form-upload-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        .van-loading__spinner {
          color: #fff;
        }
        .van-loading__text {
          color: #fff;
        }
      }
    }
  }
  .ce_tit_1 {
    font-size: 0.2rem;
    text-align: left;
    margin: 0.3rem 0;
  }
  .ce_tit {
    font-size: 0.3rem;
    text-align: left;
    margin: 0.3rem 0;
    small {
      font-size: 0.22rem;
    }
  }
  .helpdbtn {
    text-align: center;
    color: #fff;
    font-size: 0.3rem;
    margin-top: 0.5rem;
    background: #1989fa;
    border-radius: 10px;
    margin: 0.6rem 0.2rem;
    padding: 0.26rem 0;
    line-height: 1;
  }
  .re-hed-2 {
    // border: 1px solid #999;
    background-color: #fbbb5f;
    & .van-dropdown-menu__bar {
      background-color: #fbbb5f;
    }
    & .van-dropdown-menu {
      background-color: #fbbb5f;
      & .van-popup {
        background-color: #fbbb5f;
        & div {
          background-color: #fbbb5f;
        }
      }
    }
  }
}
</style>