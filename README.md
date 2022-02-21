# redrock-homework
## 网易云音乐项目
### 写在前面
1. 改项目由HTML,CSS,JS写成,通过调用网易云api构成
2. 由于个人疏忽,项目写成了网易云音乐UI,非常抱歉,故客户端有些要求在UI无法呈现
3. 服务由live sever搭建,故运行时用live sever直接运行即可
4. 项目有很多bug,请多多包含
5. 接口稳定性不好,在测试时不要一直调用同一接口,防止出现错误,若遇见报错等问题,刷新即可
### 页面组成
##### 由app.html为主页面,其他9个为副页面,运行仅在app.html运行即可
### 项目中的一些尚未修复的bug
1. 登陆后需刷新一下,否则不能获取账户等级等信息
2. 首页的轮播图暂时有bug
3. 拖拽音量后,audio.volume分明有变化,但是感受不到
4. 在详细歌曲和详细歌单页,打不开歌曲列表
5. 点击‘发现音乐’和 “推荐” 会刷新页面
## 功能
#### 登录
1. 目前仅支持手机号密码登录
2. 可以自动登录,过期日期为一周
#### 首页
1. 轮播图可以自动轮播,手动切换,底部的分页
2. 推荐广场可以展示封面,标题,播放数,点击可进入其歌单详细,能显示歌单的相关信息
3. 列表歌曲点击可播放,具有上一首下一首功能
#### 底部
1. 可暂停,播放,上一首,下一首,进度拖拽
2. 显示当前播放歌曲的信息
3. 可显示当前播放音乐的歌词
#### 搜索
1. 可搜索歌曲
2. 具有搜索推荐词
3. 只实现了外部小的搜索框,搜索页的搜索框未实现功能
#### 歌单详细
可显示封面、标题、作者、歌曲数
#### 收藏的歌单
1. 可查看收藏的歌单的具体信息
2. 歌曲可播放,具有上一首下一首功能
#### 排行榜页
1. 可显示当前的所有排行榜
2. 可以看到排行榜的具体信息
#### 歌单页
1. 可看到歌单页的部分歌单
2. 可以进行筛选相应的歌单
#### 歌手页
1. 可以看到官方UI下的歌手分类
2. 可以选择不同地区的歌手
3. 可以对字母或者热度进行分类
#### 歌曲详细页
1. 单击歌曲可进入歌曲详细
2. 可显示名称,作者,歌词,评论等
