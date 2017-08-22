# Stylee-Mobile
Top issue now: Logged in-> Main -> Back button => logged in page.

## Feed
FEED : Outfit + recent activities

## Stylebook
outfit photos. <- many outfits | at the buttom, category.

## Wardrobe
clothes (filtered by category : color, type, feeling)

## Notification
recommended outfit (2) followers' posts

## Menu
1) Profile 2) invite friends from facebook 3) your wardrobe stats 4) Setting > Language

---

## Sign Up
Sign Up -> email 인증 / 핸드폰인증 / facebook 인증 USA or Korea or Japan? -> 바디타입입력 -> 스타일선택(ML) -> 완료. -> 지역(날씨때문에)

## 스타일북 이 내 메인인데? 한눈에 아웃핏, 옷 다볼수있게 해줘
안에서 써.... newsfeed필요할수도있긴하겠다. -옷사이트에서 친목할게뭐가있어
[Newsfeed(친목?), 트랜드보기, 내 옷장(add clothes), 내프로필(add outfit)]

## 다른기능들은 Menu에 넣기.

## following 매장, 친구목록 직접 볼수있음. (I don’t think we need Newsfeed)

## 매장추천

## 페이스북 페이지중 정의내릴때 나오는 것 처럼 (스타일 추천) -
Following 하는 매장에서 유저에게 전체 메세지를 날릴수있음 (한명당 0.01 dollar) = 2000팔로워면. 2만원 (홍보글한번에)
User = 상점으로간다

Default로 넣기 Page. 옷장에 가지고계신 옷을 선택해주세요!

## 검색. 브랜드별로보기

## stylebook좀잘봐봐
https://insideoutstyleblog.com/2016/03/readers-favourite-style-and-wardrobe-apps.html

## Archieve 기능 (입지않는옷)

## Camera Feature
Camera Shot -> Clip -> Brand Store Price (Tab형식으로나오네) -> Share with Facebook Twitter Tumbler, -> Post Instagram처럼나옴.
Upload image -> 이미지안에서 오른쪽에 창두개가뜨고 -> outfit을 클릭하면 오른쪽에 화면이 뜬다. => 좋긴하지만 우린 AI로 더많을 걸할수있어!! => 자동태그!
옷정보 바코드

## 이미지 저장
피드에서 사진봄 (Outfit or Item) -> 옷장이나 Outfit에 추가할수있음

## Clothe저장. => background removal

## 아웃핏만들기?
내 옷들로 검색할수도 있어야함!

## 아웃핏저장
이름: 덴디룩 남자
타겟: 남/녀 혼용
목록: #남자 지흥, #올블랙, #검은면바지 #검은색!

## 얼굴커서고민인 남자분들 페이지 -> 내 아웃핏 저장 -> 뭘사야할지 대충 추천이되야겠지 ?
이름: 머리땅
타겟: 남자
목록: #데님, #헨리

## 권상우패션 unofficial


## Save photo
Checking the wardrobe. 나한테 similar item 있는 지 보여줌 -> 이러다보면 내 신발색과 비슷한 패션을 또 보겠지?

## Feature Map
# Feed Profile Notification
-Feed
Post Lists from followers

## Profile
=> Summary

=> Wardrobe

=> Outfit-List

## Notification
(Welcome to the SkyMemory!)
(jbaek7023 liked your outfit ‘멋진 소리)
(jbaek77 and ha-eun-baek commented on your ‘멋진 사진')
(How to manage your wardrobe efficiently? Check this out! )
(john is now following you)
(john mentioned you in the comment from your outfit post ‘멋진사진')
(john mentioned you in the comment from your clothes post ‘멋진사진')
(john mentioned you in the comment from your ‘멋진사진')

## Expected Functionality
<Chat | Notification>
what did you wear today? black pants, white shirts, blue blazer.
You look 'sexy', 'dandy', 'warm' today. Just like your style. :)
Are you going to swimming?

## Preferences
  -recommend to delete preference.

Christiano Ronaldo motivates more than 1,000 people in a day.

바지사진올리면
"저희는 이 사진을 바지사진으로 인식했습니다.  Jae Min 님의 바지앨범에 넣어드릴까요?"

옷색깔 맞춰줌 ... 카메라에 따라 인식하는 색깔이 다를수도있음. <- Machine Learning이 알아서해줄거임

허벅지칫수

## Tip
People can't and won't search for 'black tie'. <- this is just optional.
You are going to show the outfits related to your wardrobe.

mydrobe should can answer the specific question. 'which suit should I wear for getting a job internship Fashion?'


## Small Plan
People
## Big Plan

## How to make business
세상에 도움되는 일 -> 수익 Yes. 당연하지않나? 그렇지 않으면 사기다.
수익나는일 -> 세상에 도움되지않는 일 -> 수익 No

##### Known Error
1- (0, _stackNaviation) is not a function
*> import StackNavigator from '../'
=> import { StackNavigator } from '../'

2.0-.
```
jest-haste-map: Watchman crawl failed. Retrying once with node crawler.
  Usually this happens when watchman isn't running. Create an empty `.watchmanconfig` file in your project's root folder or initialize a git or hg repository in your project.
  Error: Watchman error: A non-recoverable condition has triggered.  Watchman needs your help!
The triggering condition was at timestamp=1502849928: inotify-add-watch(/home/jaemin/Desktop/Stylee/workspace/Stylee-Mobile/node_modules/lottie-react-native/lib/android/build/intermediates/classes/debug/com/facebook/drawee/backends) -> The user limit on the total number of inotify watches was reached; increase the fs.inotify.max_user_watches sysctl
All requests will continue to fail with this message until you resolve
the underlying problem.  You will find more information on fixing this at
https://facebook.github.io/watchman/docs/troubleshooting.html#poison-inotify-add-watch. Make sure watchman is running for this project. See https://facebook.github.io/watchman/docs/troubleshooting.html.
```
=> sudo sysctl fs.inotify.max_user_watches=32768
=> restart atom
=> echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_user_watches


2- facebook::react::Recoverable: Could not open file: No such file or directory
after reload
The development server returned response error code: 502 ...
Failed to complete tunnel connection

=> (watchman is not working!)
echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
# sudo 니까 일단 첫번째껏만
echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
watchman shutdown-server
watchman watch-del-all
and restart project

3- exp: “Node version 4.6.1 is not supported, please use Node.js 6.0 or higher
XDE : Warning: You are using npm version 5.3.0. There may be bugs in this
 version, use it at your own risk. We recommend version 4.6.1.
=> npm install npm@4.6.1 -g

4. ctrl + M : Menu

5. clone process
  - pull or clone
  - npm install

6.
```
Couldn't start project on Android: ADB server didn't ACK
* failed to start daemon *
error: protocol fault (couldn't read status): Connection reset by peer
error: protocol fault (couldn't read status): Connection reset by peer
```
=> ps aux and kill adb process.
ps aux | grep 'adb'
=> ex) kill -9 12796 (from jaemin 12796 0.3 0.0 ~ ~)

=>OR restart the computer


8. Module problem
returns 500 on Font -> installation process
https://github.com/GeekyAnts/NativeBase#setup-with-crna

9. Android Menu
Ctrl M

10. COMPLETELY White screen -> Connecting to remote debugger
=> Restart the simulator AND your project

11. Access-Control-Allow-Origin header is present... (CORS). <- This is to protect the user => You have to fix this on SERVER side

12.

Couldn't start project on Android: ** daemon still not running
error: cannot connect to daemon: Connection refused
error: cannot connect to daemon: Connection refused

=> Just re-click

13. Possible Unhandled Promise Rejection => return your dispatch

14.ouldn't find preset "es2015" relative to directory "/path/to/node/package/attemping/to/install" .
=> npm install babel-cli babel-preset-es2015

15. Stuck on Loading Screen. => restart

16. Failed to execute 'importScripts' on 'WorkerGlobalScope'
=> Restart

17. Expo requires Internet Connection
=>

18. Couldn't load expo:local~~
=> Restart
=> Or... redirect from app
