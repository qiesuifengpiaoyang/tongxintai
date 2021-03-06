import Vue from 'vue'
import { Button } from 'vant'
import { Icon } from 'vant';
import { Toast } from 'vant';
import { List } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Grid, GridItem } from 'vant';
import { NumberKeyboard } from 'vant';
import { Field } from 'vant';
import { Uploader } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';
import { Divider } from 'vant';
import { Progress } from 'vant';
import { Empty } from 'vant';
import { Loading } from 'vant';
import { Dialog } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { ImagePreview } from 'vant';
import { PullRefresh } from 'vant';
import { Lazyload } from 'vant';
import { Image as VanImage } from 'vant';
import { Checkbox } from 'vant';
import { Picker } from 'vant';
import { Popup } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { NoticeBar } from 'vant';
import { ActionSheet } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { ShareSheet } from 'vant';
import { Pagination } from 'vant';

Vue.use(Pagination);
Vue.use(GoodsAction);
Vue.use(ShareSheet);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(ActionSheet);
Vue.use(NoticeBar);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.use(Popup);
Vue.use(Picker);
Vue.use(Checkbox);
// Vue.use(RadioGroup);
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(PullRefresh);
// 全局注册
Vue.use(ImagePreview);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Empty);
Vue.use(Progress);
Vue.use(Divider);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Uploader);
Vue.use(Field);
Vue.use(NumberKeyboard);
Vue.use(Grid);
Vue.use(GridItem);
// import { Skeleton } from 'vant';

// Vue.use(Skeleton);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(Button)
