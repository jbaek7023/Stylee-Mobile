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

## Sign Up
Sign Up -> email 인증 / 핸드폰인증 / facebook 인증 USA or Korea or Japan? -> 바디타입입력 -> 스타일선택(ML) -> 완료. -> 지역(날씨때문에)

## Archieve 기능 (입지않는옷)

## Camera Feature
Camera Shot -> Clip -> Brand Store Price (Tab형식으로나오네) -> Share with Facebook Twitter Tumbler, -> Post Instagram처럼나옴.
Upload image -> 이미지안에서 오른쪽에 창두개가뜨고 -> outfit을 클릭하면 오른쪽에 화면이 뜬다. => 좋긴하지만 우린 AI로 더많을 걸할수있어!! => 자동태그!
옷정보 바코드

## Image SAVE


## Cloth Save. => background removal

## CRUD Output

## Save Outlook

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
jest-haste-map: Watchman crawl failed. Retrying once with node crawler.

```
echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
# sudo 니까 일단 첫번째껏만
echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
watchman shutdown-server
watchman watch-del-all
and restart project
```


  Usually this happens when watchman isn't running. Create an empty `.watchmanconfig` file in your project's root folder or initialize a git or hg repository in your project.
  Error: Watchman error: A non-recoverable condition has triggered.  Watchman needs your help!
The triggering condition was at timestamp=1502849928: inotify-add-watch(/home/jaemin/Desktop/Stylee/workspace/Stylee-Mobile/node_modules/lottie-react-native/lib/android/build/intermediates/classes/debug/com/facebook/drawee/backends) -> The user limit on the total number of inotify watches was reached; increase the fs.inotify.max_user_watches sysctl
All requests will continue to fail with this message until you resolve
the underlying problem.  You will find more information on fixing this at
https://facebook.github.io/watchman/docs/troubleshooting.html#poison-inotify-add-watch. Make sure watchman is running for this project. See https://facebook.github.io/watchman/docs/troubleshooting.html.
facebook::react::Recoverable: Could not open file: No such file or directory
after reload
The development server returned response error code: 502 ...
Failed to complete tunnel connection
=> (watchman is not working!)



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

19. Connection error
=> adb reverse tcp:8081 tcp:8081
=> Restart whole project and emulator -> (same error)

20.
Couldn't start project on Android: Error running adb: This computer is not authorized to debug the device. Please follow the instructions here to enable USB debugging:
https://developer.android.com/studio/run/device.html#developer-device-options. If you are using Genymotion go to Settings -> ADB, select "Use custom Android SDK tools", and point it at your Android SDK directory.

21. yellow screen
check the import
