Component({
  props: {
    className: "",
    bottomlineColor: "#108ee9", // 选中选项卡下划线颜色
    hilightTextColor: "#333333", // 选中选项卡字体颜色
    textColor: "#999999", // 未选中选项卡字体颜色
    textFontSize: 16,
    hilightTextFontSize: 19,
    backgroundColor: "#ffffff", // 选项卡背景颜色
    showPlus: false,
    hidden: false,
    activeTab: 0, // 当前激活tab
    fixedTabWidth:0, // 固定宽度
    paddingLeft: 0, // 左边距
    bottomlineWidth:20, // 下划线宽度
  },
  data: {
    windowWidth: my.getSystemInfoSync().windowWidth,
    tabWidth: 0.25,
    animation: true,
    version: my.SDKVersion,
    scrollLeft: 0,
  },
  didMount: function didMount() {
    var tabs = this.props.tabs;
    var tabWidth = tabs.length > 3 ? 0.25 : 1 / tabs.length;
    var scrollLeft = this.calcScrollLeft(
      this.data.windowWidth,
      tabWidth,
      this.props.activeTab
    );
    this.setData({
      tabWidth: tabWidth,
      scrollLeft: scrollLeft,
    });
  },
  didUpdate(prevProps, prevData) {
    var tabs = this.props.tabs;
    var tabWidth = tabs.length > 3 ? 0.25 : 1 / tabs.length;
    var scrollLeft = this.calcScrollLeft(
      this.data.windowWidth,
      tabWidth,
      this.props.activeTab
    );

    // TODO:动态hidden时设置left会失效（>=5个tab）
    this.setData({
      scrollLeft: scrollLeft,
    });
  },
  methods: {
    handleTabClick(e) {
      var index = e.target.dataset.index;

      if (this.props.onTabClick) {
        this.props.onTabClick({ index: index });
      }
    },
    handlePlusClick() {
      if (this.props.onPlusClick) {
        this.props.onPlusClick();
      }
    },
    calcScrollLeft(windowWidth, tabWidth, current) {
      let scrollInit = current * windowWidth * tabWidth;

      if (current <= 2) {
        scrollInit = 0;
      } else {
        scrollInit = (current - 2) * windowWidth * tabWidth;
      }

      return scrollInit;
    },
  },
});
